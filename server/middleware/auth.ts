import type { Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwt";

export interface AuthenticatedRequest extends Request {
  clientId?: number;
  externalId?: string;
  permissions?: string[];
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Extract token from Authorization header or query parameter
    const authHeader = req.headers.authorization;
    const queryToken = req.query.token as string;
    
    const token = authHeader?.replace('Bearer ', '') || queryToken;
    
    if (!token) {
      res.status(401).json({ 
        success: false,
        message: "Authentication required" 
      });
      return;
    }

    // Verify JWT token
    const payload = jwtService.verifyToken(token);
    
    // Check if token is still active
    const isActive = await jwtService.isTokenActive(token);
    if (!isActive) {
      res.status(401).json({ 
        success: false,
        message: "Token has been revoked" 
      });
      return;
    }

    // Attach client info to request
    req.clientId = payload.clientId;
    req.externalId = payload.externalId;
    req.permissions = payload.permissions;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ 
      success: false,
      message: "Invalid or expired token" 
    });
  }
}

export function requirePermission(permission: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.permissions || !req.permissions.includes(permission)) {
      res.status(403).json({ 
        success: false,
        message: "Insufficient permissions" 
      });
      return;
    }
    next();
  };
}
