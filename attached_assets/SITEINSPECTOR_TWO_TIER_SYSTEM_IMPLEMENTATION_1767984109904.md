# SITEINSPECTOR TWO-TIER SYSTEM IMPLEMENTATION
## Fast Check (Free) + Full Report ($10 Upsell)

---

## 🤖 AGENT INSTRUCTIONS - READ FIRST

**How to approach this task:**

1. **Read the ENTIRE prompt before starting** - Don't jump ahead and start coding. Understand the complete flow from assessment to payment to report delivery.

2. **Follow the timing flow EXACTLY** - The sequence and timing of emails is critical. Fast Check must not delay the main assessment flow. Digital IQ email must send within 3 minutes.

3. **Complete implementation in phases** - This is broken into 5 phases. Complete each phase fully and test before moving to the next. Do not skip phases or combine them.

4. **Test payment flow thoroughly** - Use Stripe test mode (test card: 4242 4242 4242 4242). Verify webhooks fire correctly. Confirm Full Report triggers after payment.

5. **Maintain existing functionality** - The current assessment flow works. Do not break it. Add the new features without disrupting what's already working.

6. **Follow branding specifications EXACTLY** - Every color, every gradient, every app name format (/ send, / content, etc.) must match the existing templates. Black is #09080E (never #000000).

7. **Database integrity is critical** - Track payment status, report status, and delivery status separately. Use transactions where needed. Handle edge cases (payment succeeds but report fails, etc.).

8. **Error handling is mandatory** - If SiteInspector fails, the assessment should still complete. If payment succeeds but report fails, notify user and support team. Never leave users in a broken state.

9. **Ask questions if unclear** - If any part of the flow is ambiguous, ask for clarification rather than guessing. Especially around timing, webhooks, and error scenarios.

10. **Provide completion report for each phase** - After completing each phase, summarize what was implemented, what was tested, and confirmation that the phase works before moving to the next.

**CRITICAL:** The Digital IQ email must send within 3 minutes of assessment submission regardless of Full Report status. The Full Report is a PAID UPGRADE that happens AFTER the main assessment flow completes.

---

## 🎯 OBJECTIVE

Implement a two-tier SiteInspector system:
1. **Fast Check** - Free, runs during assessment, provides basic website analysis
2. **Full Report** - $10 paid upgrade, comprehensive technical audit with detailed metrics

This keeps the assessment flow fast while creating an upsell opportunity for users who want deeper technical insights.

---

## ⏱️ COMPLETE TIMING & EXECUTION FLOW

### **PHASE 1: Assessment Submission (0 seconds)**

**User Action:** Submits assessment form

**System Actions:**
1. Save assessment data to database
2. Create assessment record with status: `pending`
3. Send Assessment Confirmation email immediately
4. Return confirmation page to user
5. Trigger background processing

**Email Sent:** Assessment Confirmation
- Subject: "Assessment Received - We're Analyzing Your Business"
- Content: "We're analyzing your business. Results in 2-3 minutes."

---

### **PHASE 2: Background Analysis (0-180 seconds)**

**System Actions (in parallel):**

1. **SiteInspector Fast Check (5-10 seconds)**
   - Call: `POST /api/businessblueprint/fast-check`
   - Payload: `{ url: assessmentUrl, assessmentId }`
   - Returns: Basic presence data (page speed estimate, mobile-friendly check, basic SEO)
   - Store: Save to `site_inspector_results` table with `type: 'fast_check'`

2. **AI Prescription Generation (30-60 seconds)**
   - Analyze assessment responses
   - Include Fast Check data in analysis
   - Generate product recommendations (/ send, / content, / reputation, etc.)
   - Calculate Digital IQ score
   - Store: Save to `recommendations` and `prescriptions` tables

3. **Update Assessment Status**
   - Status: `pending` → `completed`
   - Store Digital IQ score
   - Link prescription ID

---

### **PHASE 3: Digital IQ Email (180 seconds after submission)**

**System Actions:**
1. Verify assessment status is `completed`
2. Retrieve Digital IQ score and recommendations
3. Send Digital IQ Report email

**Email Sent:** Digital IQ Assessment Report
- Subject: "Your Digital IQ Results: Here's Your Growth Blueprint"
- Content: 
  - Digital IQ score
  - Product recommendations (/ send, / content, / reputation)
  - Bundle advantages (/ commverse, / localblue)
  - **NEW: SiteInspector Full Report upsell section**
  - CTA: View Prescription, Take Platform Tour

