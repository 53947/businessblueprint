# SITEINSPECTOR INTEGRATION - CORRECTED & COMPLETE
## Using Real SiteInspector API with Two-Tier System

---

## 🤖 AGENT INSTRUCTIONS - READ FIRST

**STEP 0: PRE-CHECK VERIFICATION (DO THIS FIRST)**

Before implementing anything, verify the following:

1. **Payment Abstraction Exists:**
   ```
   Locate the payment service abstraction layer that was previously built.
   It should be in one of these locations:
   - server/services/payment.ts
   - server/lib/payment.ts
   - lib/payment.ts
   
   Verify it has:
   - Support for switching between 'stripe' and 'swipesblue' providers
   - A createCheckoutSession() method
   - A verifyWebhook() method
   - Uses PAYMENT_PROVIDER environment variable
   
   If found: Report the location and confirm it's working
   If not found: STOP and report that payment abstraction is missing
   ```

2. **Environment Variables Present:**
   ```
   Check Replit Secrets for:
   - PAYMENT_PROVIDER (should be 'stripe' currently)
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - SITEINSPECTOR_API_URL
   - SITEINSPECTOR_API_KEY
   
   Report which ones exist and which are missing.
   ```

3. **SiteInspector Database Tables:**
   ```
   Check if these tables exist:
   - site_inspector_results (with columns: type, status, results, reportId)
   - site_inspector_purchases (with columns: paymentProvider, transactionId, etc.)
   
   Report current schema or if tables need to be created.
   ```

**Report your findings for all three checks before proceeding with implementation.**

---

**STEP 1: CLEANUP PREVIOUS INCORRECT IMPLEMENTATION**

Before building the correct integration, remove or fix these issues from the previous implementation:

1. **Remove Direct Stripe Imports:**
   ```
   Find any files that directly import and use Stripe:
   - import Stripe from 'stripe'
   - const stripe = new Stripe(...)
   - stripe.checkout.sessions.create(...)
   
   These need to be replaced with payment service abstraction.
   List all files that need updating.
   ```

2. **Verify No Fake API Calls:**
   ```
   Search for any references to:
   - "presence-scanner" or "presenceScanner"
   - "/api/presence" or similar fake endpoints
   - Any SiteInspector endpoints that don't match the documentation
   
   Report if found and location. These need to be removed/replaced.
   ```

3. **Check Webhook Endpoint:**
   ```
   Current webhook is at: /api/stripe/webhook (or /api/webhooks/stripe)
   Verify it uses payment service for verification, not direct Stripe.
   If using direct Stripe, flag for replacement.
   ```

4. **Verify Database Schema Matches:**
   ```
   Check that site_inspector_results has:
   - type column (values: 'fast_check' or 'full_report')
   - status column (values: 'processing', 'completed', 'failed')
   - results column (JSONB for storing actual API response)
   - reportId column (for Full Report tracking)
   
   Check that site_inspector_purchases has:
   - paymentProvider column (NOT just 'stripeSessionId')
   - transactionId column (generic, not provider-specific)
   
   Report if schema needs updates.
   ```

**Complete cleanup report before proceeding to implementation.**

---

**Critical Context:**

Previous implementation made incorrect assumptions about SiteInspector's API and invented features that don't exist. This prompt provides the CORRECT implementation using SiteInspector's actual endpoints and data structures.

**Key Changes from Previous Implementation:**
1. "Presence Scanner" DOES NOT EXIST - Remove all references
2. "Fast Check" endpoint EXISTS and returns real scores (SSL, performance, mobile, accessibility)
3. "Full Report" is a queued system with webhook callbacks (not instant)
4. Payment MUST use abstraction layer for Stripe/SwipesBlue switching

**How to approach this:**

1. **Read the entire prompt** - Understand the complete flow before coding
2. **Use REAL API endpoints** - Follow the exact request/response formats provided
3. **Implement payment abstraction** - Do NOT use direct Stripe calls
4. **Test with real data** - Verify actual SiteInspector responses
5. **Complete all phases** - Each phase must work before moving to next
6. **Verify in production** - Test end-to-end flow with real assessment

**DO NOT mark complete until:**
- All verification checklist items are checked ✓
- Screenshots/proof provided for each feature
- End-to-end testing passed with real SiteInspector API calls

---

## 🎯 OBJECTIVE

Implement a two-tier SiteInspector system for BusinessBlueprint:

**Tier 1 (FREE):** Fast Check during assessment - Returns real scores (SSL, performance, mobile, accessibility)

**Tier 2 ($10):** Full Report with queued processing - Returns comprehensive analysis with prioritized task list

This keeps assessment fast while creating revenue opportunity.

---

## 📋 SITEINSPECTOR API - WHAT ACTUALLY EXISTS

### **The Real Three Options (SiteInspector UI):**

