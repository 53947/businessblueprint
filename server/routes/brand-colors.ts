import { Router } from 'express';
import type { Request, Response } from 'express';
import { db } from '../db';
import { brandColors, insertBrandColorSchema } from '@shared/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all brand colors
router.get('/', async (req: Request, res: Response) => {
  try {
    const colors = await db.select().from(brandColors);
    res.json({ success: true, colors });
  } catch (error) {
    console.error('Error fetching brand colors:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch colors' });
  }
});

// Add a new brand color
router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = insertBrandColorSchema.parse(req.body);
    const [newColor] = await db.insert(brandColors).values(validatedData).returning();
    res.json({ success: true, color: newColor });
  } catch (error) {
    console.error('Error adding brand color:', error);
    res.status(400).json({ success: false, error: 'Failed to add color' });
  }
});

// Delete a brand color
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'Invalid ID' });
    }

    await db.delete(brandColors).where(eq(brandColors.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting brand color:', error);
    res.status(500).json({ success: false, error: 'Failed to delete color' });
  }
});

export default router;