**NEW SECTION TO ADD TO EMAIL:**

```html
<!-- SITEINSPECTOR FULL REPORT UPSELL -->
<div style="background: #ffffff; border: 2px solid #0000FF; border-radius: 8px; padding: 25px; margin: 25px 0;">
  <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
    <img src="{{SITE_URL}}/Site_Inspection.png" alt="SiteInspector" style="width: 48px; height: 48px;" />
    <h3 style="margin: 0; color: #0000FF; font-family: 'Archivo Semi Expanded', sans-serif;">Want a Complete Website Audit?</h3>
  </div>
  
  <p>Your Digital IQ Assessment included a quick scan of your website. For a <strong>comprehensive technical analysis</strong> with actionable insights:</p>
  
  <ul style="margin: 15px 0; padding-left: 20px;">
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
    <a href="{{SITE_INSPECTOR_PURCHASE_URL}}" style="display: inline-block; background: #0000FF; color: #EEFBFF; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 700; font-family: 'Archivo Semi Expanded', sans-serif; font-size: 16px; border: 2px solid #0000FF;">
      Get Full Website Audit - $10
    </a>
  </div>
  
  <p style="font-size: 14px; color: #09080E; opacity: 0.8; text-align: center; margin-top: 15px;">
    <em>Report delivered within 5 minutes of payment • Detailed PDF included</em>
  </p>
</div>
```

**Dynamic Variable:**
- `{{SITE_INSPECTOR_PURCHASE_URL}}` = `/siteinspector/purchase?assessment={{ASSESSMENT_ID}}`

---

### **PHASE 4: Coach Blue Email (480 seconds after submission)**

**System Actions:**
1. Wait 5 minutes after Digital IQ email sent
2. Send Coach Blue Introduction email

**Email Sent:** Coach Blue Introduction
- Subject: "Meet Coach Blue - Your AI Guide to Digital Success"
- Content: Welcome, free platform tour, $99/mo subscription info
- **NO CHANGES NEEDED** (already created)

---

## 💳 SITEINSPECTOR FULL REPORT PURCHASE FLOW

### **Step 1: Purchase Page**

**URL:** `/siteinspector/purchase?assessment={{ASSESSMENT_ID}}`

**Page Content:**
- Show assessment details (business name, website URL)
- Explain what's included in Full Report
- Display price: $10 (one-time payment)
- Stripe payment form

**Page Design:**
- Light blue background (#EEFBFF)
- Blueprint grid pattern
- Use SiteInspector icon (Site_Inspection.png)
- Clear value proposition

---

### **Step 2: Stripe Payment Processing**

**Payment Flow:**
```javascript
// Create Stripe Checkout Session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'SiteInspector Full Report',
        description: 'Comprehensive website technical audit',
        images: ['https://businessblueprint.io/Site_Inspection.png'],
      },
      unit_amount: 1000, // $10.00
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${process.env.SITE_URL}/siteinspector/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.SITE_URL}/siteinspector/purchase?assessment=${assessmentId}`,
  metadata: {
    assessmentId: assessmentId,
    type: 'siteinspector_full_report',
  },
});

// Redirect to Stripe Checkout
redirect(session.url);
```

**Environment Variables Needed:**
- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_WEBHOOK_SECRET` - For webhook signature verification
- `SITE_URL` - Base URL for redirects

---

### **Step 3: Stripe Webhook Handler**

**Webhook Endpoint:** `POST /api/webhooks/stripe`

**Events to Handle:**
```javascript
case 'checkout.session.completed':
  const session = event.data.object;
  const assessmentId = session.metadata.assessmentId;
  
  // 1. Update database
  await db.insert(siteInspectorPurchases).values({
    assessmentId,
    stripeSessionId: session.id,
    amount: 1000,
    status: 'paid',
    purchasedAt: new Date(),
  });
  
  // 2. Trigger SiteInspector Full Report
  await triggerFullReport(assessmentId);
  
  break;
```

**Database Schema Addition:**
```typescript
// Add new table: site_inspector_purchases
export const siteInspectorPurchases = pgTable('site_inspector_purchases', {
  id: serial('id').primaryKey(),
  assessmentId: integer('assessment_id').notNull().references(() => assessments.id),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  amount: integer('amount').notNull(), // in cents
  status: text('status').notNull(), // 'paid', 'refunded'
  purchasedAt: timestamp('purchased_at').notNull().defaultNow(),
  reportDeliveredAt: timestamp('report_delivered_at'),
});
```

---

