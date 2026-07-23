import { Router } from "express";
import { dnbService } from "../services/dnb";
import { db } from "../db";
import { canonicalBusinessProfiles, clients } from "@shared/schema";
import { eq } from "drizzle-orm";

export const dnbRouter = Router();

/**
 * GET /api/dnb/status
 * Check if D&B API is configured and get current DUNS status for client
 */
dnbRouter.get("/api/dnb/status", async (req: any, res) => {
  try {
    const clientId = req.session?.clientId;
    if (!clientId) return res.status(401).json({ message: "Not authenticated" });

    const [profile] = await db.select()
      .from(canonicalBusinessProfiles)
      .where(eq(canonicalBusinessProfiles.clientId, clientId))
      .limit(1);

    res.json({
      apiConfigured: dnbService.isConfigured,
      dunsNumber: profile?.dunsNumber || null,
      dunsVerified: profile?.dunsVerified || false,
      dunsVerifiedAt: profile?.dunsVerifiedAt || null,
      dunsCompanyName: profile?.dunsCompanyName || null,
      dunsLastChecked: profile?.dunsLastChecked || null,
    });
  } catch (error) {
    console.error("[D&B] Status error:", error);
    res.status(500).json({ message: "Failed to get D&B status" });
  }
});

/**
 * POST /api/dnb/lookup
 * Look up DUNS number by business name and address
 */
dnbRouter.post("/api/dnb/lookup", async (req: any, res) => {
  try {
    const clientId = req.session?.clientId;
    if (!clientId) return res.status(401).json({ message: "Not authenticated" });

    const { businessName, address, city, state, postalCode, country } = req.body;

    if (!businessName) {
      return res.status(400).json({ message: "Business name is required" });
    }

    const result = await dnbService.lookupDuns(
      businessName,
      address || "",
      city || "",
      state || "",
      postalCode || "",
      country || "US",
    );

    // Update the last checked timestamp
    const [profile] = await db.select()
      .from(canonicalBusinessProfiles)
      .where(eq(canonicalBusinessProfiles.clientId, clientId))
      .limit(1);

    if (profile) {
      await db.update(canonicalBusinessProfiles)
        .set({
          dunsLastChecked: new Date(),
          ...(result.found ? {
            dunsNumber: result.dunsNumber,
            dunsMatchConfidence: result.confidence,
            dunsCompanyName: result.companyName,
            dunsAddress: [result.address, result.city, result.state, result.postalCode]
              .filter(Boolean).join(", "),
          } : {}),
        })
        .where(eq(canonicalBusinessProfiles.clientId, clientId));
    }

    res.json(result);
  } catch (error) {
    console.error("[D&B] Lookup error:", error);
    res.status(500).json({ message: "Failed to look up DUNS number" });
  }
});

/**
 * POST /api/dnb/verify
 * Verify and confirm a DUNS number, marking it as verified
 */
dnbRouter.post("/api/dnb/verify", async (req: any, res) => {
  try {
    const clientId = req.session?.clientId;
    if (!clientId) return res.status(401).json({ message: "Not authenticated" });

    const { dunsNumber } = req.body;

    if (!dunsNumber || dunsNumber.length !== 9) {
      return res.status(400).json({ message: "Valid 9-digit DUNS number is required" });
    }

    // Verify with D&B API
    const verification = await dnbService.verifyDuns(dunsNumber);

    if (!verification.valid) {
      return res.json({
        verified: false,
        message: verification.status
          ? `DUNS number found but status is: ${verification.status}`
          : "DUNS number could not be verified",
      });
    }

    // Mark as verified in the canonical profile
    await db.update(canonicalBusinessProfiles)
      .set({
        dunsNumber,
        dunsVerified: true,
        dunsVerifiedAt: new Date(),
        dunsCompanyName: verification.companyName,
        dunsLastChecked: new Date(),
      })
      .where(eq(canonicalBusinessProfiles.clientId, clientId));

    // Also store on the client record for quick access
    await db.update(clients)
      .set({ dunsNumber })
      .where(eq(clients.id, clientId));

    res.json({
      verified: true,
      dunsNumber,
      companyName: verification.companyName,
      message: "DUNS number verified and saved",
    });
  } catch (error) {
    console.error("[D&B] Verify error:", error);
    res.status(500).json({ message: "Failed to verify DUNS number" });
  }
});

/**
 * GET /api/dnb/profile/:dunsNumber
 * Get full D&B company profile
 */
dnbRouter.get("/api/dnb/profile/:dunsNumber", async (req: any, res) => {
  try {
    const { dunsNumber } = req.params;
    const profile = await dnbService.getCompanyProfile(dunsNumber);
    res.json(profile);
  } catch (error) {
    console.error("[D&B] Profile error:", error);
    res.status(500).json({ message: "Failed to get company profile" });
  }
});

/**
 * POST /api/dnb/manual
 * Manually enter a known DUNS number (for businesses that already know theirs)
 */
dnbRouter.post("/api/dnb/manual", async (req: any, res) => {
  try {
    const clientId = req.session?.clientId;
    if (!clientId) return res.status(401).json({ message: "Not authenticated" });

    const { dunsNumber } = req.body;

    if (!dunsNumber || !/^\d{9}$/.test(dunsNumber)) {
      return res.status(400).json({ message: "DUNS number must be exactly 9 digits" });
    }

    // If D&B API is configured, verify it
    if (dnbService.isConfigured) {
      const verification = await dnbService.verifyDuns(dunsNumber);
      if (verification.valid) {
        await db.update(canonicalBusinessProfiles)
          .set({
            dunsNumber,
            dunsVerified: true,
            dunsVerifiedAt: new Date(),
            dunsCompanyName: verification.companyName,
            dunsLastChecked: new Date(),
          })
          .where(eq(canonicalBusinessProfiles.clientId, clientId));

        await db.update(clients)
          .set({ dunsNumber })
          .where(eq(clients.id, clientId));

        return res.json({ verified: true, dunsNumber, companyName: verification.companyName });
      }
    }

    // Save without verification (API not configured or verification failed)
    await db.update(canonicalBusinessProfiles)
      .set({
        dunsNumber,
        dunsVerified: false,
        dunsLastChecked: new Date(),
      })
      .where(eq(canonicalBusinessProfiles.clientId, clientId));

    await db.update(clients)
      .set({ dunsNumber })
      .where(eq(clients.id, clientId));

    res.json({
      verified: false,
      dunsNumber,
      message: dnbService.isConfigured
        ? "DUNS number saved but could not be verified with D&B"
        : "DUNS number saved. Verification unavailable (D&B API not configured).",
    });
  } catch (error) {
    console.error("[D&B] Manual entry error:", error);
    res.status(500).json({ message: "Failed to save DUNS number" });
  }
});
