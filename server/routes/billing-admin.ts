import { Router } from 'express';
import { storage } from '../storage';
import { z } from 'zod';
import { isAuthenticated } from '../replitAuth';
import { db } from '../db';
import { clients } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { requireClientPortalAccess } from '../middleware/clientPortalAuth';

// Admin middleware - checks if user is authenticated AND is an admin
const requireAdmin = [isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    // Get user ID from authenticated session
    const userId = req.user?.claims?.sub;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Check if user is an admin in the database
    const user = await db.query.clients.findFirst({
      where: eq(clients.id, parseInt(userId))
    });
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    // User is admin, allow access
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ error: 'Authorization check failed' });
  }
}];

export function registerBillingAdminRoutes(router: Router) {
  
  // ========================================
  // ADMIN SUBSCRIPTION & BILLING ROUTES
  // ========================================
  
  // GET /api/admin/subscriptions - Get all subscriptions with full details
  router.get('/api/admin/subscriptions', requireAdmin, async (req, res) => {
    try {
      const subscriptions = await storage.getAllSubscriptions();
      
      // Calculate MRR and stats
      const stats = {
        totalSubscriptions: subscriptions.length,
        activeSubscriptions: subscriptions.filter(s => s.subscription.status === 'active').length,
        monthlyRecurringRevenue: subscriptions
          .filter(s => s.subscription.status === 'active' && s.subscription.billingCycle === 'monthly')
          .reduce((sum, s) => sum + parseFloat(s.subscription.totalAmount || '0'), 0),
      };
      
      res.json({ subscriptions, stats });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
  });
  
  // GET /api/admin/clients/:id/billing - Get specific client's billing details
  router.get('/api/admin/clients/:id/billing', requireAdmin, async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      
      // Get client info
      const client = await storage.getClient(clientId);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      // Get subscription
      const subscription = await storage.getClientSubscription(clientId);
      
      // Get billing history
      const billingHistory = await storage.getClientBillingHistory(clientId, 12);
      
      // Get account status history
      const statusHistory = await storage.getClientAccountStatusHistory(clientId);
      
      res.json({
        client,
        subscription,
        billingHistory,
        statusHistory,
      });
    } catch (error) {
      console.error('Error fetching client billing:', error);
      res.status(500).json({ error: 'Failed to fetch client billing details' });
    }
  });
  
  // PATCH /api/admin/clients/:id/status - Update account status
  router.patch('/api/admin/clients/:id/status', requireAdmin, async (req, res) => {
    try {
      const clientId = parseInt(req.params.id);
      
      // Validate request body
      const statusSchema = z.object({
        status: z.enum(['active', 'suspended', 'inactive', 'pending', 'banned']),
        reason: z.string().optional(),
        changedBy: z.number().optional(),
      });
      
      const { status, reason, changedBy } = statusSchema.parse(req.body);
      
      // Get current client to track previous status
      const currentClient = await storage.getClient(clientId);
      if (!currentClient) {
        return res.status(404).json({ error: 'Client not found' });
      }
      
      // Update status
      const updatedClient = await storage.updateClientAccountStatus(
        clientId,
        status,
        reason || null,
        changedBy || null
      );
      
      // Record status change in audit log
      await storage.recordAccountStatusChange({
        clientId,
        previousStatus: currentClient.accountStatus || 'active',
        newStatus: status,
        reason: reason || null,
        changedBy: changedBy || null,
        ipAddress: req.ip || null,
        userAgent: req.get('user-agent') || null,
      });
      
      res.json({ client: updatedClient });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid request data', details: error.errors });
      }
      console.error('Error updating account status:', error);
      res.status(500).json({ error: 'Failed to update account status' });
    }
  });
  
  // ========================================
  // CLIENT PORTAL SUBSCRIPTION & BILLING ROUTES
  // ========================================
  
  // GET /api/portal/subscription - Get client's subscription details
  router.get('/api/portal/subscription', requireClientPortalAccess, async (req: any, res) => {
    try {
      const clientId = req.clientId; // Set by middleware
      
      const subscription = await storage.getClientSubscription(clientId);
      
      if (!subscription) {
        return res.json({ subscription: null });
      }
      
      res.json({ subscription });
    } catch (error) {
      console.error('Error fetching client subscription:', error);
      res.status(500).json({ error: 'Failed to fetch subscription details' });
    }
  });
  
  // GET /api/portal/billing-history - Get client's billing history
  router.get('/api/portal/billing-history', requireClientPortalAccess, async (req: any, res) => {
    try {
      const clientId = req.clientId; // Set by middleware
      
      const limit = parseInt(req.query.limit as string) || 12;
      const billingHistory = await storage.getClientBillingHistory(clientId, limit);
      
      res.json({ billingHistory });
    } catch (error) {
      console.error('Error fetching billing history:', error);
      res.status(500).json({ error: 'Failed to fetch billing history' });
    }
  });
  
  // GET /api/subscription-plans - Get all available subscription plans (public)
  router.get('/api/subscription-plans', async (req, res) => {
    try {
      const plans = await storage.getAllSubscriptionPlans();
      res.json({ plans });
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      res.status(500).json({ error: 'Failed to fetch subscription plans' });
    }
  });
  
  // GET /api/subscription-addons - Get all available subscription addons (public)
  router.get('/api/subscription-addons', async (req, res) => {
    try {
      const addons = await storage.getAllSubscriptionAddons();
      res.json({ addons });
    } catch (error) {
      console.error('Error fetching subscription addons:', error);
      res.status(500).json({ error: 'Failed to fetch subscription addons' });
    }
  });
}