### **Step 4: Trigger Full Report**

**After Payment Confirmed:**

```javascript
async function triggerFullReport(assessmentId) {
  // 1. Get assessment details
  const assessment = await db.query.assessments.findFirst({
    where: eq(assessments.id, assessmentId),
  });
  
  // 2. Call SiteInspector Full Report API
  const response = await fetch(`${process.env.SITEINSPECTOR_API_URL}/full-report`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SITEINSPECTOR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: assessment.websiteUrl,
      assessmentId: assessmentId,
      webhookUrl: `${process.env.SITE_URL}/api/webhooks/siteinspector`,
    }),
  });
  
  const data = await response.json();
  
  // 3. Store request in database
  await db.insert(siteInspectorResults).values({
    assessmentId,
    type: 'full_report',
    status: 'processing',
    requestedAt: new Date(),
  });
  
  return data;
}
```

---

### **Step 5: SiteInspector Webhook (Report Ready)**

**Webhook Endpoint:** `POST /api/webhooks/siteinspector`

**When Full Report Completes:**
```javascript
// SiteInspector calls this webhook when report is ready
app.post('/api/webhooks/siteinspector', async (req, res) => {
  const { assessmentId, reportData } = req.body;
  
  // 1. Update database with full report data
  await db.update(siteInspectorResults)
    .set({
      status: 'completed',
      results: reportData,
      completedAt: new Date(),
    })
    .where(and(
      eq(siteInspectorResults.assessmentId, assessmentId),
      eq(siteInspectorResults.type, 'full_report')
    ));
  
  // 2. Update purchase record
  await db.update(siteInspectorPurchases)
    .set({
      reportDeliveredAt: new Date(),
    })
    .where(eq(siteInspectorPurchases.assessmentId, assessmentId));
  
  // 3. Send report delivery email
  await sendFullReportEmail(assessmentId);
  
  res.json({ success: true });
});
```

---

### **Step 6: Full Report Delivery Email**

**Email Sent:** SiteInspector Full Report Ready

**Subject:** "Your SiteInspector Report is Ready"

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
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
        
        <p>We've completed a deep technical analysis of <strong>{{WEBSITE_URL}}</strong> across performance, SEO, security, mobile optimization, and code quality.</p>
        
        <h2>What's in Your Report:</h2>
        <ul>
          <li><strong>Overall Score:</strong> {{OVERALL_SCORE}}/100</li>
          <li><strong>Performance Grade:</strong> {{PERFORMANCE_GRADE}}</li>
          <li><strong>SEO Grade:</strong> {{SEO_GRADE}}</li>
          <li><strong>Security Grade:</strong> {{SECURITY_GRADE}}</li>
          <li><strong>Issues Found:</strong> {{ISSUES_COUNT}} ({{CRITICAL_COUNT}} critical)</li>
        </ul>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="{{PRESCRIPTION_URL}}#siteinspector" class="cta-button">
            View Full Report
          </a>
          <br>
          <a href="{{DOWNLOAD_PDF_URL}}" class="cta-button" style="background: #0000FF; border: 2px solid #0000FF;">
            Download PDF Report
          </a>
        </div>
        
        <p>Your full report is now available on your prescription page, and we've also attached a downloadable PDF for your records.</p>
        
        <p><strong>Need help fixing these issues?</strong> Our tools can help you implement the recommendations. Reply to this email or check out your prescription for next steps.</p>
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

## 📊 DATABASE UPDATES

### **New Table: site_inspector_purchases**
```sql
CREATE TABLE site_inspector_purchases (
  id SERIAL PRIMARY KEY,
  assessment_id INTEGER NOT NULL REFERENCES assessments(id),
  stripe_session_id TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  purchased_at TIMESTAMP NOT NULL DEFAULT NOW(),
  report_delivered_at TIMESTAMP
);
```

### **Update Table: site_inspector_results**
Add `type` column to distinguish Fast Check vs Full Report:
```sql
ALTER TABLE site_inspector_results 
ADD COLUMN type TEXT NOT NULL DEFAULT 'fast_check';
-- Values: 'fast_check' or 'full_report'

ALTER TABLE site_inspector_results
ADD COLUMN status TEXT DEFAULT 'completed';
-- Values: 'processing', 'completed', 'failed'

ALTER TABLE site_inspector_results
ADD COLUMN requested_at TIMESTAMP DEFAULT NOW();

ALTER TABLE site_inspector_results
ADD COLUMN completed_at TIMESTAMP;
```

---

