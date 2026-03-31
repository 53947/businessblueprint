import { Router } from "express";
import { db } from "../db";
import {
  setupTasks,
  setupNotes,
  setupTaskEvents,
  clients,
  prescriptions,
  type SetupTask,
  type SetupNote,
} from "@shared/schema";
import { eq, and, asc, sql } from "drizzle-orm";
import { requireClientPortalAccess } from "../middleware/clientPortalAuth";
import {
  SETUP_CADENCE,
  connectKnowledge,
  publishKnowledge,
  elevateKnowledge,
} from "@shared/knowledge-base";
import type { AppKnowledge } from "@shared/knowledge-base";

export const setupTasksRouter = Router();

// Map of app IDs to their knowledge base objects
const APP_KNOWLEDGE: Record<string, AppKnowledge> = {
  connect: connectKnowledge,
  publish: publishKnowledge,
  elevate: elevateKnowledge,
};

// ============================================================================
// GET /api/setup-tasks — All setup tasks for current client
// ============================================================================
setupTasksRouter.get("/", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;

    const tasks = await db
      .select()
      .from(setupTasks)
      .where(eq(setupTasks.clientId, clientId))
      .orderBy(asc(setupTasks.cadenceOrder));

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status === "pending").length;

    res.json({ tasks, counts: { total, completed, pending } });
  } catch (error) {
    console.error("[SetupTasks] Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch setup tasks" });
  }
});

// ============================================================================
// POST /api/setup-tasks/generate — Generate tasks from prescription
// ============================================================================
setupTasksRouter.post("/generate", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;
    const { prescriptionId } = req.body;

    if (!prescriptionId) {
      return res.status(400).json({ error: "prescriptionId is required" });
    }

    // Fetch the prescription and verify ownership
    const [prescription] = await db
      .select()
      .from(prescriptions)
      .where(
        and(
          eq(prescriptions.id, prescriptionId),
          eq(prescriptions.clientId, clientId)
        )
      )
      .limit(1);

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    const createdTasks: any[] = [];

    // Generate tasks for each app in the cadence order that has a knowledge file
    for (const cadenceStep of SETUP_CADENCE) {
      const knowledge = APP_KNOWLEDGE[cadenceStep.appId];
      if (!knowledge) continue; // Skip apps without knowledge files

      // Check if tasks already exist for this client + appId
      const existingTasks = await db
        .select({ id: setupTasks.id })
        .from(setupTasks)
        .where(
          and(
            eq(setupTasks.clientId, clientId),
            eq(setupTasks.appId, cadenceStep.appId)
          )
        )
        .limit(1);

      if (existingTasks.length > 0) continue; // Skip — tasks already exist for this app

      // Create tasks for each setup step and substep
      for (const step of knowledge.setupSteps) {
        const parentOrder =
          cadenceStep.order * 100 + step.order * 10;

        // Parent step task
        const [parentTask] = await db
          .insert(setupTasks)
          .values({
            clientId,
            appId: cadenceStep.appId,
            stepId: step.id,
            substepId: null,
            status: "pending",
            source: "prescription",
            sourceId: prescriptionId,
            cadenceOrder: parentOrder,
            title: step.title,
            description: step.description,
            estimatedMinutes: step.estimatedMinutes,
            phase: "setup",
          })
          .returning();

        createdTasks.push(parentTask);

        // Substep tasks
        for (let i = 0; i < step.substeps.length; i++) {
          const substep = step.substeps[i];
          const [substepTask] = await db
            .insert(setupTasks)
            .values({
              clientId,
              appId: cadenceStep.appId,
              stepId: step.id,
              substepId: substep.id,
              status: "pending",
              source: "prescription",
              sourceId: prescriptionId,
              cadenceOrder: parentOrder + i + 1,
              title: substep.title,
              description: substep.helpText,
              estimatedMinutes: null,
              phase: "setup",
            })
            .returning();

          createdTasks.push(substepTask);
        }
      }
    }

    // Update client's setup phase
    await db
      .update(clients)
      .set({ setupPhase: "in_progress", updatedAt: new Date() })
      .where(eq(clients.id, clientId));

    res.json({ tasks: createdTasks, count: createdTasks.length });
  } catch (error) {
    console.error("[SetupTasks] Error generating tasks:", error);
    res.status(500).json({ error: "Failed to generate setup tasks" });
  }
});

