import { Router } from "express";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { db } from "../db";
import { users, magicLinkTokens } from "@shared/schema";
import { eq } from "drizzle-orm";
import { isAuthenticated } from "../replitAuth";
import { ResendEmailService } from "../services/resend-email";

const router = Router();
const emailService = new ResendEmailService();

// POST /api/auth/login — credential-based admin login
router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const [user] = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: "No password set for this account. Use magic link to log in, then set a password."
      });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Create session — shape matches what isAuthenticated expects
    const sessionUser = {
      claims: {
        sub: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
      },
      expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
    };

    req.logIn(sessionUser, (err) => {
      if (err) {
        console.error("[Auth] Login session error:", err);
        return res.status(500).json({ success: false, message: "Failed to create session" });
      }
      // Also store userId in session for the isAuthenticated check
      (req.session as any).userId = user.id;
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("[Auth] Session save error:", saveErr);
        }
        console.log("[Auth] User logged in via credentials:", user.email);
        return res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      });
    });
  } catch (error) {
    console.error("[Auth] Credential login error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
});

// POST /api/auth/magic-link — request admin magic link
router.post("/api/auth/magic-link", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const [user] = await db.select().from(users).where(eq(users.email, normalizedEmail));

    if (!user) {
      // Don't reveal whether account exists — return success either way
      return res.json({ success: true, message: "If an account exists, a login link has been sent." });
    }

    // Generate token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await db.insert(magicLinkTokens).values({
      email: normalizedEmail,
      token,
      expiresAt,
    });

    // Build magic link URL
    const baseUrl = process.env.FRONTEND_URL
      || `${req.protocol}://${req.get("host")}`;
    const magicLink = `${baseUrl}/auth/verify?token=${token}`;

    // Send email (fire-and-forget)
    emailService.sendMagicLinkEmail(normalizedEmail, magicLink, "Business Blueprint Admin").catch((err) => {
      console.error("[Auth] Failed to send admin magic link email:", err);
    });

    console.log("[Auth] Magic link requested for:", normalizedEmail);

    // In dev mode, return the link directly for convenience
    if (process.env.NODE_ENV !== "production") {
      return res.json({
        success: true,
        message: "Login link sent to your email.",
        devLink: magicLink,
        devToken: token,
      });
    }

    return res.json({ success: true, message: "If an account exists, a login link has been sent." });
  } catch (error) {
    console.error("[Auth] Magic link request error:", error);
    return res.status(500).json({ success: false, message: "Failed to send login link" });
  }
});

// GET /api/auth/verify-magic-link — verify admin magic link and create session
router.get("/api/auth/verify-magic-link", async (req, res) => {
  try {
    const tokenStr = req.query.token as string;

    if (!tokenStr) {
      return res.status(400).json({ success: false, message: "Token is required" });
    }

    const [magicToken] = await db.select().from(magicLinkTokens).where(eq(magicLinkTokens.token, tokenStr));

    if (!magicToken) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    if (magicToken.used) {
      return res.status(400).json({ success: false, message: "This link has already been used" });
    }

    if (new Date() > magicToken.expiresAt) {
      return res.status(400).json({ success: false, message: "This link has expired" });
    }

    const [user] = await db.select().from(users).where(eq(users.email, magicToken.email));

    if (!user) {
      return res.status(400).json({ success: false, message: "Account not found" });
    }

    // Mark token as used
    await db.update(magicLinkTokens)
      .set({ used: true, usedAt: new Date() })
      .where(eq(magicLinkTokens.token, tokenStr));

    // Create session
    const sessionUser = {
      claims: {
        sub: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
      },
      expires_at: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
    };

    req.logIn(sessionUser, (err) => {
      if (err) {
        console.error("[Auth] Magic link session error:", err);
        return res.status(500).json({ success: false, message: "Failed to create session" });
      }
      (req.session as any).userId = user.id;
      req.session.save((saveErr) => {
        if (saveErr) {
          console.error("[Auth] Session save error:", saveErr);
        }
        console.log("[Auth] User logged in via magic link:", user.email);
        return res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      });
    });
  } catch (error) {
    console.error("[Auth] Magic link verify error:", error);
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
});

// POST /api/auth/set-password — set or change password (must be logged in)
router.post("/api/auth/set-password", isAuthenticated, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Get user ID from session
    const userId = (req.session as any).userId || (req.user as any)?.claims?.sub;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, userId));

    console.log("[Auth] Password set for user:", userId);
    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("[Auth] Set password error:", error);
    return res.status(500).json({ success: false, message: "Failed to update password" });
  }
});

// POST /api/auth/logout — destroy session
router.post("/api/auth/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error("[Auth] Logout error:", err);
      }
      return res.json({ success: true });
    });
  });
});

export const authRouter = router;