## 🎨 PRESCRIPTION PAGE UPDATES

### **Display Fast Check Results (Always Visible)**

**Section on prescription page:**
```jsx
<section className="bg-white border-2 border-blue-600 rounded-lg p-6 mb-6">
  <div className="flex items-center gap-3 mb-4">
    <img src="/Site_Inspection.png" alt="SiteInspector" className="w-12 h-12" />
    <h2 className="text-2xl font-bold text-blue-600">Quick Website Analysis</h2>
  </div>
  
  <div className="grid grid-cols-3 gap-4 mb-4">
    <div className="text-center">
      <div className="text-3xl font-bold text-orange-500">{fastCheck.pageSpeedScore}</div>
      <div className="text-sm text-gray-600">Page Speed</div>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-orange-500">{fastCheck.mobileScore}</div>
      <div className="text-sm text-gray-600">Mobile Friendly</div>
    </div>
    <div className="text-center">
      <div className="text-3xl font-bold text-orange-500">{fastCheck.seoScore}</div>
      <div className="text-sm text-gray-600">Basic SEO</div>
    </div>
  </div>
  
  {!hasFullReport && (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-4">
      <p className="font-semibold mb-2">Want the complete picture?</p>
      <p className="text-sm mb-3">Get a comprehensive technical audit with detailed recommendations for just $10.</p>
      <a href={`/siteinspector/purchase?assessment=${assessmentId}`} 
         className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold">
        Get Full Report - $10
      </a>
    </div>
  )}
</section>
```

### **Display Full Report (After Purchase)**

**If user has purchased:**
```jsx
{hasFullReport && (
  <section className="bg-white border-2 border-blue-600 rounded-lg p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <img src="/Site_Inspection.png" alt="SiteInspector" className="w-12 h-12" />
      <h2 className="text-2xl font-bold text-blue-600">Complete Website Audit</h2>
    </div>
    
    <div className="grid grid-cols-5 gap-4 mb-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-orange-500">{fullReport.overallScore}</div>
        <div className="text-sm text-gray-600">Overall</div>
      </div>
      <div className="text-center">
        <div className={`text-4xl font-bold ${getGradeColor(fullReport.performanceGrade)}`}>
          {fullReport.performanceGrade}
        </div>
        <div className="text-sm text-gray-600">Performance</div>
      </div>
      <div className="text-center">
        <div className={`text-4xl font-bold ${getGradeColor(fullReport.seoGrade)}`}>
          {fullReport.seoGrade}
        </div>
        <div className="text-sm text-gray-600">SEO</div>
      </div>
      <div className="text-center">
        <div className={`text-4xl font-bold ${getGradeColor(fullReport.securityGrade)}`}>
          {fullReport.securityGrade}
        </div>
        <div className="text-sm text-gray-600">Security</div>
      </div>
      <div className="text-center">
        <div className={`text-4xl font-bold ${getGradeColor(fullReport.mobileGrade)}`}>
          {fullReport.mobileGrade}
        </div>
        <div className="text-sm text-gray-600">Mobile</div>
      </div>
    </div>
    
    {/* Detailed issues breakdown */}
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Issues Found ({fullReport.issuesCount})</h3>
      
      {fullReport.criticalIssues.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4">
          <h4 className="font-semibold text-red-800">Critical ({fullReport.criticalIssues.length})</h4>
          <ul className="mt-2 space-y-1">
            {fullReport.criticalIssues.map(issue => (
              <li key={issue.id} className="text-sm">{issue.description}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Similar sections for warnings, recommendations */}
    </div>
    
    <div className="mt-6 text-center">
      <a href={fullReport.pdfUrl} 
         className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold">
        Download Full PDF Report
      </a>
    </div>
  </section>
)}
```

---

## ⏱️ COMPLETE EMAIL SEQUENCE TIMELINE

**Time 0:00** - User submits assessment
↓
**Time 0:01** - Assessment Confirmation email sent
↓
**Time 0:05-0:10** - SiteInspector Fast Check completes
↓
**Time 0:30-1:00** - AI prescription generation completes
↓
**Time 3:00** - Digital IQ Report email sent (includes $10 SiteInspector upsell)
↓
**Time 8:00** - Coach Blue Introduction email sent
↓
*[User sees emails, clicks SiteInspector upsell, pays $10]*
↓
**Time 8:05** - Payment confirmed, Full Report triggered
↓
**Time 13:00** - Full Report completes (5 min processing)
↓
**Time 13:01** - Full Report Delivery email sent

