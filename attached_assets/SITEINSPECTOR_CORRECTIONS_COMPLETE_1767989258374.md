# SITEINSPECTOR IMPLEMENTATION CORRECTIONS
## Critical Missing Components & Payment Abstraction Fix

---

## 🤖 AGENT INSTRUCTIONS - READ CAREFULLY

You reported the SiteInspector Two-Tier System as complete, but several critical components were not implemented or not mentioned. This prompt identifies what's missing and provides complete specifications for each.

**Your previous work on database schema, purchase page, and webhook handler is good foundation work. However:**

1. **The Digital IQ email was NOT updated** with the SiteInspector upsell section
2. **The Prescription page was NOT updated** to display Fast Check or Full Report results
3. **Fast Check integration** into the assessment flow was not mentioned
4. **Payment abstraction layer** was not used (you used direct Stripe calls instead)
5. **Missing icons** were not added to emails
6. **PDF download** functionality was not implemented

**DO NOT mark this as complete until ALL items below are verified and working.**

---

## 🚨 CRITICAL ISSUE #1: PAYMENT ABSTRACTION LAYER

### **The Problem:**

You implemented direct Stripe calls in the SiteInspector purchase flow:
```typescript
// WRONG - What you probably did:
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const session = await stripe.checkout.sessions.create({ ... });
```

**This breaks when we switch to SwipesBlue.**

### **The Solution:**

BusinessBlueprint already has a payment service abstraction that switches between Stripe and SwipesBlue based on environment variables. **You MUST use this existing service.**

### **Required Changes:**

#### **1. Locate the Existing Payment Service**

Find the existing payment abstraction. It should be in one of these locations:
- `server/services/payment.ts`
- `server/lib/payment.ts`
- `lib/payment.ts`

**If it exists**, examine its interface and use it.

**If it does NOT exist yet**, then create it following this pattern:

```typescript
// server/services/payment.ts

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
  paymentIntentId?: string;
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
    } else {
      // SwipesBlue integration (will be added when ready)
      // For now, this just ensures the structure is ready
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
            name: 'SiteInspector Full Report',
            description: params.description,
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
    // SwipesBlue implementation will go here
    // For now, throw error if someone tries to use it before it's ready
    throw new Error('SwipesBlue payment provider not yet configured');
  }

  async verifyWebhook(payload: any, signature: string): Promise<any> {
    if (this.provider === 'stripe') {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else {
      // SwipesBlue webhook verification will go here
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

#### **2. Update SiteInspector Purchase Route**

**Replace direct Stripe calls with payment service:**

```typescript
// server/routes.ts (or wherever your purchase route is)

import { paymentService } from './services/payment';

// In your /siteinspector/purchase handler:
app.post('/api/siteinspector/checkout', async (req, res) => {
  const { assessmentId } = req.body;
  
  // Validate assessment exists
  const assessment = await db.query.assessments.findFirst({
    where: eq(assessments.id, assessmentId),
  });
  
  if (!assessment) {
    return res.status(404).json({ error: 'Assessment not found' });
  }
  
  // Use payment service (NOT direct Stripe)
  const session = await paymentService.createCheckoutSession({
    amount: 1000, // $10.00
    description: `SiteInspector Full Report for ${assessment.websiteUrl}`,
    successUrl: `${process.env.SITE_URL}/siteinspector/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${process.env.SITE_URL}/siteinspector/purchase?assessment=${assessmentId}`,
    metadata: {
      assessmentId: assessmentId.toString(),
      type: 'siteinspector_full_report',
    },
  });
  
  res.json({ url: session.url });
});
```

#### **3. Update Webhook Handler**

**Use payment service for webhook verification:**

```typescript
// server/routes.ts (webhook handler)