1. **Quick Analysis** (`/`) - Fast scan, 8 categories (buttons, logos, favicon, navigation, accessibility, forms, images, headings), up to 10 pages, 5-15 seconds
2. **Comprehensive Analysis** (`/analyze`) - Deep crawl with task list, up to 50 pages, 30-120 seconds
3. **Code and Site Auditor** (`/auditor`) - AI chat with DeepSeek for code review

### **For BusinessBlueprint Integration:**

**Endpoint:** `POST /api/businessblueprint/fast-check`
**Authentication:** Header `X-API-Key: your-api-key`
**Speed:** 5-10 seconds
**Returns:** Real scores and metrics

**Endpoint:** `POST /api/businessblueprint/full-report`
**Authentication:** Header `X-API-Key: your-api-key`
**Speed:** 1-5 minutes (queued, webhook callback)
**Returns:** Report ID and status, full results via webhook

---

## ⏱️ COMPLETE TIMING & EXECUTION FLOW

### **PHASE 1: Assessment Submission (0 seconds)**

**User Action:** Submits assessment form

**System Actions:**
1. Save assessment to database (status: `pending`)
2. Send Assessment Confirmation email immediately
3. Display confirmation page
4. Trigger background analysis: `processAssessmentAsync(assessmentId)`

**Email:** Assessment Confirmation
- Subject: "Assessment Received - We're Analyzing Your Business"
- Content: Confirmation of submission, analysis in progress

---

### **PHASE 2: Background Analysis (0-180 seconds)**

**Parallel Operations:**

#### **A. SiteInspector Fast Check (5-10 seconds)**

**Only if assessment has website URL:**

```typescript
if (assessment.websiteUrl) {
  try {
    const response = await fetch(
      `${process.env.SITEINSPECTOR_API_URL}/fast-check`,
      {
        method: 'POST',
        headers: {
          'X-API-Key': process.env.SITEINSPECTOR_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: assessment.websiteUrl,
          checks: ['comprehensive', 'ssl', 'speed', 'mobile', 'accessibility']
        }),
        signal: AbortSignal.timeout(15000), // 15 second timeout
      }
    );
    
    if (response.ok) {
      const fastCheckData = await response.json();
      
      // Store Fast Check results
      await db.insert(siteInspectorResults).values({
        assessmentId,
        type: 'fast_check',
        status: 'completed',
        results: fastCheckData.results, // Store the actual response
        requestedAt: new Date(),
        completedAt: new Date(),
      });
      
      console.log(`[SiteInspector] Fast Check completed: score ${fastCheckData.results.summary.overallScore}`);
    } else {
      console.error(`[SiteInspector] Fast Check failed: ${response.status}`);
    }
  } catch (error) {
    // Don't fail assessment if SiteInspector fails
    console.error('[SiteInspector] Fast Check error:', error);
  }
}
```

**Fast Check Response Structure (REAL):**

```json
{
  "success": true,
  "url": "https://example.com",
  "timestamp": "2026-01-09T12:00:00.000Z",
  "results": {
    "ssl": {
      "present": true,
      "valid": true,
      "issuer": "Let's Encrypt",
      "expiresIn": 90
    },
    "performance": {
      "loadTime": 2.5,
      "firstContentfulPaint": 1.2,
      "largestContentfulPaint": 2.8,
      "timeToInteractive": 3.5,
      "score": 75
    },
    "mobile": {
      "optimized": true,
      "score": 85,
      "viewport": true,
      "textSize": true,
      "tapTargets": true
    },
    "accessibility": {
      "score": 70,
      "issues": {
        "critical": ["Missing form labels"],
        "moderate": ["Low contrast text"],
        "minor": ["Redundant alt text"]
      }
    },
    "criticalIssues": [
      {
        "type": "accessibility",
        "severity": "critical",
        "issue": "3 critical accessibility issues",
        "impact": "Users with disabilities cannot access your site",
        "recommendation": "Fix WCAG compliance issues"
      }
    ],
    "summary": {
      "totalIssues": 8,
      "critical": 1,
      "highPriority": 2,
      "mediumPriority": 3,
      "lowPriority": 2,
      "overallScore": 72
    }
  }
}
```

#### **B. AI Prescription Generation (30-60 seconds)**

Existing AI prescription logic:
- Analyze assessment responses
- Generate product recommendations (/ send, / content, / reputation, etc.)
- Calculate Digital IQ score
- Store recommendations and prescription

**Include Fast Check data in AI context if available:**

```typescript
const aiContext = {
  assessment: assessment,
  responses: responses,
  siteInspectorScore: fastCheck?.results?.summary?.overallScore || null,
  criticalIssues: fastCheck?.results?.criticalIssues || [],
};

const prescription = await generateAIPrescription(aiContext);
```

---

### **PHASE 3: Digital IQ Email (180 seconds after submission)**

**System Actions:**
1. Verify assessment status is `completed`
2. Retrieve Digital IQ score, recommendations, and Fast Check results
3. Send Digital IQ Report email

