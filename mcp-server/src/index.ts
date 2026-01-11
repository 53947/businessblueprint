#!/usr/bin/env node

import {
  Server,
} from "@modelcontextprotocol/sdk/server/index.js";
import {
  StdioServerTransport,
} from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Initialize the server
const server = new Server({
  name: "replit-agents-mcp",
  version: "1.0.0",
});

// Mock data for agents
interface Agent {
  id: string;
  name: string;
  status: "running" | "paused" | "stopped";
  lastActive: Date;
  logs: string[];
}

const agentDatabase: Map<string, Agent> = new Map([
  [
    "agent-1",
    {
      id: "agent-1",
      name: "BusinessBlueprint Agent",
      status: "running",
      lastActive: new Date(),
      logs: ["Agent started", "Processing business rules", "Sync completed"],
    },
  ],
  [
    "agent-2",
    {
      id: "agent-2",
      name: "Analysis Agent",
      status: "paused",
      lastActive: new Date(Date.now() - 3600000),
      logs: ["Agent initialized", "Waiting for input"],
    },
  ],
]);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_agents",
        description: "List all registered agents and their current status",
        inputSchema: {
          type: "object" as const,
          properties: {},
          required: [],
        },
      },
      {
        name: "get_agent_status",
        description: "Get detailed status and logs for a specific agent",
        inputSchema: {
          type: "object" as const,
          properties: {
            agent_id: {
              type: "string",
              description: "The ID of the agent to query",
            },
          },
          required: ["agent_id"],
        },
      },
      {
        name: "control_agent",
        description: "Control an agent (start, pause, stop)",
        inputSchema: {
          type: "object" as const,
          properties: {
            agent_id: {
              type: "string",
              description: "The ID of the agent to control",
            },
            action: {
              type: "string",
              enum: ["start", "pause", "stop"],
              description: "The action to perform",
            },
          },
          required: ["agent_id", "action"],
        },
      },
      {
        name: "add_agent_log",
        description: "Add a log entry to an agent",
        inputSchema: {
          type: "object" as const,
          properties: {
            agent_id: {
              type: "string",
              description: "The ID of the agent",
            },
            message: {
              type: "string",
              description: "The log message to add",
            },
          },
          required: ["agent_id", "message"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_agents": {
        const agents = Array.from(agentDatabase.values()).map((agent) => ({
          id: agent.id,
          name: agent.name,
          status: agent.status,
          lastActive: agent.lastActive.toISOString(),
        }));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(agents, null, 2),
            },
          ],
        };
      }

      case "get_agent_status": {
        const agentId = (args as { agent_id: string }).agent_id;
        const agent = agentDatabase.get(agentId);

        if (!agent) {
          return {
            content: [
              {
                type: "text",
                text: `Agent with ID ${agentId} not found`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  id: agent.id,
                  name: agent.name,
                  status: agent.status,
                  lastActive: agent.lastActive.toISOString(),
                  logs: agent.logs,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      case "control_agent": {
        const { agent_id, action } = args as {
          agent_id: string;
          action: string;
        };
        const agent = agentDatabase.get(agent_id);

        if (!agent) {
          return {
            content: [
              {
                type: "text",
                text: `Agent with ID ${agent_id} not found`,
              },
            ],
            isError: true,
          };
        }

        const validActions = ["start", "pause", "stop"];
        if (!validActions.includes(action)) {
          return {
            content: [
              {
                type: "text",
                text: `Invalid action: ${action}. Must be one of: ${validActions.join(", ")}`,
              },
            ],
            isError: true,
          };
        }

        agent.status = action as "running" | "paused" | "stopped";
        agent.lastActive = new Date();
        agent.logs.push(`Agent ${action}ed by MCP server`);

        return {
          content: [
            {
              type: "text",
              text: `Agent ${agent_id} has been ${action}ed successfully`,
            },
          ],
        };
      }

      case "add_agent_log": {
        const { agent_id, message } = args as {
          agent_id: string;
          message: string;
        };
        const agent = agentDatabase.get(agent_id);

        if (!agent) {
          return {
            content: [
              {
                type: "text",
                text: `Agent with ID ${agent_id} not found`,
              },
            ],
            isError: true,
          };
        }

        agent.logs.push(message);
        agent.lastActive = new Date();

        return {
          content: [
            {
              type: "text",
              text: `Log added to agent ${agent_id}`,
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: "text",
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Define resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const agents = Array.from(agentDatabase.keys());
  return {
    resources: [
      {
        uri: "agents://list",
        name: "All Agents",
        description: "List of all registered agents",
        mimeType: "application/json",
      },
      ...agents.map((agentId) => ({
        uri: `agents://${agentId}`,
        name: `Agent: ${agentDatabase.get(agentId)?.name || agentId}`,
        description: `Details and logs for agent ${agentId}`,
        mimeType: "application/json",
      })),
    ],
  };
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "agents://list") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            Array.from(agentDatabase.values()).map((agent) => ({
              id: agent.id,
              name: agent.name,
              status: agent.status,
              lastActive: agent.lastActive.toISOString(),
            })),
            null,
            2
          ),
        },
      ],
    };
  }

  const match = uri.match(/^agents:\/\/(.+)$/);
  if (match) {
    const agentId = match[1];
    const agent = agentDatabase.get(agentId);

    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              id: agent.id,
              name: agent.name,
              status: agent.status,
              lastActive: agent.lastActive.toISOString(),
              logs: agent.logs,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Start the server via stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server connected via stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
