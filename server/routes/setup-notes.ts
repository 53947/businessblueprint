import { Router } from "express";
import { db } from "../db";
import { setupNotes } from "@shared/schema";
import { eq, and, asc } from "drizzle-orm";
import { requireClientPortalAccess } from "../middleware/clientPortalAuth";

export const setupNotesRouter = Router();

// ============================================================================
// GET /api/setup-notes — All notes for current client
// ============================================================================
setupNotesRouter.get("/", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;
    const appId = req.query.appId as string | undefined;

    const conditions = [eq(setupNotes.clientId, clientId)];
    if (appId) {
      conditions.push(eq(setupNotes.appId, appId));
    }

    const notes = await db
      .select()
      .from(setupNotes)
      .where(and(...conditions))
      .orderBy(asc(setupNotes.sortOrder));

    res.json({ notes });
  } catch (error) {
    console.error("[SetupNotes] Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch setup notes" });
  }
});

// ============================================================================
// POST /api/setup-notes — Create a new note
// ============================================================================
setupNotesRouter.post("/", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;
    const { appId, stepId, content, isTodo } = req.body;

    if (!appId || !content) {
      return res.status(400).json({ error: "appId and content are required" });
    }

    const [note] = await db
      .insert(setupNotes)
      .values({
        clientId,
        appId,
        stepId: stepId || null,
        content,
        isTodo: isTodo || false,
        isCompleted: false,
        sortOrder: 0,
      })
      .returning();

    res.json({ note });
  } catch (error) {
    console.error("[SetupNotes] Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// ============================================================================
// PATCH /api/setup-notes/:id — Update a note
// ============================================================================
setupNotesRouter.patch("/:id", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;
    const noteId = parseInt(req.params.id);
    const { content, isTodo, isCompleted, sortOrder } = req.body;

    // Verify note belongs to this client
    const [existing] = await db
      .select()
      .from(setupNotes)
      .where(and(eq(setupNotes.id, noteId), eq(setupNotes.clientId, clientId)))
      .limit(1);

    if (!existing) {
      return res.status(404).json({ error: "Note not found" });
    }

    const updateData: any = { updatedAt: new Date() };
    if (content !== undefined) updateData.content = content;
    if (isTodo !== undefined) updateData.isTodo = isTodo;
    if (isCompleted !== undefined) {
      updateData.isCompleted = isCompleted;
      if (isCompleted && !existing.isCompleted) {
        updateData.completedAt = new Date();
      }
    }
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

    const [updated] = await db
      .update(setupNotes)
      .set(updateData)
      .where(eq(setupNotes.id, noteId))
      .returning();

    res.json({ note: updated });
  } catch (error) {
    console.error("[SetupNotes] Error updating note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// ============================================================================
// DELETE /api/setup-notes/:id — Delete a note
// ============================================================================
setupNotesRouter.delete("/:id", requireClientPortalAccess, async (req: any, res) => {
  try {
    const clientId = req.clientId;
    const noteId = parseInt(req.params.id);

    // Verify note belongs to this client
    const [existing] = await db
      .select()
      .from(setupNotes)
      .where(and(eq(setupNotes.id, noteId), eq(setupNotes.clientId, clientId)))
      .limit(1);

    if (!existing) {
      return res.status(404).json({ error: "Note not found" });
    }

    await db.delete(setupNotes).where(eq(setupNotes.id, noteId));

    res.json({ success: true });
  } catch (error) {
    console.error("[SetupNotes] Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});