**Email:** Digital IQ Assessment Report
- Subject: "Your Digital IQ Results: Here's Your Growth Blueprint"
- Content: Score, recommendations, bundles, **SiteInspector upsell**

**NEW: SiteInspector Section in Email**

Add this section BEFORE "Next Steps":

```html
<!-- SITEINSPECTOR RESULTS & UPSELL -->
{{#if hasFastCheck}}
<div style="background: #ffffff; border: 2px solid #0000FF; border-radius: 8px; padding: 25px; margin: 25px 0;">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
    <img src="{{SITE_URL}}/Site_Inspection.png" alt="SiteInspector" style="width: 48px; height: 48px;" />
    <h3 style="margin: 0; color: #0000FF; font-family: 'Archivo Semi Expanded', sans-serif;">Website Analysis Results</h3>
  </div>
  
  <p style="color: #09080E;">We ran a quick technical analysis of your website. Here's what we found:</p>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
    <div style="background: #EEFBFF; padding: 15px; border-radius: 8px; text-align: center;">
      <div style="font-size: 32px; font-weight: 700; color: {{getScoreColor fastCheckScore}};">
        {{fastCheckScore}}
      </div>
      <div style="font-size: 14px; color: #09080E;">Overall Score</div>
    </div>
    <div style="background: #EEFBFF; padding: 15px; border-radius: 8px; text-align: center;">
      <div style="font-size: 32px; font-weight: 700; color: {{getScoreColor performanceScore}};">
        {{performanceScore}}
      </div>
      <div style="font-size: 14px; color: #09080E;">Performance</div>
    </div>
    <div style="background: #EEFBFF; padding: 15px; border-radius: 8px; text-align: center;">
      <div style="font-size: 32px; font-weight: 700; color: {{getScoreColor mobileScore}};">
        {{mobileScore}}
      </div>
      <div style="font-size: 14px; color: #09080E;">Mobile Optimized</div>
    </div>
    <div style="background: #EEFBFF; padding: 15px; border-radius: 8px; text-align: center;">
      <div style="font-size: 32px; font-weight: 700; color: {{getScoreColor accessibilityScore}};">
        {{accessibilityScore}}
      </div>
      <div style="font-size: 14px; color: #09080E;">Accessibility</div>
    </div>
  </div>
  
  {{#if hasCriticalIssues}}
  <div style="background: #FEE2E2; border-left: 4px solid #DC2626; padding: 15px; margin: 15px 0; border-radius: 4px;">
    <p style="font-weight: 600; color: #991B1B; margin: 0 0 10px 0;">⚠️ Critical Issues Found</p>
    <ul style="margin: 0; padding-left: 20px; color: #09080E;">
      {{#each criticalIssues}}
      <li style="margin: 5px 0;">{{this.issue}}</li>
      {{/each}}
    </ul>
  </div>
  {{/if}}
  
  <div style="background: #DBEAFE; border-left: 4px solid #0000FF; padding: 15px; margin: 20px 0; border-radius: 4px;">
    <p style="font-weight: 600; color: #09080E; margin: 0 0 10px 0;">Want the Complete Picture?</p>
    <p style="color: #09080E; margin: 0 0 10px 0; font-size: 14px;">
      This was a quick scan. Get a <strong>comprehensive technical audit</strong> with:
    </p>
    <ul style="margin: 10px 0; padding-left: 20px; color: #09080E; font-size: 14px;">
      <li>Deep crawl of up to 50 pages</li>
      <li>Prioritized task list with effort estimates</li>
      <li>Detailed SEO, performance, and security analysis</li>
      <li>Specific recommendations for each issue</li>
      <li>Downloadable PDF report</li>
    </ul>
    <p style="font-size: 18px; color: #09080E; margin: 15px 0; font-weight: 600;">
      Get your Full SiteInspector Report for just $10
    </p>
    <div style="text-align: center; margin: 15px 0;">
      <a href="{{SITE_URL}}/siteinspector/purchase?assessment={{ASSESSMENT_ID}}" 
         style="display: inline-block; background: #0000FF; color: #EEFBFF; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Archivo Semi Expanded', sans-serif; font-size: 15px; border: 2px solid #0000FF;">
        Get Full Report - $10
      </a>
    </div>
    <p style="font-size: 13px; color: #09080E; opacity: 0.8; text-align: center; margin-top: 10px;">
      <em>Delivered within 5 minutes • Detailed PDF included</em>
    </p>
  </div>
</div>
{{else}}
<!-- If no Fast Check data, show simple upsell -->
<div style="background: #ffffff; border: 2px solid #0000FF; border-radius: 8px; padding: 25px; margin: 25px 0;">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
    <img src="{{SITE_URL}}/Site_Inspection.png" alt="SiteInspector" style="width: 48px; height: 48px;" />
    <h3 style="margin: 0; color: #0000FF; font-family: 'Archivo Semi Expanded', sans-serif;">Get a Complete Website Audit</h3>
  </div>
  <p style="color: #09080E;">Want to know how your website performs technically? Get a comprehensive analysis for just $10.</p>
  <div style="text-align: center; margin: 20px 0;">
    <a href="{{SITE_URL}}/siteinspector/purchase?assessment={{ASSESSMENT_ID}}" 
       style="display: inline-block; background: #0000FF; color: #EEFBFF; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Archivo Semi Expanded', sans-serif; font-size: 15px; border: 2px solid #0000FF;">
      Get Full Report - $10
    </a>
  </div>
</div>
{{/if}}
```

