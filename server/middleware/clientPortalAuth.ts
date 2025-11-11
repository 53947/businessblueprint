import { Request, Response, NextFunction } from 'express';
import { db } from '../db';
import { clients } from '@shared/schema';
import { eq } from 'drizzle-orm';

/**
 * Middleware to enforce client portal access based on session authentication AND account status
 * 
 * This middleware:
 * 1. Verifies the client is authenticated (has session clientId)
 * 2. Queries the database to get the client's account status
 * 3. Blocks access if account status is not "active" (suspended/banned/inactive/pending)
 * 4. Attaches client info to request for use in route handlers
 * 
 * Usage:
 * app.get('/api/clients/:id/dashboard', requireClientPortalAccess, async (req, res) => {
 *   const clientId = req.clientId; // Guaranteed to exist and be active
 *   // ... route handler logic
 * });
 */
export async function requireClientPortalAccess(req: any, res: Response, next: NextFunction) {
  try {
    // Extract clientId from session
    const sessionClientId = parseInt((req.session as any).clientId || '0');
    
    // Also check URL param if present (for endpoints like /api/clients/:id/dashboard)
    const urlClientId = req.params.id ? parseInt(req.params.id) : null;
    
    if (!sessionClientId) {
      return res.status(401).json({ 
        error: 'Not authenticated',
        message: 'Please log in to access your dashboard'
      });
    }
    
    // If URL has clientId, verify it matches session (prevent accessing other client's data)
    if (urlClientId && urlClientId !== sessionClientId) {
      return res.status(403).json({ 
        error: 'Access denied',
        message: 'You do not have permission to access this resource'
      });
    }
    
    // Get client from database to check account status
    const client = await db.query.clients.findFirst({
      where: eq(clients.id, sessionClientId),
      columns: {
        id: true,
        accountStatus: true,
        companyName: true,
        email: true
      }
    });
    
    if (!client) {
      return res.status(404).json({ 
        error: 'Account not found',
        message: 'Your account could not be found'
      });
    }
    
    // Check account status - only "active" accounts can access portal
    if (client.accountStatus !== 'active') {
      const statusMessages: Record<string, string> = {
        suspended: 'Your account has been suspended. Please contact support to resolve billing issues.',
        banned: 'Your account access has been restricted. Please contact support for assistance.',
        inactive: 'Your account is inactive. Please contact support to reactivate your account.',
        pending: 'Your account setup is still being processed. Please check back later or contact support.'
      };
      
      return res.status(403).json({ 
        error: 'Account access restricted',
        message: statusMessages[client.accountStatus] || 'Your account status prevents portal access',
        accountStatus: client.accountStatus
      });
    }
    
    // Attach client info to request for use in route handlers
    req.clientId = sessionClientId;
    req.client = client;
    
    next();
  } catch (error) {
    console.error('[ClientPortalAuth] Error checking access:', error);
    return res.status(500).json({ error: 'Authentication check failed' });
  }
}
