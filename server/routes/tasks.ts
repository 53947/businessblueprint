import { Router, Request, Response } from "express";
import { db } from "../db";
import { tasks } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { githubSync } from "../services/github-sync";

export const tasksRouter = Router();

// Get all tasks for a client
tasksRouter.get('/', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const clientId = user.claims.sub;

    const allTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.clientId, clientId))
      .orderBy(desc(tasks.createdAt));

    res.json(allTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Get a single task
tasksRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const clientId = user.claims.sub;
    const taskId = parseInt(req.params.id);

    const [task] = await db
      .select()
      .from(tasks)
      .where(and(
        eq(tasks.id, taskId),
        eq(tasks.clientId, clientId)
      ));

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
});

// Create a new task
tasksRouter.post('/', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const clientId = user.claims.sub;

    const taskSchema = z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      status: z.enum(['todo', 'in_progress', 'completed', 'cancelled']).default('todo'),
      priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
      assignedTo: z.string().optional(),
      assignedBy: z.string().optional(),
      dueDate: z.string().optional(),
      tags: z.array(z.string()).optional(),
      relatedTo: z.any().optional(),
    });

    const validatedData = taskSchema.parse(req.body);

    const [newTask] = await db
      .insert(tasks)
      .values({
        ...validatedData,
        clientId,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
      })
      .returning();

    // Sync to GitHub (async, don't block response)
    if (githubSync.isEnabled()) {
      githubSync.createIssue(githubSync.formatTaskAsIssue(newTask))
        .then(async (issue) => {
          if (issue) {
            // Update task with GitHub issue info
            await db
              .update(tasks)
              .set({
                githubIssueId: `#${issue.number}`,
                githubIssueUrl: issue.html_url,
              })
              .where(eq(tasks.id, newTask.id));
            console.log(`[Tasks] Task ${newTask.id} synced to GitHub issue #${issue.number}`);
          }
        })
        .catch((error) => {
          console.error(`[Tasks] Failed to sync task ${newTask.id} to GitHub:`, error);
        });
    }

    // Send notification if task is assigned
    if (newTask.assignedTo && newTask.assignedTo !== 'unassigned') {
      console.log(`[Tasks] Task ${newTask.id} assigned to ${newTask.assignedTo}`);
    }

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// Update a task
tasksRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const clientId = user.claims.sub;
    const taskId = parseInt(req.params.id);

    const updateSchema = z.object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      status: z.enum(['todo', 'in_progress', 'completed', 'cancelled']).optional(),
      priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
      assignedTo: z.string().optional(),
      assignedBy: z.string().optional(),
      dueDate: z.string().optional(),
      tags: z.array(z.string()).optional(),
      relatedTo: z.any().optional(),
    });

    const validatedData = updateSchema.parse(req.body);

    const updateData: any = {
      ...validatedData,
      updatedAt: new Date(),
    };

    if (validatedData.dueDate !== undefined) {
      updateData.dueDate = validatedData.dueDate ? new Date(validatedData.dueDate) : null;
    }

    if (validatedData.status === 'completed') {
      updateData.completedAt = new Date();
    }

    const [updatedTask] = await db
      .update(tasks)
      .set(updateData)
      .where(and(
        eq(tasks.id, taskId),
        eq(tasks.clientId, clientId)
      ))
      .returning();

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Sync to GitHub if issue exists (async, don't block response)
    if (githubSync.isEnabled() && updatedTask.githubIssueId) {
      const issueNumber = parseInt(updatedTask.githubIssueId.replace('#', ''));
      
      // Recompute full label set (don't drop required labels)
      const labels: string[] = [];
      if (updatedTask.assignedTo) {
        labels.push(`assigned-to-${updatedTask.assignedTo.toLowerCase()}`);
      }
      if (updatedTask.priority) {
        labels.push(`priority-${updatedTask.priority}`);
      }
      if (updatedTask.tags && Array.isArray(updatedTask.tags)) {
        labels.push(...updatedTask.tags);
      }
      
      // Update GitHub issue
      githubSync.updateIssue({
        issueNumber,
        title: validatedData.title,
        body: validatedData.description,
        state: githubSync.getIssueState(updatedTask.status),
        labels,
      })
        .catch((error) => {
          console.error(`[Tasks] Failed to sync task ${updatedTask.id} to GitHub:`, error);
        });

      // Add comment if status changed to completed
      if (validatedData.status === 'completed') {
        const completedAt = updatedTask.completedAt || new Date();
        githubSync.addComment(
          issueNumber,
          `✅ Task marked as completed in TriadBlue task management system.\n\n**Completed:** ${completedAt.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}`
        )
          .catch((error) => {
            console.error(`[Tasks] Failed to add completion comment:`, error);
          });
      }
    }

    // Send notification if assignee changed
    if (validatedData.assignedTo) {
      console.log(`[Tasks] Task ${updatedTask.id} reassigned to ${validatedData.assignedTo}`);
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// Delete a task
tasksRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    
    if (!user || !user.claims?.sub) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const clientId = user.claims.sub;
    const taskId = parseInt(req.params.id);

    const [deletedTask] = await db
      .delete(tasks)
      .where(and(
        eq(tasks.id, taskId),
        eq(tasks.clientId, clientId)
      ))
      .returning();

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});