**Template Variables to Add:**

```typescript
{
  hasFastCheck: !!fastCheck,
  fastCheckScore: fastCheck?.results?.summary?.overallScore,
  performanceScore: fastCheck?.results?.performance?.score,
  mobileScore: fastCheck?.results?.mobile?.score,
  accessibilityScore: fastCheck?.results?.accessibility?.score,
  hasCriticalIssues: fastCheck?.results?.criticalIssues?.length > 0,
  criticalIssues: fastCheck?.results?.criticalIssues || [],
  // Helper function for score colors
  getScoreColor: (score) => {
    if (score >= 90) return '#10B981'; // green
    if (score >= 70) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  }
}
```

---

### **PHASE 4: Coach Blue Email (480 seconds after submission)**

**No changes needed** - Already created and working.

---

## 💳 PAYMENT ABSTRACTION LAYER (CRITICAL)

### **Problem with Current Implementation:**

Current code likely uses direct Stripe calls:
```typescript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
```

**This breaks when switching to SwipesBlue.**

### **Required Solution: Payment Service Abstraction**

#### **1. Create Payment Service** 

**Location:** `server/services/payment.ts`

```typescript
type PaymentProvider = 'stripe' | 'swipesblue';

interface CheckoutSessionParams {
  amount: number; // in cents
  currency?: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
}

interface CheckoutSession {
  id: string;
  url: string;
}

class PaymentService {
  private provider: PaymentProvider;
  private stripe: any;
  private swipesblue: any;

  constructor() {
    this.provider = (process.env.PAYMENT_PROVIDER || 'stripe') as PaymentProvider;
    
    if (this.provider === 'stripe') {
      const Stripe = require('stripe');
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    } else if (this.provider === 'swipesblue') {
      // SwipesBlue will be integrated here when ready
      this.swipesblue = null;
    }
  }

  async createCheckoutSession(params: CheckoutSessionParams): Promise<CheckoutSession> {
    if (this.provider === 'stripe') {
      return this.createStripeSession(params);
    } else {
      return this.createSwipesBlueSession(params);
    }
  }

  private async createStripeSession(params: CheckoutSessionParams): Promise<CheckoutSession> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: params.currency || 'usd',
          product_data: {
            name: params.description,
            images: ['https://businessblueprint.io/Site_Inspection.png'],
          },
          unit_amount: params.amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    });

    return {
      id: session.id,
      url: session.url!,
    };
  }

  private async createSwipesBlueSession(params: CheckoutSessionParams): Promise<CheckoutSession> {
    // SwipesBlue implementation goes here when ready
    throw new Error('SwipesBlue payment provider not yet configured');
  }

  async verifyWebhook(payload: Buffer | string, signature: string): Promise<any> {
    if (this.provider === 'stripe') {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // SwipesBlue webhook verification
      throw new Error('SwipesBlue webhook verification not yet configured');
    }
  }

  getProvider(): PaymentProvider {
    return this.provider;
  }
}

// Singleton instance
export const paymentService = new PaymentService();
```

#### **2. Update Purchase Endpoint**

**Location:** `server/routes.ts` (or wherever purchase route lives)

```typescript
import { paymentService } from './services/payment';

app.post('/api/siteinspector/checkout', async (req, res) => {
  try {
    const { assessmentId } = req.body;
    
    // Validate assessment exists
    const assessment = await db.query.assessments.findFirst({
      where: eq(assessments.id, assessmentId),
    });
    
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    
    // Check if already purchased
    const existingPurchase = await db.query.siteInspectorPurchases.findFirst({
      where: eq(siteInspectorPurchases.assessmentId, assessmentId),
    });
    
    if (existingPurchase) {
      return res.status(400).json({ error: 'Report already purchased' });
    }
    
    // Create checkout session using abstraction
    const session = await paymentService.createCheckoutSession({
      amount: 1000, // $10.00
      description: `SiteInspector Full Report - ${assessment.websiteUrl}`,
      successUrl: `${process.env.SITE_URL}/siteinspector/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.SITE_URL}/siteinspector/purchase?assessment=${assessmentId}`,
      metadata: {
        assessmentId: assessmentId.toString(),
        type: 'siteinspector_full_report',
        websiteUrl: assessment.websiteUrl || '',
      },
    });
    
    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
```

#### **3. Update Webhook Handler**

