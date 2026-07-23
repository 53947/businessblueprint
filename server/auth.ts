import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

// Replit OIDC is only used in dev mode as a convenience — production uses credential/magic-link auth
const isProduction = process.env.NODE_ENV === 'production';
const useReplitOidc = !isProduction && !!process.env.REPLIT_DOMAINS;

export function getSession() {
  const sessionTtlSeconds = 7 * 24 * 60 * 60; // 7 days in seconds
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtlSeconds,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET || 'dev-session-secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: sessionTtlSeconds * 1000,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  // Only set up Replit OIDC when running on Replit
  if (useReplitOidc) {
    try {
      const client = await import("openid-client");
      const { Strategy } = await import("openid-client/passport");
      const memoize = (await import("memoizee")).default;

      const getOidcConfig = memoize(
        async () => {
          return await client.discovery(
            new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
            process.env.REPL_ID!
          );
        },
        { maxAge: 3600 * 1000 }
      );

      const config = await getOidcConfig();

      const verify = async (
        tokens: any,
        verified: passport.AuthenticateCallback
      ) => {
        const user: any = {};
        user.claims = tokens.claims();
        user.access_token = tokens.access_token;
        user.refresh_token = tokens.refresh_token;
        user.expires_at = user.claims?.exp;
        await storage.upsertUser({
          id: user.claims["sub"],
          email: user.claims["email"],
          firstName: user.claims["first_name"],
          lastName: user.claims["last_name"],
          profileImageUrl: user.claims["profile_image_url"],
        });
        verified(null, user);
      };

      for (const domain of process.env.REPLIT_DOMAINS!.split(",")) {
        const strategy = new Strategy(
          {
            name: `replitauth:${domain}`,
            config,
            scope: "openid email profile offline_access",
            callbackURL: `https://${domain}/api/callback`,
          },
          verify,
        );
        passport.use(strategy);
      }

      app.get("/api/login", (req, res, next) => {
        const redirect = req.query.redirect as string;
        if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
          (req.session as any).loginRedirect = redirect;
        }
        passport.authenticate(`replitauth:${req.hostname}`, {
          prompt: "login consent",
          scope: ["openid", "email", "profile", "offline_access"],
        })(req, res, next);
      });

      app.get("/api/callback", (req, res, next) => {
        passport.authenticate(`replitauth:${req.hostname}`, (err: any, user: any) => {
          if (err) {
            console.error('[Auth] Callback error:', err);
            return res.redirect("/api/login");
          }
          if (!user) {
            console.error('[Auth] No user returned from callback');
            return res.redirect("/api/login");
          }
          req.logIn(user, (loginErr) => {
            if (loginErr) {
              console.error('[Auth] Login error:', loginErr);
              return res.redirect("/api/login");
            }
            req.session.save((saveErr) => {
              if (saveErr) {
                console.error('[Auth] Session save error:', saveErr);
              }
              console.log('[Auth] User logged in successfully:', user.claims?.email);
              const redirectTo = (req.session as any).loginRedirect || "/admin";
              delete (req.session as any).loginRedirect;
              return res.redirect(redirectTo);
            });
          });
        })(req, res, next);
      });

      app.get("/api/logout", (req, res) => {
        req.logout(() => {
          res.redirect(
            client.buildEndSessionUrl(config, {
              client_id: process.env.REPL_ID!,
              post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
            }).href
          );
        });
      });

      console.log('[Auth] Replit OIDC authentication configured');
    } catch (error) {
      console.error('[Auth] Failed to setup Replit OIDC:', error);
    }
  } else {
    console.log('[Auth] Replit OIDC not available — using credential/magic-link auth');

    // Production logout (non-Replit)
    app.get("/api/logout", (req, res) => {
      req.logout(() => {
        req.session.destroy(() => {
          res.redirect("/portal/login");
        });
      });
    });
  }
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  // DEV MODE BYPASS: auto-authenticate when not in production
  if (process.env.NODE_ENV !== 'production') {
    // If already authenticated via Replit OIDC or session, use that
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    // Check for client portal admin session
    const session = req.session as any;
    if (session?.clientId && session?.isAdmin) {
      return next();
    }
    // Auto-inject a dev user so API calls have valid req.user
    (req as any).user = {
      claims: {
        sub: 'dev-user',
        email: 'dev@localhost',
        first_name: 'Dev',
        last_name: 'User',
      },
      expires_at: Math.floor(Date.now() / 1000) + 86400,
    };
    return next();
  }

  // PRODUCTION: full auth checks
  const session = req.session as any;

  // Check for client portal admin session
  if (session?.clientId && session?.isAdmin) {
    console.log('[Auth] Client portal admin session found:', session.clientId);
    return next();
  }

  // Check for credential/magic-link session (non-Replit production)
  if (session?.userId) {
    return next();
  }

  // Fall back to Replit OIDC authentication
  const user = req.user as any;

  if (!req.isAuthenticated || !req.isAuthenticated() || !user?.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const client = await import("openid-client");
    const memoize = (await import("memoizee")).default;
    const getOidcConfig = memoize(
      async () => {
        return await client.discovery(
          new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
          process.env.REPL_ID!
        );
      },
      { maxAge: 3600 * 1000 }
    );
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    user.claims = tokenResponse.claims();
    user.access_token = tokenResponse.access_token;
    user.refresh_token = tokenResponse.refresh_token;
    user.expires_at = user.claims?.exp;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