---

## 🧪 TESTING CHECKLIST

### **Fast Check Flow:**
- [ ] Submit assessment with real website URL
- [ ] Verify Fast Check completes within 10 seconds
- [ ] Confirm Fast Check data saved to database
- [ ] Check Digital IQ email includes SiteInspector upsell section
- [ ] Verify prescription page shows Fast Check results
- [ ] Confirm $10 upsell button appears

### **Purchase Flow:**
- [ ] Click "Get Full Website Audit - $10" button
- [ ] Verify purchase page loads with correct assessment details
- [ ] Test Stripe checkout (use test card: 4242 4242 4242 4242)
- [ ] Confirm payment success redirect works
- [ ] Verify webhook receives checkout.session.completed event
- [ ] Check database records payment in site_inspector_purchases table

### **Full Report Flow:**
- [ ] Verify Full Report API call triggered after payment
- [ ] Check database shows status: 'processing'
- [ ] Wait for SiteInspector webhook callback
- [ ] Confirm Full Report data saved to database
- [ ] Verify Full Report Delivery email sent
- [ ] Check prescription page now shows full report section
- [ ] Test PDF download link works

### **Email Verification:**
- [ ] All 4 emails use correct branding (light gray header/footer, blueprint background)
- [ ] Icons display properly (Site_Inspection.png in upsell sections)
- [ ] Links work correctly
- [ ] Subject lines correct

---

## 🚨 CRITICAL REQUIREMENTS

1. **NEVER delay Digital IQ email** - Must send within 3 minutes regardless of Full Report status
2. **Fast Check must complete quickly** - 10 second max, or skip and note in email
3. **Payment must be secure** - Use Stripe's recommended flow, verify webhook signatures
4. **Full Report is optional** - System works perfectly without it
5. **Clear value proposition** - Users must understand what they get for $10
6. **Proper error handling** - If SiteInspector fails, don't break assessment flow
7. **Database integrity** - Track payment status, report status separately
8. **Email deliverability** - All emails must use proper sender, SPF/DKIM configured

---

## 📋 IMPLEMENTATION CHECKLIST

### **Phase 1: Update Existing Flow**
- [ ] Add SiteInspector upsell section to Digital IQ email template
- [ ] Update email service to include new section with dynamic URL
- [ ] Test current flow still works with new email section

### **Phase 2: Build Purchase Flow**
- [ ] Create `/siteinspector/purchase` page
- [ ] Integrate Stripe Checkout
- [ ] Set up Stripe webhook endpoint
- [ ] Create site_inspector_purchases table
- [ ] Test payment flow end-to-end

### **Phase 3: Implement Full Report Trigger**
- [ ] Create triggerFullReport function
- [ ] Set up SiteInspector webhook receiver
- [ ] Update site_inspector_results table schema
- [ ] Test Full Report request/response cycle

### **Phase 4: Build Report Delivery**
- [ ] Create Full Report Delivery email template
- [ ] Implement PDF generation (or link to SiteInspector PDF)
- [ ] Update prescription page with full report display
- [ ] Test complete flow from purchase to delivery

### **Phase 5: Testing & Polish**
- [ ] End-to-end testing with real payment (test mode)
- [ ] Error handling for failed reports
- [ ] Refund handling (if needed)
- [ ] Performance optimization
- [ ] Deploy to production

---

## 🔧 ENVIRONMENT VARIABLES NEEDED

```env
# Stripe (already have these)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SiteInspector (already have these)
SITEINSPECTOR_API_URL=https://siteinspector.dev/api/businessblueprint
SITEINSPECTOR_API_KEY=BBAPI_live_...
SITEINSPECTOR_TEST_KEY=BBAPI_test_...

# Site URLs
SITE_URL=https://businessblueprint.io
```

---

## ✅ SUCCESS CRITERIA

Implementation is complete when:
- ✅ Assessment flow completes in under 3 minutes
- ✅ Digital IQ email includes SiteInspector upsell
- ✅ Users can purchase Full Report for $10
- ✅ Payment triggers Full Report automatically
- ✅ Full Report delivery email sent within 5 minutes of payment
- ✅ Prescription page displays both Fast Check and Full Report (when purchased)
- ✅ All emails maintain proper TriadBlue branding
- ✅ Icons display correctly throughout
- ✅ Error handling prevents system failures

---

**END OF IMPLEMENTATION PROMPT**

This two-tier system keeps assessment fast while creating revenue opportunity and delivering premium value to paying customers.