```typescript
app.post('/api/webhooks/stripe', async (req, res) => {
  const signature = req.headers['stripe-signature'] as string;
  
  try {
    // Use payment service for verification
    const event = await paymentService.verifyWebhook(
      req.body,
      signature
    );
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const assessmentId = parseInt(session.metadata.assessmentId);
      
      // Record payment
      const [purchase] = await db.insert(siteInspectorPurchases).values({
        assessmentId,
        paymentProvider: paymentService.getProvider(),
        transactionId: session.id,
        amount: 1000,
        status: 'paid',
        purchasedAt: new Date(),
      }).returning();
      
      console.log(`[Payment] SiteInspector purchase recorded: ${purchase.id}`);
      
      // Trigger Full Report
      await triggerSiteInspectorFullReport(assessmentId);
    }
    
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

#### **4. Environment Variables**

```env
# Payment Provider Selection
PAYMENT_PROVIDER=stripe
# When ready: PAYMENT_PROVIDER=swipesblue

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SwipesBlue (when ready)
SWIPESBLUE_API_KEY=...
SWIPESBLUE_WEBHOOK_SECRET=...
```

#### **5. Update Database Schema**

```typescript
export const siteInspectorPurchases = pgTable('site_inspector_purchases', {
  id: serial('id').primaryKey(),
  assessmentId: integer('assessment_id').notNull().references(() => assessments.id),
  paymentProvider: text('payment_provider').notNull(), // 'stripe' or 'swipesblue'
  transactionId: text('transaction_id').notNull().unique(),
  amount: integer('amount').notNull(),
  status: text('status').notNull(), // 'paid', 'refunded'
  purchasedAt: timestamp('purchased_at').notNull().defaultNow(),
  reportDeliveredAt: timestamp('report_delivered_at'),
});
```

---

## 📊 SITEINSPECTOR FULL REPORT FLOW

### **Trigger Full Report After Payment**

```typescript
async function triggerSiteInspectorFullReport(assessmentId: number) {
  try {
    // Get assessment
    const assessment = await db.query.assessments.findFirst({
      where: eq(assessments.id, assessmentId),
    });
    
    if (!assessment || !assessment.websiteUrl) {
      throw new Error('Assessment or website URL not found');
    }
    
    // Call SiteInspector Full Report API
    const response = await fetch(
      `${process.env.SITEINSPECTOR_API_URL}/full-report`,
      {
        method: 'POST',
        headers: {
          'X-API-Key': process.env.SITEINSPECTOR_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: assessment.websiteUrl,
          email: assessment.email,
          returnUrl: `${process.env.SITE_URL}/prescription/${assessmentId}`,
          webhookUrl: `${process.env.SITE_URL}/api/webhooks/siteinspector`,
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error(`SiteInspector API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store report request
    await db.insert(siteInspectorResults).values({
      assessmentId,
      type: 'full_report',
      status: 'processing',
      reportId: data.reportId,
      requestedAt: new Date(),
    });
    
    console.log(`[SiteInspector] Full Report queued: ${data.reportId}`);
    
    return data;
  } catch (error) {
    console.error('[SiteInspector] Full Report trigger error:', error);
    
    // Update purchase record with error
    await db.update(siteInspectorPurchases)
      .set({ status: 'error' })
      .where(eq(siteInspectorPurchases.assessmentId, assessmentId));
    
    throw error;
  }
}
```

### **SiteInspector Webhook (Report Ready)**

**Endpoint:** `POST /api/webhooks/siteinspector`

```typescript
app.post('/api/webhooks/siteinspector', async (req, res) => {
  try {
    const { reportId, status, results } = req.body;
    
    if (!reportId) {
      return res.status(400).json({ error: 'Missing reportId' });
    }
    
    // Find the report record
    const reportRecord = await db.query.siteInspectorResults.findFirst({
      where: and(
        eq(siteInspectorResults.reportId, reportId),
        eq(siteInspectorResults.type, 'full_report')
      ),
    });
    
    if (!reportRecord) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    if (status === 'completed') {
      // Update report with results
      await db.update(siteInspectorResults)
        .set({
          status: 'completed',
          results: results,
          completedAt: new Date(),
        })
        .where(eq(siteInspectorResults.id, reportRecord.id));
      
      // Update purchase record
      await db.update(siteInspectorPurchases)
        .set({ reportDeliveredAt: new Date() })
        .where(eq(siteInspectorPurchases.assessmentId, reportRecord.assessmentId));
      
      // Send delivery email
      await sendFullReportDeliveryEmail(reportRecord.assessmentId);
      
      console.log(`[SiteInspector] Full Report completed: ${reportId}`);
    } else if (status === 'failed') {
      await db.update(siteInspectorResults)
        .set({ status: 'failed' })
        .where(eq(siteInspectorResults.id, reportRecord.id));
      
      console.error(`[SiteInspector] Full Report failed: ${reportId}`);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('SiteInspector webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### **Full Report Delivery Email**

**Subject:** "Your SiteInspector Full Report is Ready"

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Same styling as other emails -->
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <div class="header">
        <img src="{{SITE_URL}}/Site_Inspection.png" alt="SiteInspector" style="width: 80px; height: 80px; margin-bottom: 15px;" />
        <h1>Your Website Audit is Complete</h1>
      </div>
      
      <div class="content">
        <p><strong>Hi {{BUSINESS_NAME}},</strong></p>
        
        <p>Great news! Your comprehensive SiteInspector report is ready.</p>
        
        <p>We analyzed <strong>{{WEBSITE_URL}}</strong> and found {{TOTAL_ISSUES}} items that need attention.</p>
        
        <h2>Report Summary:</h2>
        <div style="background: #EEFBFF; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div style="text-align: center;">
              <div style="font-size: 36px; font-weight: 700; color: #EF4444;">{{CRITICAL_COUNT}}</div>
              <div style="font-size: 14px; color: #09080E;">Critical Issues</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 36px; font-weight: 700; color: #F59E0B;">{{HIGH_COUNT}}</div>
              <div style="font-size: 14px; color: #09080E;">High Priority</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 36px; font-weight: 700; color: #10B981;">{{PAGES_ANALYZED}}</div>
              <div style="font-size: 14px; color: #09080E;">Pages Analyzed</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 36px; font-weight: 700; color: #0000FF;">{{TASKS_COUNT}}</div>
              <div style="font-size: 14px; color: #09080E;">Actionable Tasks</div>
            </div>
          </div>
        </div>
        
        <h3>Top Priority Tasks:</h3>
        <ul style="margin: 15px 0; padding-left: 20px;">
          {{#each topTasks}}
          <li style="margin: 10px 0;">
            <strong style="color: {{this.priorityColor}};">{{this.title}}</strong>
            <br>
            <span style="font-size: 14px; color: #09080E;">{{this.description}}</span>
          </li>
          {{/each}}
        </ul>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="{{PRESCRIPTION_URL}}#siteinspector" class="cta-button">
            View Full Report
          </a>
        </div>
        
        <p>Your complete report with all tasks, priorities, and recommendations is now available on your prescription page.</p>
        
        <p><strong>Need help implementing these fixes?</strong> Our products can help. Check out your prescription for recommended tools.</p>
      </div>
      
      <div class="footer">
        <p><strong>BusinessBlueprint.io</strong></p>
        <p>© 2026 BusinessBlueprint.io</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 🖥️ PRESCRIPTION PAGE UPDATES

### **Display SiteInspector Results**

**Location:** Prescription page component (e.g., `/client/src/pages/Prescription.tsx`)

#### **1. Fetch SiteInspector Data**

```typescript
// In prescription page data loading
const siteInspectorData = await db.query.siteInspectorResults.findMany({
  where: eq(siteInspectorResults.assessmentId, assessmentId),
});

const purchase = await db.query.siteInspectorPurchases.findFirst({
  where: eq(siteInspectorPurchases.assessmentId, assessmentId),
});

const fastCheck = siteInspectorData.find(r => r.type === 'fast_check');
const fullReport = siteInspectorData.find(r => r.type === 'full_report');
const hasPurchased = !!purchase;
```

#### **2. Add SiteInspector Section to Page**

Insert AFTER Digital IQ score display, BEFORE product recommendations:

```tsx
{/* SITEINSPECTOR RESULTS SECTION */}
{fastCheck && fastCheck.results && (
  <section className="bg-white border-2 border-blue-600 rounded-lg p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <img src="/Site_Inspection.png" alt="SiteInspector" className="w-12 h-12" />
      <h2 className="text-2xl font-bold text-blue-600">Website Technical Analysis</h2>
    </div>
    
    {/* FAST CHECK RESULTS */}
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
      <h3 className="font-semibold text-lg mb-3">Quick Scan Results</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center bg-white p-3 rounded">
          <div className={`text-3xl font-bold ${getScoreColor(fastCheck.results.summary?.overallScore)}`}>
            {fastCheck.results.summary?.overallScore || 'N/A'}
          </div>
          <div className="text-sm text-gray-600 mt-1">Overall Score</div>
        </div>
        <div className="text-center bg-white p-3 rounded">
          <div className={`text-3xl font-bold ${getScoreColor(fastCheck.results.performance?.score)}`}>
            {fastCheck.results.performance?.score || 'N/A'}
          </div>
          <div className="text-sm text-gray-600 mt-1">Performance</div>
        </div>
        <div className="text-center bg-white p-3 rounded">
          <div className={`text-3xl font-bold ${getScoreColor(fastCheck.results.mobile?.score)}`}>
            {fastCheck.results.mobile?.score || 'N/A'}
          </div>
          <div className="text-sm text-gray-600 mt-1">Mobile</div>
        </div>
        <div className="text-center bg-white p-3 rounded">
          <div className={`text-3xl font-bold ${getScoreColor(fastCheck.results.accessibility?.score)}`}>
            {fastCheck.results.accessibility?.score || 'N/A'}
          </div>
          <div className="text-sm text-gray-600 mt-1">Accessibility</div>
        </div>
      </div>
      
      {/* SSL Status */}
      {fastCheck.results.ssl && (
        <div className="mt-4 flex items-center gap-2">
          {fastCheck.results.ssl.valid ? (
            <>
              <span className="text-green-600">✓</span>
              <span className="text-sm">SSL Certificate Valid ({fastCheck.results.ssl.issuer})</span>
            </>
          ) : (
            <>
              <span className="text-red-600">✗</span>
              <span className="text-sm text-red-600">SSL Certificate Issue</span>
            </>
          )}
        </div>
      )}
    </div>
    
    {/* CRITICAL ISSUES */}
    {fastCheck.results.criticalIssues && fastCheck.results.criticalIssues.length > 0 && (
      <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
        <h4 className="font-semibold text-red-800 mb-2">
          ⚠️ Critical Issues ({fastCheck.results.criticalIssues.length})
        </h4>
        <ul className="space-y-2">
          {fastCheck.results.criticalIssues.map((issue, idx) => (
            <li key={idx} className="text-sm">
              <strong>{issue.issue}</strong>
              <p className="text-gray-700">{issue.impact}</p>
              <p className="text-blue-600">→ {issue.recommendation}</p>
            </li>
          ))}
        </ul>
      </div>
    )}
    
    {/* UPSELL OR FULL REPORT */}
    {!hasPurchased ? (
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
        <p className="font-semibold mb-2">Want the Complete Analysis?</p>
        <p className="text-sm mb-3">
          This was a quick scan. Get a comprehensive audit with up to 50 pages analyzed, 
          prioritized task list with effort estimates, and detailed recommendations.
        </p>
        <a 
          href={`/siteinspector/purchase?assessment=${assessmentId}`}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Get Full Report - $10
        </a>
      </div>
    ) : fullReport && fullReport.status === 'processing' ? (
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
        <p className="font-semibold">⏳ Generating Your Full Report...</p>
        <p className="text-sm mt-2">
          Your comprehensive analysis is being generated. This typically takes 1-5 minutes. 
          You'll receive an email when it's ready.
        </p>
      </div>
    ) : fullReport && fullReport.status === 'completed' ? (
      <div className="mt-4">
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
          <p className="font-semibold text-green-800">✓ Full Report Available</p>
        </div>
        
        <h3 className="font-bold text-lg mb-3">Comprehensive Analysis Results</h3>
        
        {/* Report Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center bg-blue-50 p-4 rounded">
            <div className="text-3xl font-bold text-red-600">
              {fullReport.results.tasks?.filter(t => t.priority === 'critical').length || 0}
            </div>
            <div className="text-sm text-gray-600">Critical</div>
          </div>
          <div className="text-center bg-blue-50 p-4 rounded">
            <div className="text-3xl font-bold text-orange-600">
              {fullReport.results.tasks?.filter(t => t.priority === 'high').length || 0}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="text-center bg-blue-50 p-4 rounded">
            <div className="text-3xl font-bold text-blue-600">
              {fullReport.results.pagesAnalyzed?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Pages Analyzed</div>
          </div>
          <div className="text-center bg-blue-50 p-4 rounded">
            <div className="text-3xl font-bold text-green-600">
              {fullReport.results.tasks?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
        </div>
        
        {/* Tasks by Priority */}
        {fullReport.results.tasks && fullReport.results.tasks.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-bold">Prioritized Task List</h4>
            
            {/* Critical Tasks */}
            {fullReport.results.tasks.filter(t => t.priority === 'critical').length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4">
                <h5 className="font-semibold text-red-800 mb-3">
                  Critical Priority
                </h5>
                <div className="space-y-3">
                  {fullReport.results.tasks
                    .filter(t => t.priority === 'critical')
                    .map((task, idx) => (
                      <div key={idx} className="bg-white p-3 rounded border border-red-200">
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="font-semibold text-sm">{task.title}</h6>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            {task.estimatedEffort}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                        {task.affectedPages && task.affectedPages.length > 0 && (
                          <p className="text-xs text-gray-600">
                            Affects {task.affectedPages.length} page{task.affectedPages.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {/* High Priority Tasks */}
            {fullReport.results.tasks.filter(t => t.priority === 'high').length > 0 && (
              <div className="bg-orange-50 border-l-4 border-orange-600 p-4">
                <h5 className="font-semibold text-orange-800 mb-3">
                  High Priority
                </h5>
                <div className="space-y-3">
                  {fullReport.results.tasks
                    .filter(t => t.priority === 'high')
                    .slice(0, 5)
                    .map((task, idx) => (
                      <div key={idx} className="bg-white p-3 rounded border border-orange-200">
                        <div className="flex justify-between items-start mb-2">
                          <h6 className="font-semibold text-sm">{task.title}</h6>
                          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                            {task.estimatedEffort}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{task.description}</p>
                      </div>
                    ))}
                  {fullReport.results.tasks.filter(t => t.priority === 'high').length > 5 && (
                    <p className="text-sm text-gray-600">
                      + {fullReport.results.tasks.filter(t => t.priority === 'high').length - 5} more high priority tasks
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Show count of medium/low priority tasks */}
            {(fullReport.results.tasks.filter(t => t.priority === 'medium').length > 0 ||
              fullReport.results.tasks.filter(t => t.priority === 'low').length > 0) && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-sm">
                  <strong>Additional Tasks:</strong> 
                  {' '}{fullReport.results.tasks.filter(t => t.priority === 'medium').length} medium priority
                  {', '}{fullReport.results.tasks.filter(t => t.priority === 'low').length} low priority
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    ) : null}
  </section>
)}

{/* Helper function */}
<script>{`
function getScoreColor(score) {
  if (!score) return 'text-gray-400';
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
}
`}</script>
```

---

## 📋 COMPLETE VERIFICATION CHECKLIST

### **Payment Abstraction:**
- [ ] Payment service created in `server/services/payment.ts`
- [ ] Supports both Stripe and SwipesBlue providers
- [ ] SiteInspector purchase uses payment service (not direct Stripe)
- [ ] Webhook uses payment service for verification
- [ ] `PAYMENT_PROVIDER` env variable works
- [ ] Database tracks payment provider
- [ ] Ready to switch by changing one variable

### **Fast Check Integration:**
- [ ] Fast Check runs during assessment (5-10 seconds)
- [ ] Uses real endpoint: `/api/businessblueprint/fast-check`
- [ ] Stores actual response data in database
- [ ] Assessment doesn't fail if Fast Check fails
- [ ] Fast Check data displays correctly

### **Digital IQ Email:**
- [ ] SiteInspector section added with real scores
- [ ] Shows Overall, Performance, Mobile, Accessibility scores
- [ ] Displays critical issues if present
- [ ] Shows upsell for Full Report
- [ ] Link includes assessment ID
- [ ] Proper TriadBlue branding

### **Prescription Page:**
- [ ] Fast Check results display with scores
- [ ] Purchase button shows when not purchased
- [ ] Processing message shows after purchase
- [ ] Full Report displays when ready
- [ ] Tasks organized by priority
- [ ] All scores and metrics correct

### **Full Report Flow:**
- [ ] Payment triggers Full Report request
- [ ] Uses real endpoint: `/api/businessblueprint/full-report`
- [ ] Report queued successfully
- [ ] Webhook receives completion callback
- [ ] Results stored in database
- [ ] Delivery email sent
- [ ] Full Report displays on prescription page

### **End-to-End Testing:**
- [ ] Submit assessment with real website URL
- [ ] Fast Check completes and stores data
- [ ] Digital IQ email received with SiteInspector scores
- [ ] Prescription page shows Fast Check results
- [ ] Purchase Full Report ($10 test payment)
- [ ] Full Report triggered after payment
- [ ] Receive delivery email when ready
- [ ] Full Report displays on prescription page
- [ ] All scores, tasks, and data accurate

---

## 🚨 REQUIRED COMPLETION REPORT

**Do NOT report complete until you provide:**

### **1. Payment Abstraction Evidence**
- Screenshot of payment service code
- Screenshot showing it's used (not direct Stripe)
- Confirmation that `PAYMENT_PROVIDER` switching works

### **2. Fast Check Evidence**
- Screenshot of Fast Check API call in code
- Screenshot of Fast Check results in database
- Screenshot of Fast Check scores in email
- Screenshot of Fast Check scores on prescription page

### **3. Full Report Evidence**
- Screenshot of Full Report API call
- Screenshot of webhook handler
- Screenshot of Full Report email
- Screenshot of Full Report tasks on prescription page

### **4. End-to-End Test Results**
- Assessment ID used for testing
- Screenshots of all 3 emails received
- Screenshots of prescription page (before and after purchase)
- Confirmation all real SiteInspector data displayed correctly

---

## ⚠️ CRITICAL REMINDERS

1. **Use REAL SiteInspector endpoints** - No "Presence Scanner" or invented features
2. **Fast Check returns actual scores** - Display the real performance, mobile, accessibility scores
3. **Full Report is queued** - It takes 1-5 minutes, uses webhooks
4. **Payment must be abstracted** - Ready for SwipesBlue switch
5. **Test with real SiteInspector API** - Don't mock the responses
6. **All icons must display** - Site_Inspection.png, Website-SEO.png, relationships.png
7. **Branding is critical** - Light gray headers, blueprint background, app name formats

---

**BEGIN IMPLEMENTATION. DO NOT SKIP ANY SECTION.**

*End of Corrected Implementation Prompt*