app.post('/api/webhooks/stripe', async (req, res) => {
  const signature = req.headers['stripe-signature'] as string;
  
  try {
    // Use payment service for verification (NOT direct Stripe)
    const event = await paymentService.verifyWebhook(
      req.body,
      signature
    );
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const assessmentId = parseInt(session.metadata.assessmentId);
      
      // Record payment
      await db.insert(siteInspectorPurchases).values({
        assessmentId,
        stripeSessionId: session.id,
        amount: 1000,
        status: 'paid',
        purchasedAt: new Date(),
      });
      
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

Add this to your `.env`:
```env
PAYMENT_PROVIDER=stripe
# When ready to switch: PAYMENT_PROVIDER=swipesblue
```

#### **5. Verify Abstraction Works**

Test that:
- [ ] Purchase flow works with `PAYMENT_PROVIDER=stripe`
- [ ] Webhook verification works
- [ ] Changing provider to invalid value throws proper error
- [ ] Payment service is singleton (same instance used everywhere)

---

## 🚨 CRITICAL ISSUE #2: DIGITAL IQ EMAIL NOT UPDATED

### **The Problem:**

The Digital IQ Report email template was NOT updated with the SiteInspector upsell section. Users have no way to discover they can purchase the Full Report.

### **The Solution:**

Add the complete SiteInspector upsell section to the existing Digital IQ email template.

### **Required Changes:**

#### **1. Locate the Digital IQ Email Template**

Find where the Digital IQ Report email is generated. It should be in:
- `server/services/email.ts` (function: `generateDigitalIQReportHTML()` or similar)
- Or in an email template file

#### **2. Add Upsell Section BEFORE the "Next Steps" section**

Insert this HTML block between the recommendations section and the "Next Steps" section:

```html
<!-- SITEINSPECTOR FULL REPORT UPSELL -->
<div style="background: #ffffff; border: 2px solid #0000FF; border-radius: 8px; padding: 25px; margin: 25px 0;">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
    <img src="{{SITE_URL}}/Site_Inspection.png" alt="SiteInspector" style="width: 48px; height: 48px;" />
    <h3 style="margin: 0; color: #0000FF; font-family: 'Archivo Semi Expanded', sans-serif;">Want a Complete Website Audit?</h3>
  </div>
  
  <p style="color: #09080E;">Your Digital IQ Assessment included a quick scan of your website. For a <strong>comprehensive technical analysis</strong> with actionable insights:</p>
  
  <ul style="margin: 15px 0; padding-left: 20px; color: #09080E;">
    <li><strong>Performance Analysis:</strong> Page speed, loading times, Core Web Vitals, optimization opportunities</li>
    <li><strong>SEO Deep Dive:</strong> Meta tags, structured data, indexability, mobile SEO, local SEO factors</li>
    <li><strong>Security Audit:</strong> SSL configuration, vulnerabilities, security headers, best practices</li>
    <li><strong>Mobile Optimization:</strong> Responsive design, mobile usability, touch targets, viewport</li>
    <li><strong>Code Quality:</strong> HTML validation, accessibility (WCAG) compliance, best practices</li>
    <li><strong>Competitive Analysis:</strong> How your site compares to industry standards</li>
  </ul>
  
  <p style="font-size: 18px; color: #09080E; margin: 20px 0;">
    <strong>Get your complete SiteInspector Report for just $10</strong>
  </p>
  
  <div style="text-align: center; margin: 20px 0;">
    <a href="{{SITE_URL}}/siteinspector/purchase?assessment={{ASSESSMENT_ID}}" style="display: inline-block; background: #0000FF; color: #EEFBFF; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Archivo Semi Expanded', sans-serif; font-size: 16px; border: 2px solid #0000FF;">
      Get Full Website Audit - $10
    </a>
  </div>
  
  <p style="font-size: 14px; color: #09080E; opacity: 0.8; text-align: center; margin-top: 15px;">
    <em>Report delivered within 5 minutes of payment • Detailed analysis included</em>
  </p>
</div>
```

#### **3. Ensure Dynamic Variables Work**

The email template must replace:
- `{{SITE_URL}}` - Base URL (e.g., https://businessblueprint.io)
- `{{ASSESSMENT_ID}}` - The assessment ID number

#### **4. Verify Email Renders Correctly**

Test that:
- [ ] Upsell section appears in Digital IQ email
- [ ] SiteInspector icon displays
- [ ] Link points to correct purchase page with assessment ID
- [ ] All text is readable with proper colors
- [ ] Section maintains TriadBlue branding (blue border, etc.)

---

## 🚨 CRITICAL ISSUE #3: PRESCRIPTION PAGE NOT UPDATED

### **The Problem:**

The prescription page does NOT display:
- Fast Check results (basic website analysis)
- Full Report results (after purchase)
- Purchase button for Full Report (if not purchased)

Users have no way to see their SiteInspector data.

### **The Solution:**

Add SiteInspector results section to the prescription page with conditional display based on purchase status.

### **Required Changes:**

#### **1. Locate Prescription Page Component**

Find the prescription page. It should be:
- `/client/src/pages/Prescription.tsx`
- `/app/prescription/[id]/page.tsx`
- Or similar location

#### **2. Fetch SiteInspector Data**

Add queries to load SiteInspector data:

```typescript
// In your prescription page data fetching
const siteInspectorData = await db.query.siteInspectorResults.findMany({
  where: eq(siteInspectorResults.assessmentId, assessmentId),
});

const fullReportPurchase = await db.query.siteInspectorPurchases.findFirst({
  where: eq(siteInspectorPurchases.assessmentId, assessmentId),
});

const fastCheck = siteInspectorData.find(r => r.type === 'fast_check');
const fullReport = siteInspectorData.find(r => r.type === 'full_report');
const hasPurchased = !!fullReportPurchase;
```

#### **3. Add SiteInspector Results Section**

Insert this section AFTER the Digital IQ score display but BEFORE product recommendations:

```tsx
{/* SITEINSPECTOR RESULTS SECTION */}
{fastCheck && (
  <section className="bg-white border-2 border-blue-600 rounded-lg p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <img src="/Site_Inspection.png" alt="SiteInspector" className="w-12 h-12" />
      <h2 className="text-2xl font-bold text-blue-600">Website Analysis</h2>
    </div>
    
    {/* FAST CHECK RESULTS (ALWAYS SHOW) */}
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
      <h3 className="font-semibold text-lg mb-3">Quick Scan Results</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500">
            {fastCheck.results?.pageSpeedScore || 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Page Speed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500">
            {fastCheck.results?.mobileScore || 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Mobile Friendly</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500">
            {fastCheck.results?.seoScore || 'N/A'}
          </div>
          <div className="text-sm text-gray-600">Basic SEO</div>
        </div>
      </div>
    </div>
    
    {/* UPSELL (IF NOT PURCHASED) */}
    {!hasPurchased && (
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
        <p className="font-semibold mb-2">Want the complete picture?</p>
        <p className="text-sm mb-3">
          Get a comprehensive technical audit with detailed recommendations, 
          performance metrics, security analysis, and competitive insights for just $10.
        </p>
        <a 
          href={`/siteinspector/purchase?assessment=${assessmentId}`}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Get Full Report - $10
        </a>
      </div>
    )}
    
    {/* FULL REPORT (IF PURCHASED) */}
    {hasPurchased && fullReport && fullReport.status === 'completed' && (
      <div className="mt-4">
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
          <p className="font-semibold text-green-800">✓ Full Report Available</p>
        </div>
        
        <h3 className="font-bold text-lg mb-3">Comprehensive Analysis</h3>
        
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500">
              {fullReport.results?.overallScore || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Overall</div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getGradeColor(fullReport.results?.performanceGrade)}`}>
              {fullReport.results?.performanceGrade || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Performance</div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getGradeColor(fullReport.results?.seoGrade)}`}>
              {fullReport.results?.seoGrade || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">SEO</div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getGradeColor(fullReport.results?.securityGrade)}`}>
              {fullReport.results?.securityGrade || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Security</div>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getGradeColor(fullReport.results?.mobileGrade)}`}>
              {fullReport.results?.mobileGrade || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Mobile</div>
          </div>
        </div>
        
        {/* ISSUES BREAKDOWN */}
        {fullReport.results?.issues && (
          <div className="space-y-4">
            <h4 className="font-bold">
              Issues Found ({fullReport.results.issuesCount || 0})
            </h4>
            
            {fullReport.results.criticalIssues?.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4">
                <h5 className="font-semibold text-red-800">
                  Critical ({fullReport.results.criticalIssues.length})
                </h5>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  {fullReport.results.criticalIssues.map((issue: any, idx: number) => (
                    <li key={idx} className="text-sm">{issue.description}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {fullReport.results.warnings?.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
                <h5 className="font-semibold text-yellow-800">
                  Warnings ({fullReport.results.warnings.length})
                </h5>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  {fullReport.results.warnings.slice(0, 5).map((issue: any, idx: number) => (
                    <li key={idx} className="text-sm">{issue.description}</li>
                  ))}
                </ul>
                {fullReport.results.warnings.length > 5 && (
                  <p className="text-sm text-gray-600 mt-2">
                    + {fullReport.results.warnings.length - 5} more warnings
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* PDF DOWNLOAD */}
        {fullReport.results?.pdfUrl && (
          <div className="mt-6 text-center">
            <a 
              href={fullReport.results.pdfUrl}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
              download
            >
              Download Full PDF Report
            </a>
          </div>
        )}
      </div>
    )}
    
    {/* PROCESSING STATE */}
    {hasPurchased && (!fullReport || fullReport.status === 'processing') && (
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
        <p className="font-semibold">⏳ Generating Your Full Report...</p>
        <p className="text-sm mt-2">
          Your comprehensive analysis is being generated. This typically takes 3-5 minutes. 
          You'll receive an email when it's ready, or refresh this page to check status.
        </p>
      </div>
    )}
  </section>
)}

{/* Helper function for grade colors */}
<script>
{`
function getGradeColor(grade) {
  if (!grade) return 'text-gray-400';
  if (grade === 'A' || grade === 'A+') return 'text-green-600';
  if (grade === 'B' || grade === 'B+') return 'text-blue-600';
  if (grade === 'C' || grade === 'C+') return 'text-yellow-600';
  if (grade === 'D' || grade === 'D+') return 'text-orange-600';
  return 'text-red-600';
}
`}
</script>
```

#### **4. Verify Display Works**

Test all states:
- [ ] Fast Check results display when no purchase
- [ ] Purchase button appears when not purchased
- [ ] "Processing" message shows after purchase but before report ready
- [ ] Full Report displays when completed
- [ ] PDF download link works
- [ ] All icons load correctly

---

## 🚨 CRITICAL ISSUE #4: FAST CHECK NOT INTEGRATED

### **The Problem:**

Fast Check should run automatically during assessment submission, but integration was not mentioned. Without this, there's no data to show in the prescription.

### **The Solution:**

Integrate Fast Check API call into the assessment submission handler.

### **Required Changes:**

#### **1. Locate Assessment Submission Handler**

Find where assessments are processed after submission:
- Probably in `server/services/assessment.ts` or similar
- Function like `processAssessmentAsync()` or `analyzeAssessment()`

#### **2. Add Fast Check Call**

Insert Fast Check request during the background processing:

```typescript
async function processAssessmentAsync(assessmentId: number) {
  try {
    // Get assessment details
    const assessment = await db.query.assessments.findFirst({
      where: eq(assessments.id, assessmentId),
    });
    
    if (!assessment) {
      throw new Error('Assessment not found');
    }
    
    // === NEW: FAST CHECK INTEGRATION ===
    if (assessment.websiteUrl) {
      try {
        const fastCheckResponse = await fetch(
          `${process.env.SITEINSPECTOR_API_URL}/fast-check`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.SITEINSPECTOR_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: assessment.websiteUrl,
              assessmentId: assessmentId,
            }),
            signal: AbortSignal.timeout(10000), // 10 second timeout
          }
        );
        
        if (fastCheckResponse.ok) {
          const fastCheckData = await fastCheckResponse.json();
          
          // Store Fast Check results
          await db.insert(siteInspectorResults).values({
            assessmentId,
            type: 'fast_check',
            status: 'completed',
            results: fastCheckData,
            requestedAt: new Date(),
            completedAt: new Date(),
          });
          
          console.log(`[SiteInspector] Fast Check completed for assessment ${assessmentId}`);
        } else {
          console.error(`[SiteInspector] Fast Check failed with status ${fastCheckResponse.status}`);
        }
      } catch (error) {
        // Don't fail assessment if Fast Check fails
        console.error('[SiteInspector] Fast Check error:', error);
      }
    }
    // === END FAST CHECK ===
    
    // Continue with existing AI prescription generation
    const prescription = await generateAIPrescription(assessment);
    
    // ... rest of existing code
    
  } catch (error) {
    console.error('Assessment processing error:', error);
    // Update assessment status to failed
  }
}
```

#### **3. Verify Integration Works**

Test that:
- [ ] Fast Check runs during assessment (check logs)
- [ ] Fast Check data saved to database
- [ ] Assessment still completes if Fast Check fails
- [ ] Fast Check results display on prescription page

---

## 🚨 CRITICAL ISSUE #5: MISSING ICONS IN EMAILS

### **The Problem:**

Two icons that should appear in Digital IQ email were not added:
- `Website-SEO.png` - For website/SEO recommendations
- `relationships.png` (or `__relationships.png`) - For / relationships CRM recommendations

### **The Solution:**

Update email template to use correct icons for these recommendations.

### **Required Changes:**

#### **1. Locate Recommendation Sections in Email**

Find where product recommendations are displayed in the Digital IQ email template.

#### **2. Ensure Icon Mapping**

Make sure the email generation code maps product IDs to correct icons:

```typescript
const productIconMap = {
  'send': '/send.png',
  'content': '/content.png',
  'inbox': '/inbox.png',
  'livechat': '/livechat.png',
  'listings': '/listings.png',
  'reputation': '/reputation.png',
  'localblue': '/localblue.png',
  'relationships': '/relationships.png',  // TEXT LOGO VERSION
  'commverse': '/commverse.png',
  // Add these if using square icons:
  // 'send': '/__send.png',
  // 'content': '/__content.png',
  // etc.
};
```

#### **3. Add Website-SEO Icon Usage**

If there's a section discussing general website improvements, use:
```html
<img src="{{SITE_URL}}/Website-SEO.png" alt="Website & SEO" style="width: 48px; height: 48px;" />
```

#### **4. Verify Icons Display**

Test that:
- [ ] All product icons display in email
- [ ] Website-SEO.png shows where appropriate
- [ ] relationships.png shows when / relationships is recommended
- [ ] Icons load in Gmail, Outlook, Apple Mail

---

## 🚨 CRITICAL ISSUE #6: PDF DOWNLOAD NOT IMPLEMENTED

### **The Problem:**

Full Report email mentions PDF download, but functionality was not implemented.

### **The Solution:**

Either generate PDF from Full Report data, or link to SiteInspector's PDF if they provide one.

### **Required Changes:**

#### **Option A: SiteInspector Provides PDF**

If SiteInspector Full Report response includes a PDF URL:
```typescript
// In webhook handler when Full Report completes
const pdfUrl = reportData.pdfUrl; // If SiteInspector provides this

// Store in database
await db.update(siteInspectorResults)
  .set({
    results: {
      ...reportData,
      pdfUrl: pdfUrl,
    },
  });
```

#### **Option B: Generate PDF Ourselves**

If we need to generate the PDF:

1. Install PDF library: `npm install pdfkit`
2. Create PDF generation service:

```typescript
// server/services/pdf.ts
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export async function generateSiteInspectorPDF(
  assessmentId: number,
  reportData: any
): Promise<string> {
  const doc = new PDFDocument();
  const filename = `siteinspector-${assessmentId}-${Date.now()}.pdf`;
  const filepath = path.join('/tmp', filename);
  
  doc.pipe(fs.createWriteStream(filepath));
  
  // Add content
  doc.fontSize(25).text('SiteInspector Full Report', 100, 100);
  doc.fontSize(12).text(`Assessment ID: ${assessmentId}`, 100, 150);
  // ... add all report data
  
  doc.end();
  
  // Upload to storage or serve from /tmp
  // Return URL where PDF can be accessed
  return `/api/siteinspector/pdf/${filename}`;
}
```

3. Add route to serve PDF:
```typescript
app.get('/api/siteinspector/pdf/:filename', (req, res) => {
  const filepath = path.join('/tmp', req.params.filename);
  res.download(filepath);
});
```

#### **4. Verify PDF Works**

Test that:
- [ ] PDF link appears in email
- [ ] PDF link appears on prescription page
- [ ] PDF downloads successfully
- [ ] PDF contains all report data
- [ ] PDF has proper branding

---

## 📋 COMPLETE VERIFICATION CHECKLIST

Before reporting this as complete, verify ALL of these:

### **Payment Abstraction:**
- [ ] Payment service exists and is properly structured
- [ ] SiteInspector uses payment service (not direct Stripe)
- [ ] Webhook uses payment service for verification
- [ ] `PAYMENT_PROVIDER` env variable works
- [ ] Ready to switch to SwipesBlue by changing one variable

### **Digital IQ Email:**
- [ ] SiteInspector upsell section added to email
- [ ] Section has proper TriadBlue branding
- [ ] SiteInspector icon displays
- [ ] Purchase link includes assessment ID
- [ ] Email tested and renders correctly

### **Prescription Page:**
- [ ] Fast Check results display
- [ ] Purchase button appears when not purchased
- [ ] Processing message shows after purchase
- [ ] Full Report displays when ready
- [ ] PDF download link works
- [ ] All states tested

### **Fast Check Integration:**
- [ ] Fast Check runs during assessment
- [ ] Results saved to database
- [ ] Assessment doesn't fail if Fast Check fails
- [ ] Data appears on prescription page

### **Icons:**
- [ ] All product icons display in emails
- [ ] Website-SEO.png used where appropriate
- [ ] relationships.png used for / relationships
- [ ] Icons tested in multiple email clients

### **PDF Download:**
- [ ] PDF generation or linking implemented
- [ ] PDF accessible from email
- [ ] PDF accessible from prescription page
- [ ] PDF contains complete report data

### **End-to-End Flow:**
- [ ] Submit assessment → Fast Check runs
- [ ] Digital IQ email received with upsell
- [ ] Prescription page shows Fast Check + purchase button
- [ ] Purchase flow works (test payment)
- [ ] Full Report triggered after payment
- [ ] Full Report email received
- [ ] Prescription page updated with Full Report
- [ ] PDF download works

---

## 🚨 DO NOT REPORT COMPLETE

**Do NOT say this is complete until:**

1. ALL items in the verification checklist are checked
2. You provide screenshots or detailed descriptions of each working feature
3. You confirm end-to-end testing passed
4. You verify payment abstraction is ready for SwipesBlue switch

---

## 📝 REQUIRED COMPLETION REPORT

When you've completed ALL corrections, provide:

1. **What was fixed/added** (detailed list with code references)
2. **Screenshots** showing:
   - Updated Digital IQ email with upsell
   - Prescription page with Fast Check results
   - Prescription page with Full Report (after purchase)
   - Payment abstraction code structure
3. **Testing results** for all items in checklist
4. **Confirmation** that switching to SwipesBlue requires only changing `PAYMENT_PROVIDER` variable

---

**BEGIN CORRECTIONS NOW. DO NOT SKIP ANY ITEMS.**