// ============================================================================
// PATCH /api/setup-tasks/:id — Update task status
// ============================================================================
setupTasksRouter.patch("/:id", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;
    const taskId = parseInt(req.params.id);
    const { status } = req.body;

    if (!["pending", "in_progress", "completed", "skipped"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Verify task belongs to this client
    const [existing] = await db
      .select()
      .from(setupTasks)
      .where(and(eq(setupTasks.id, taskId), eq(setupTasks.clientId, clientId)))
      .limit(1);

    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };
    if (status === "completed") {
      updateData.completedAt = new Date();
    }

    const [updated] = await db
      .update(setupTasks)
      .set(updateData)
      .where(eq(setupTasks.id, taskId))
      .returning();

    // Insert audit event
    await db.insert(setupTaskEvents).values({
      clientId,
      taskId,
      eventType: status === "completed" ? "completed" : status === "skipped" ? "completed" : "reopened",
      metadata: { previousStatus: existing.status, newStatus: status },
    });

    // Recalculate client's setup progress
    const allTasks = await db
      .select({ status: setupTasks.status })
      .from(setupTasks)
      .where(eq(setupTasks.clientId, clientId));

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (t) => t.status === "completed" || t.status === "skipped"
    ).length;
    const percentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const newPhase = completedTasks === totalTasks && totalTasks > 0 ? "complete" : "in_progress";

    await db
      .update(clients)
      .set({
        setupProgress: percentage,
        setupPhase: newPhase,
        updatedAt: new Date(),
      })
      .where(eq(clients.id, clientId));

    res.json({ task: updated, progress: { totalTasks, completedTasks, percentage } });
  } catch (error) {
    console.error("[SetupTasks] Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ============================================================================
// GET /api/setup-tasks/progress — Progress summary
// ============================================================================
setupTasksRouter.get("/progress", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;

    const allTasks = await db
      .select()
      .from(setupTasks)
      .where(eq(setupTasks.clientId, clientId))
      .orderBy(asc(setupTasks.cadenceOrder));

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(
      (t) => t.status === "completed" || t.status === "skipped"
    ).length;
    const percentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Find current (first incomplete) app and step
    const firstIncomplete = allTasks.find(
      (t) => t.status !== "completed" && t.status !== "skipped"
    );
    const currentApp = firstIncomplete?.appId || null;
    const currentStep = firstIncomplete?.stepId || null;

    // By-app breakdown
    const byAppMap = new Map<
      string,
      { appId: string; total: number; completed: number }
    >();
    for (const task of allTasks) {
      if (!byAppMap.has(task.appId)) {
        byAppMap.set(task.appId, { appId: task.appId, total: 0, completed: 0 });
      }
      const entry = byAppMap.get(task.appId)!;
      entry.total++;
      if (task.status === "completed" || task.status === "skipped") {
        entry.completed++;
      }
    }
    const byApp = Array.from(byAppMap.values()).map((a) => ({
      ...a,
      percentage: a.total > 0 ? Math.round((a.completed / a.total) * 100) : 0,
    }));

    res.json({
      totalTasks,
      completedTasks,
      percentage,
      currentApp,
      currentStep,
      byApp,
    });
  } catch (error) {
    console.error("[SetupTasks] Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// ============================================================================
// GET /api/directions-for-use — Combined tasks + notes + progress
// ============================================================================
setupTasksRouter.get("/directions-for-use", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;

    // Fetch all tasks and notes in parallel
    const [allTasks, allNotes, client] = await Promise.all([
      db
        .select()
        .from(setupTasks)
        .where(eq(setupTasks.clientId, clientId))
        .orderBy(asc(setupTasks.cadenceOrder)),
      db
        .select()
        .from(setupNotes)
        .where(eq(setupNotes.clientId, clientId))
        .orderBy(asc(setupNotes.sortOrder)),
      db
        .select({ setupProgress: clients.setupProgress, setupPhase: clients.setupPhase })
        .from(clients)
        .where(eq(clients.id, clientId))
        .limit(1)
        .then((rows) => rows[0] || null),
    ]);

    const taskRows: SetupTask[] = allTasks;
    const noteRows: SetupNote[] = allNotes;

    const totalTasks = taskRows.length;
    const completedTasks = taskRows.filter(
      (t: SetupTask) => t.status === "completed" || t.status === "skipped"
    ).length;
    const percentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Group tasks by app
    const appGroupMap = new Map<string, SetupTask[]>();
    for (const task of taskRows) {
      if (!appGroupMap.has(task.appId)) {
        appGroupMap.set(task.appId, []);
      }
      appGroupMap.get(task.appId)!.push(task);
    }

    // Build sections ordered by cadence
    const sections = SETUP_CADENCE
      .filter((c) => appGroupMap.has(c.appId))
      .map((cadenceStep) => {
        const appTasks = appGroupMap.get(cadenceStep.appId)!;
        const knowledge = APP_KNOWLEDGE[cadenceStep.appId];
        const appName = knowledge?.appName || cadenceStep.appId;

        // Separate parent steps from substeps
        const parentSteps = appTasks.filter((t: SetupTask) => !t.substepId);
        const substepTasks = appTasks.filter((t: SetupTask) => t.substepId);

        // Notes for this app
        const appNotes = noteRows.filter((n: SetupNote) => n.appId === cadenceStep.appId);

        const taskSections = parentSteps.map((parentTask: SetupTask) => {
          const childSubsteps = substepTasks
            .filter((s: SetupTask) => s.stepId === parentTask.stepId)
            .map((s: SetupTask) => ({
              id: s.id,
              substepId: s.substepId,
              title: s.title,
              status: s.status,
              completedAt: s.completedAt,
            }));

          const stepNotes = appNotes
            .filter((n: SetupNote) => n.stepId === parentTask.stepId)
            .map((n: SetupNote) => ({
              id: n.id,
              content: n.content,
              isTodo: n.isTodo,
              isCompleted: n.isCompleted,
            }));

          return {
            id: parentTask.id,
            stepId: parentTask.stepId,
            title: parentTask.title,
            description: parentTask.description,
            status: parentTask.status,
            estimatedMinutes: parentTask.estimatedMinutes,
            completedAt: parentTask.completedAt,
            substeps: childSubsteps,
            notes: stepNotes,
          };
        });

        // Section-level notes (not attached to a specific step)
        const sectionNotes = appNotes
          .filter((n: SetupNote) => !n.stepId)
          .map((n: SetupNote) => ({
            id: n.id,
            content: n.content,
            isTodo: n.isTodo,
            isCompleted: n.isCompleted,
          }));

        const appTotal = appTasks.length;
        const appCompleted = appTasks.filter(
          (t: SetupTask) => t.status === "completed" || t.status === "skipped"
        ).length;

        return {
          appId: cadenceStep.appId,
          appName,
          cadenceOrder: cadenceStep.order,
          totalSteps: appTotal,
          completedSteps: appCompleted,
          tasks: taskSections,
          sectionNotes,
        };
      });

    res.json({
      progress: {
        totalTasks,
        completedTasks,
        percentage,
        phase: client?.setupPhase || "not_started",
      },
      sections,
    });
  } catch (error) {
    console.error("[DirectionsForUse] Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch directions for use" });
  }
});
