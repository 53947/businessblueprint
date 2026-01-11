# Replit Agents MCP Server

A Model Context Protocol (MCP) server for inspecting, managing, and understanding Replit agents. This MCP server provides tools and resources that allow Claude and other AI assistants to interact with your Replit agent infrastructure.

## Features

- **Agent Inspection**: List all agents and check their current status
- **Detailed Status**: Get comprehensive logs and state information for any agent
- **Agent Control**: Start, pause, or stop agents programmatically
- **Log Management**: Add custom log entries to track agent activity
- **Resource Access**: Access agent data through MCP resources

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Running

To start the MCP server:

```bash
npm start
```

To run in development mode with auto-rebuild:

```bash
npm run dev
```

To watch TypeScript files for changes:

```bash
npm run watch
```

## Architecture

### Tools Available

1. **list_agents** - Get a list of all registered agents with their current status
2. **get_agent_status** - Retrieve detailed information and logs for a specific agent
3. **control_agent** - Control an agent's state (start/pause/stop)
4. **add_agent_log** - Add a log message to an agent's log history

### Resources Available

- `agents://list` - Access all agents as a resource
- `agents://{agent_id}` - Access individual agent data

## Configuration for Replit

When using this MCP server in Replit with Claude:

1. Build the project: `npm run build`
2. Configure your Replit workspace to expose this MCP server
3. Claude will then be able to use the tools to understand your agent infrastructure

### VS Code Integration

The `.vscode/mcp.json` file contains the configuration for debugging this MCP server in VS Code:

```json
{
  "servers": {
    "replit-agents-mcp": {
      "type": "stdio",
      "command": "node",
      "args": ["build/index.js"]
    }
  }
}
```

## Development

### Project Structure

```
.
├── src/
│   └── index.ts          # Main MCP server implementation
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### TypeScript Configuration

The project uses strict TypeScript with ES2020 target. All source files are in the `src/` directory and compiled to the `build/` directory.

## Next Steps

1. **Customize Agents**: Modify the `agentDatabase` in `src/index.ts` to connect to your actual agent infrastructure
2. **Add More Tools**: Extend the `server.setRequestHandler(ListToolsRequestSchema, ...)` section with additional capabilities
3. **Connect to Database**: Replace mock data with real agent state from your system
4. **Add Authentication**: Implement security checks for tool access

## MCP SDK Documentation

For more information about the MCP SDK and protocol:
- https://github.com/modelcontextprotocol/sdk
- https://modelcontextprotocol.io/

## License

MIT
