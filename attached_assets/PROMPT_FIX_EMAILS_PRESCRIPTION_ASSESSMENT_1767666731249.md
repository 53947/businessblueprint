# PROMPT: Fix Email Branding, Prescription Portal & Expand Assessment Form

**Priority:** CRITICAL  
**Complexity:** High  
**Estimated Time:** 8-10 hours  

---

## ⚠️ MANDATORY FIRST STEPS ⚠️

**STOP. Before doing ANYTHING, you MUST:**

1. **Read ALL required TriadBlue documentation:**
   - `/docs/AI_OPERATIONS_GUIDE.md` (governance and workflow)
   - `/docs/TEAM_PROTOCOL.md` (task management rules)
   - `/docs/replit.md` (standards and procedures)
   - `/docs/TRIAD_BLUE_STANDARDS.md` (branding requirements)
   - `/docs/_constants.md` (technical constants)
   - `/docs/SYSTEM_KNOWLEDGE_BASE.md` (complete system reference)
   - This implementation prompt completely

2. **Confirm to Dean that you have finished reading**
   - List which documents you reviewed
   - Note any unclear areas

3. **Create a detailed implementation plan:**
   - Step-by-step approach for each of the 3 tasks
   - Files to create/modify
   - Order of implementation
   - Testing strategy

4. **Present your plan to Dean for approval**

5. **WAIT for Dean's explicit approval** ("Approved" or "Proceed")

6. **Only then begin implementation**

**DO NOT write any code until Dean approves your plan.**

---

## 📋 OBJECTIVE

Fix three critical issues:
1. **Assessment Report Email Branding** - Currently has wrong colors, fonts, and icons
2. **Prescription Portal Routes** - Verify and fix prescription viewing
3. **Expand Assessment Form** - Add 27 new operational questions across 9 areas

---

## PART 1: FIX ASSESSMENT REPORT EMAIL BRANDING

### Current Issues

The `assessment_report` email (sent after AI analysis) has:
- ❌ Purple/orange gradient header (#FF6B35, #8B5CF6) - WRONG COLORS
- ❌ Wrong fonts (Segoe UI instead of Archivo)
- ❌ No blueprint grid pattern
- ❌ Links to `/dashboard/{id}` which is broken routing
- ❌ Generic styling, not on-brand

### Required Changes

**File to Modify:** `/server/services/email.ts`

**Function:** `generateReportHTML(data: EmailReportData)` (starts around line 602)

**New Branding Requirements:**

**Colors (CRITICAL - NEVER DEVIATE):**
- Content background: `#EEFBFF` (light blue)
- Content text: `#09080E` (triad black)
- Headers: `#09080E` (triad black) or `#0000FF` (master blue)
- Primary accent (buttons, highlights): `#F97316` (orange)
- Secondary accent: `#0000FF` (master blue)
- Email outline/borders: `#09080E` (black)

**Fonts:**
- Body text: Archivo (400, 600, 700 weights)
- Headers: Archivo Semi Expanded (600, 700 weights)
- Load from Google Fonts

**Icons:**
- ONLY use Dean's provided brand icons (stored in `/public`)
- NEVER create generic icons
- If an icon is needed, ASK DEAN for the specific icon file

**Layout:**
- Light background (`#EEFBFF`) for content area
- Dark text (`#09080E`) for readability
- Blueprint grid pattern (subtle, low opacity) in content sections
- Orange buttons for CTAs
- Clean, professional spacing

**Routing Fixes:**
- Change all `/dashboard/{id}` links to `/portal/prescription/{token}`
- OR use `/portal/prescriptions` for authenticated users
- Links must work correctly

### Implementation Template

```typescript
private generateReportHTML(data: EmailReportData): string {
  const highPriorityRecs = data.recommendations.filter(r => r.priority === 'high').slice(0, 3);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Digital IQ Assessment Results</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Archivo+Semi+Expanded:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { 
      font-family: 'Archivo', -apple-system, BlinkMacSystemFont, sans-serif; 
      line-height: 1.6; 
      color: #09080E;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #EEFBFF;
    }
    .email-outline {
      border: 2px solid #09080E;
      border-radius: 8px;
      overflow: hidden;
    }
    .header { 
      background: #09080E;
      color: #EEFBFF;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 4px solid #F97316;
    }
    .header h1 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 700;
      font-size: 32px;
      margin: 0 0 10px 0;
      color: #EEFBFF;
    }
    .header h2 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 600;
      font-size: 24px;
      margin: 0;
      color: #EEFBFF;
    }
    .score-circle { 
      display: inline-block;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #0000FF;
      border: 4px solid #F97316;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
    }
    .score-value { 
      font-size: 48px;
      font-weight: 700;
      color: #EEFBFF;
      font-family: 'Archivo Semi Expanded', sans-serif;
    }
    .score-label {
      font-size: 12px;
      color: #EEFBFF;
      margin-top: 5px;
    }
    .content { 
      background: #EEFBFF;
      padding: 40px 30px;
      background-image: 
        linear-gradient(0deg, transparent 24%, rgba(0, 0, 255, 0.03) 25%, rgba(0, 0, 255, 0.03) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.03) 75%, rgba(0, 0, 255, 0.03) 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, rgba(0, 0, 255, 0.03) 25%, rgba(0, 0, 255, 0.03) 26%, transparent 27%, transparent 74%, rgba(0, 0, 255, 0.03) 75%, rgba(0, 0, 255, 0.03) 76%, transparent 77%, transparent);
      background-size: 50px 50px;
    }
    .section { 
      margin: 30px 0;
    }
    .section h2 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 700;
      font-size: 24px;
      color: #0000FF;
      margin: 0 0 15px 0;
    }
    .section h3 {
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-weight: 600;
      font-size: 18px;
      color: #09080E;
      margin: 0 0 10px 0;
    }
    .section p {
      font-family: 'Archivo', sans-serif;
      font-weight: 400;
      font-size: 16px;
      color: #09080E;
      line-height: 1.6;
      margin: 0 0 15px 0;
    }
    .recommendation { 
      background: #ffffff;
      border: 2px solid #0000FF;
      border-left: 6px solid #F97316;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .recommendation h3 {
      color: #0000FF;
      margin: 0 0 10px 0;
    }
    .recommendation p {
      margin: 8px 0;
    }
    .recommendation strong {
      color: #0000FF;
      font-weight: 700;
    }
    .cta-button { 
      display: inline-block;
      background: #F97316;
      color: #EEFBFF;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-family: 'Archivo Semi Expanded', sans-serif;
      font-size: 16px;
      margin: 10px 5px;
      border: 2px solid #F97316;
      transition: all 0.3s ease;
    }
    .cta-button:hover {
      background: transparent;
      color: #F97316;
    }
    .secondary-button { 
      background: transparent;
      color: #0000FF;
      border: 2px solid #0000FF;
    }
    .secondary-button:hover {
      background: #0000FF;
      color: #EEFBFF;
    }
    .footer { 
      background: #09080E;
      color: #EEFBFF;
      padding: 30px;
      text-align: center;
      border-top: 4px solid #F97316;
    }
    .footer p {
      font-family: 'Archivo', sans-serif;
      font-size: 14px;
      color: #EEFBFF;
      margin: 10px 0;
    }
    .footer a {
      color: #F97316;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-outline">
      <!-- Header -->
      <div class="header">
        <h1>Digital IQ Assessment Results</h1>
        <h2>${data.businessName}</h2>
        <div class="score-circle">
          <div style="text-align: center;">
            <div class="score-value">${data.digitalScore}</div>
            <div class="score-label">out of 140</div>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <!-- Executive Summary -->
        <div class="section">
          <h2>Executive Summary</h2>
          <p>${data.summary}</p>
        </div>
        
        <!-- Priority Recommendations -->
        <div class="section">
          <h2>Your Top Priority Recommendations</h2>
          <p>Based on your Digital IQ assessment, here are the most impactful improvements you can make:</p>
          ${highPriorityRecs.map(rec => `
            <div class="recommendation">
              <h3>${rec.title}</h3>
              <p>${rec.description}</p>
              <p><strong>Estimated Impact:</strong> ${rec.estimatedImpact}</p>
              <p><strong>Estimated Effort:</strong> ${rec.estimatedEffort}</p>
            </div>
          `).join('')}
        </div>
        
        <!-- Call to Action -->
        <div class="section" style="text-align: center; margin-top: 40px;">
          <h2>View Your Complete Prescription</h2>
          <p>Your full growth prescription with detailed action steps is ready in your client portal.</p>
          
          <a href="${process.env.FRONTEND_URL || 'https://businessblueprint.io'}/portal/prescriptions" class="cta-button">
            View Full Prescription
          </a>
          
          <p style="margin-top: 30px; font-size: 14px; color: #09080E;">
            Questions? Reply to this email or contact us at 
            <a href="mailto:support@businessblueprint.io" style="color: #F97316; text-decoration: none;">support@businessblueprint.io</a>
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p><strong>BusinessBlueprint.io</strong> - Your Partner in Digital Growth</p>
        <p>This assessment was powered by AI analysis and Google Business Intelligence.</p>
        <p><small>© 2026 BusinessBlueprint.io. All rights reserved.</small></p>
      </div>
    </div>
  </div>
</body>
</html>`;
}
```

### Testing Requirements

After updating the email template:

1. **Send test email** using admin panel
2. **Verify branding:**
   - Content background is light blue #EEFBFF
   - Text is triad black #09080E
   - Headers are master blue #0000FF or triad black
   - Orange accent used for CTAs
   - Archivo fonts load correctly
   - Blueprint grid pattern visible but subtle
3. **Test links:**
   - "View Full Prescription" button works
   - Routes to correct page (prescription portal)
4. **Test on mobile:**
   - Email displays correctly on phone
   - Buttons are clickable
   - Text is readable

---

## PART 2: VERIFY & FIX PRESCRIPTION PORTAL ROUTES

### Current State Unknown

Need to verify if these routes exist and work:

1. `/portal/prescription/:token` - Public access via temporary token
2. `/portal/prescriptions` - Authenticated list view
3. `/portal/prescriptions/:id` - Single prescription view (authenticated)

### Implementation Steps

**Step 1: Verify Routes Exist**

Check `/client/src/App.tsx` for these routes:

```typescript
// Should have routes like:
<Route path="/portal/prescription/:token" component={PrescriptionPublicView} />
<Route path="/portal/prescriptions" component={PrescriptionsList} />
<Route path="/portal/prescriptions/:id" component={PrescriptionDetail} />
```

**If routes are missing, add them.**

**Step 2: Verify Prescription Storage**

Check that prescriptions are being saved to `prescriptions` table after assessment analysis.

In `/server/routes.ts` around line 3555, after recommendations are saved:

```typescript
// After saving recommendations, ALSO save prescription
const [prescription] = await db.insert(prescriptions).values({
  assessmentId,
  clientId: assessment.clientId || null,
  title: `Digital Growth Prescription for ${assessment.businessName}`,
  summary: enhancedAnalysis.summary,
  status: 'delivered',
  deliveredAt: new Date(),
}).returning();

// Generate access token for public view (15 min expiry)
const accessToken = nanoid(32);
const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

// Store token in session or database for validation
// (Implementation depends on current system)
```

**Step 3: Create/Verify Prescription Portal Pages**

**File: `/client/src/pages/portal/prescriptions.tsx`** (LIST VIEW)

```typescript
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight } from 'lucide-react';

export default function PrescriptionsList() {
  const { data: prescriptions, isLoading } = useQuery({
    queryKey: ['/api/prescriptions'],
  });

  if (isLoading) {
    return <div className="p-8">Loading your prescriptions...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#0000FF] mb-2" style={{ fontFamily: 'Archivo Semi Expanded' }}>
        Your Prescriptions
      </h1>
      <p className="text-[#09080E] mb-8">View and track your digital growth prescriptions</p>

      <div className="space-y-4">
        {prescriptions?.map((prescription: any) => (
          <Link key={prescription.id} href={`/portal/prescriptions/${prescription.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-[#0000FF]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-[#0000FF]">
                      {prescription.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Delivered {new Date(prescription.deliveredAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={prescription.status === 'delivered' ? 'default' : 'secondary'}
                    className="bg-[#F97316] text-white"
                  >
                    {prescription.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#09080E] mb-4">{prescription.summary}</p>
                <div className="flex items-center text-[#F97316] font-semibold">
                  <span>View Prescription</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**File: `/client/src/pages/portal/prescription-detail.tsx`** (SINGLE VIEW)

```typescript
import { useQuery } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PrescriptionDetail() {
  const [, params] = useRoute('/portal/prescriptions/:id');
  const prescriptionId = params?.id;

  const { data: prescription, isLoading } = useQuery({
    queryKey: [`/api/prescriptions/${prescriptionId}`],
  });

  const { data: recommendations } = useQuery({
    queryKey: [`/api/prescriptions/${prescriptionId}/recommendations`],
  });

  if (isLoading) {
    return <div className="p-8">Loading prescription...</div>;
  }

  const highPriority = recommendations?.filter((r: any) => r.priority === 'high') || [];
  const mediumPriority = recommendations?.filter((r: any) => r.priority === 'medium') || [];
  const lowPriority = recommendations?.filter((r: any) => r.priority === 'low') || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EEFBFF' }}>
      {/* Header */}
      <div className="bg-[#09080E] text-[#EEFBFF] py-12 border-b-4 border-[#F97316]">
        <div className="max-w-4xl mx-auto px-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-[#EEFBFF] hover:text-[#F97316] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Prescriptions
          </Button>
          
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Archivo Semi Expanded' }}>
            {prescription.title}
          </h1>
          <p className="text-lg">{prescription.summary}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* High Priority */}
        {highPriority.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded' }}>
              High Priority Recommendations
            </h2>
            <div className="space-y-4">
              {highPriority.map((rec: any) => (
                <Card key={rec.id} className="border-l-6 border-[#F97316] bg-white">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-[#0000FF] mb-2">{rec.title}</h3>
                    <p className="text-[#09080E] mb-4">{rec.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-[#09080E]">
                        <strong>Impact:</strong> {rec.estimatedImpact}
                      </span>
                      <span className="text-[#09080E]">
                        <strong>Effort:</strong> {rec.estimatedEffort}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority */}
        {mediumPriority.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded' }}>
              Medium Priority Recommendations
            </h2>
            <div className="space-y-4">
              {mediumPriority.map((rec: any) => (
                <Card key={rec.id} className="border-l-6 border-[#0000FF] bg-white">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-[#0000FF] mb-2">{rec.title}</h3>
                    <p className="text-[#09080E] mb-4">{rec.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-[#09080E]">
                        <strong>Impact:</strong> {rec.estimatedImpact}
                      </span>
                      <span className="text-[#09080E]">
                        <strong>Effort:</strong> {rec.estimatedEffort}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Low Priority */}
        {lowPriority.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0000FF] mb-6" style={{ fontFamily: 'Archivo Semi Expanded' }}>
              Additional Opportunities
            </h2>
            <div className="space-y-4">
              {lowPriority.map((rec: any) => (
                <Card key={rec.id} className="border-l-4 border-gray-300 bg-white">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold text-[#09080E] mb-2">{rec.title}</h3>
                    <p className="text-[#09080E] mb-4">{rec.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-[#09080E]">
                        <strong>Impact:</strong> {rec.estimatedImpact}
                      </span>
                      <span className="text-[#09080E]">
                        <strong>Effort:</strong> {rec.estimatedEffort}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 4: Add API Routes**

In `/server/routes.ts`:

```typescript
// GET all prescriptions for authenticated client
app.get('/api/prescriptions', isAuthenticated, async (req, res) => {
  try {
    const clientId = parseInt(req.user?.claims?.sub);
    const clientPrescriptions = await db
      .select()
      .from(prescriptions)
      .where(eq(prescriptions.clientId, clientId))
      .orderBy(desc(prescriptions.deliveredAt));
    
    res.json(clientPrescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
});

// GET single prescription by ID (authenticated)
app.get('/api/prescriptions/:id', isAuthenticated, async (req, res) => {
  try {
    const prescriptionId = parseInt(req.params.id);
    const clientId = parseInt(req.user?.claims?.sub);
    
    const prescription = await db.query.prescriptions.findFirst({
      where: and(
        eq(prescriptions.id, prescriptionId),
        eq(prescriptions.clientId, clientId)
      ),
    });
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    
    res.json(prescription);
  } catch (error) {
    console.error('Error fetching prescription:', error);
    res.status(500).json({ error: 'Failed to fetch prescription' });
  }
});

// GET recommendations for a prescription
app.get('/api/prescriptions/:id/recommendations', isAuthenticated, async (req, res) => {
  try {
    const prescriptionId = parseInt(req.params.id);
    
    // Get assessment ID from prescription
    const prescription = await db.query.prescriptions.findFirst({
      where: eq(prescriptions.id, prescriptionId),
    });
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    
    // Get recommendations from assessment
    const recs = await db
      .select()
      .from(recommendations)
      .where(eq(recommendations.assessmentId, prescription.assessmentId))
      .orderBy(
        sql`CASE 
          WHEN ${recommendations.priority} = 'high' THEN 1
          WHEN ${recommendations.priority} = 'medium' THEN 2
          WHEN ${recommendations.priority} = 'low' THEN 3
        END`
      );
    
    res.json(recs);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});
```

---

## PART 3: EXPAND ASSESSMENT FORM (27 NEW QUESTIONS)

### Current State

Assessment form currently collects:
- Business name
- Industry
- Address
- Website
- Phone
- Email

**Missing:** 27 operational questions across 9 areas

### New Questions to Add

**(See BUSINESSBLUEPRINT_SYSTEM_KNOWLEDGE_BASE.md for complete list)**

**Email & SMS Marketing (Q1-Q5)**
**Social Media Content (Q6-Q8)**
**Reputation Management (Q9-Q11)**
**Customer Response & Timing (Q12-Q14)**
**Live Chat (Q15-Q17)**
**Business Listings (Q18-Q19)**
**Google Business Profile (Q20-Q21)**
**Website & SEO (Q22-Q23)**
**CRM (Q24-Q27)**

### Database Schema Updates

**Add to `/shared/schema.ts`:**

```typescript
export const assessments = pgTable("assessments", {
  // ... existing fields ...
  
  // Email & SMS Marketing
  collectsEmails: text("collects_emails"), // Options: "yes_active", "yes_not_organized", "no", "dont_know"
  lastEmailCampaign: text("last_email_campaign"), // Options: "past_week", "past_month", "past_3_months", "past_6_months", "6_months_plus", "never"
  emailListSize: text("email_list_size"), // Options: "0_50", "51_200", "201_500", "501_1000", "1000_plus", "no_list"
  sendsSMS: text("sends_sms"), // Options: "yes_regularly", "yes_occasionally", "no_interested", "no_not_interested"
  lastSMSCampaign: text("last_sms_campaign"), // Options: "past_week", "past_month", "past_3_months", "3_months_plus", "never"
  
  // Social Media Content
  lastSocialPost: text("last_social_post"), // Options: "past_week", "past_month", "past_3_months", "3_months_plus", "never"
  socialPostFrequency: text("social_post_frequency"), // Options: "daily", "3_5_week", "1_2_week", "few_month", "rarely", "never"
  socialContentCreator: text("social_content_creator"), // Options: "owner", "staff", "agency", "no_one", "inconsistent"
  
  // Reputation Management
  lastReviewResponse: text("last_review_response"), // Options: "past_week", "past_month", "past_3_months", "3_months_plus", "never"
  reviewResponseRate: text("review_response_rate"), // Options: "90_100", "50_89", "10_49", "under_10", "0"
  lastNewReview: text("last_new_review"), // Options: "past_week", "past_month", "past_3_months", "3_months_plus", "never"
  
  // Customer Response & Timing
  inquiryResponseTime: text("inquiry_response_time"), // Options: "15_min", "1_hour", "4_hours", "24_hours", "24_hours_plus", "inconsistent"
  hasUnifiedInbox: text("has_unified_inbox"), // Options: "yes_unified", "partial", "no_scattered", "dont_know"
  missedInquiries: text("missed_inquiries"), // Options: "never", "past_week", "past_month", "regularly", "dont_track"
  
  // Live Chat
  hasLiveChat: text("has_live_chat"), // Options: "yes_monitored", "yes_not_monitored", "yes_unsure", "no", "no_website"
  lastChatConversation: text("last_chat_conversation"), // Options: "past_week", "past_month", "past_3_months", "3_months_plus", "never_none"
  chatResponseTime: text("chat_response_time"), // Options: "1_min", "5_min", "15_min", "15_plus", "no_chat"
  
  // Business Listings
  lastListingUpdate: text("last_listing_update"), // Options: "past_month", "past_3_months", "past_6_months", "past_year", "year_plus", "never"
  listingConsistency: text("listing_consistency"), // Options: "yes_consistent", "pretty_sure", "not_sure", "know_inconsistent", "never_checked"
  
  // Google Business Profile
  lastGBPPost: text("last_gbp_post"), // Options: "past_week", "past_month", "past_3_months", "3_months_plus", "never"
  lastGBPPhoto: text("last_gbp_photo"), // Options: "past_month", "past_3_months", "past_6_months", "6_months_plus", "never"
  
  // Website & SEO
  lastWebsiteUpdate: text("last_website_update"), // Options: "past_week", "past_month", "past_3_months", "past_6_months", "6_months_plus", "never"
  hasBlog: text("has_blog"), // Options: "yes_weekly", "yes_monthly", "yes_inconsistent", "no_planning", "no_not_interested"
  
  // CRM
  usesCRM: text("uses_crm"), // Options: "yes_daily", "yes_underutilized", "yes_not_setup", "no_planning", "manual_tracking", "no_dont_track"
  crmPlatform: text("crm_platform"), // Options: "salesforce", "hubspot", "zoho", "monday", "pipedrive", "sheets_excel", "other", "none"
  lastCRMFollowup: text("last_crm_followup"), // Options: "past_week", "past_month", "past_3_months", "3_months_plus", "never_no_crm"
  hasAutomation: text("has_automation"), // Options: "yes_full", "yes_partial", "no_manual", "dont_know"
});
```

**Run migration:**
```bash
npm run db:push
```

### Update Assessment Form Component

**File: `/client/src/components/assessment-form.tsx`**

Add new form sections with proper branding:
- Use Archivo fonts
- Master blue (#0000FF) for headers
- Orange (#F97316) for accents
- Light blue (#EEFBFF) backgrounds for sections
- Triad black (#09080E) for text

**Implementation structure:**

```typescript
{/* Email & SMS Marketing Section */}
<div className="bg-[#EEFBFF] p-6 rounded-lg border-2 border-[#0000FF] mb-6">
  <h3 className="text-2xl font-bold text-[#0000FF] mb-4" style={{ fontFamily: 'Archivo Semi Expanded' }}>
    Email & SMS Marketing
  </h3>
  
  {/* Q1: Collect emails */}
  <div className="mb-4">
    <label className="block text-[#09080E] font-semibold mb-2">
      Do you collect customer email addresses?
    </label>
    <Select name="collectsEmails">
      <SelectTrigger>
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="yes_active">Yes, actively building a list</SelectItem>
        <SelectItem value="yes_not_organized">Yes, but not organized</SelectItem>
        <SelectItem value="no">No, not currently</SelectItem>
        <SelectItem value="dont_know">I don't know</SelectItem>
      </SelectContent>
    </Select>
  </div>
  
  {/* Q2-Q5 follow same pattern */}
</div>

{/* Repeat for all 9 sections */}
```

### Update Digital IQ Calculation

**File: `/server/services/presenceScanner.ts`**

Update `calculateDigitalIQ()` function to include new scoring:

```typescript
private calculateDigitalIQ(data: {
  website: WebsiteScan;
  socialMedia: SocialMediaScan;
  directories: DirectoryScan;
  reviews: ReviewScan;
}, assessmentAnswers: any): number {
  // Existing scores (website, directories, reviews, social) = 70 points
  const existingPoints = /* ... existing calculation ... */;
  
  // NEW: Operational execution scores = 70 points
  const emailSMSScore = this.calculateEmailSMSScore(assessmentAnswers); // 0-15
  const socialContentScore = this.calculateSocialContentScore(assessmentAnswers); // 0-13
  const reputationScore = this.calculateReputationScore(assessmentAnswers); // 0-16
  const responseScore = this.calculateResponseScore(assessmentAnswers); // 0-15
  const liveChatScore = this.calculateLiveChatScore(assessmentAnswers); // 0-15 (but only if they have chat)
  const crmScore = this.calculateCRMScore(assessmentAnswers); // 0-12
  
  // Total: 140 points possible
  return Math.min(140, existingPoints + emailSMSScore + socialContentScore + reputationScore + responseScore + liveChatScore + crmScore);
}
```

---

## TESTING INSTRUCTIONS

### Test 1: Email Branding

1. Submit a test assessment
2. Check inbox for assessment report email
3. Verify:
   - [ ] Light blue background (#EEFBFF) in content
   - [ ] Triad black text (#09080E)
   - [ ] Master blue or triad black headers
   - [ ] Orange CTAs (#F97316)
   - [ ] Archivo fonts load
   - [ ] Blueprint grid pattern visible
   - [ ] Email outline is black
   - [ ] Links work correctly
4. Test on mobile device

### Test 2: Prescription Portal

1. Log in to client portal
2. Navigate to `/portal/prescriptions`
3. Verify:
   - [ ] List of prescriptions displays
   - [ ] Can click into prescription detail
   - [ ] Recommendations grouped by priority
   - [ ] Branding matches (blues, orange, fonts)
   - [ ] All data displays correctly

### Test 3: Expanded Assessment Form

1. Go to `/assessment`
2. Fill out form including new questions
3. Submit
4. Verify:
   - [ ] All 27 new questions present
   - [ ] Form sections branded correctly
   - [ ] Data saves to database
   - [ ] Digital IQ calculation includes new scores

---

## ACCEPTANCE CRITERIA

**Part 1 - Email Branding:**
- [ ] Assessment report email uses correct colors (light blue bg, triad black text)
- [ ] Archivo fonts throughout
- [ ] Orange CTAs, blue headers
- [ ] Blueprint grid pattern present
- [ ] Links route to prescription portal
- [ ] Mobile responsive

**Part 2 - Prescription Portal:**
- [ ] `/portal/prescriptions` route works
- [ ] `/portal/prescriptions/:id` route works
- [ ] Prescriptions list displays correctly
- [ ] Single prescription view shows all recommendations
- [ ] API endpoints function
- [ ] Branding matches standards

**Part 3 - Expanded Assessment:**
- [ ] 27 new questions added to form
- [ ] Database schema updated
- [ ] All questions save correctly
- [ ] Digital IQ calculation updated
- [ ] Scoring reflects all 9 areas
- [ ] Form branded correctly

---

## CRITICAL NOTES

**Icons:**
- NEVER create new icons
- ONLY use Dean's provided icons from `/public`
- If icon needed, ASK DEAN for the file

**Colors:**
- NEVER deviate from specified hex codes
- Light backgrounds (#EEFBFF) ALWAYS for content
- Dark text (#09080E) ALWAYS for readability
- Master blue (#0000FF) and orange (#F97316) for accents

**Fonts:**
- ALWAYS use Archivo and Archivo Semi Expanded
- Load from Google Fonts
- Bold by default

**Prescription Content:**
- Must be concise (users can scan quickly)
- Must be timely (delivered within minutes)
- Must be accurate (based on actual data)

---

**READY TO IMPLEMENT**

**Estimated completion time:** 8-10 hours  
**Priority:** CRITICAL (users are receiving broken/unbranded emails now)  
**Next steps:** Present plan to Dean, get approval, execute

---

---

## ADDENDUM: BRAND ICONS & PRESCRIPTION PAGE COLORS

### Dean's Brand Icons (DO NOT CREATE NEW ICONS)

**Location:** `/public/` directory

**Available Icons:**
1. **icon-commverse.png** - Slash/conversation icon (green/orange border)
2. **icon-content.png** - Calendar with social icons (pink border) - USE FOR: Social Media Content
3. **icon-inbox.png** - Inbox with messages (blue gradient background) - USE FOR: Customer Response & Unified Inbox
4. **icon-listings.png** - House with search (red border) - USE FOR: Business Listings
5. **icon-livechat.png** - Headset with chat bubble (purple border) - USE FOR: Live Chat
6. **icon-localblue.png** - Blue figure in circle (blue gradient) - USE FOR: Local Blue/Google Business Profile
7. **icon-reputation.png** - Shield with star and thumbs up (gold border) - USE FOR: Reputation Management
8. **icon-send.png** - Email with up arrow (yellow/black border) - USE FOR: Email & SMS Marketing

**CRITICAL RULES:**
- NEVER create new icons
- ONLY use these provided icons
- If you need an icon not in this list, STOP and ASK DEAN
- Reference icons as: `<img src="/icon-reputation.png" alt="Reputation Management" />`

### Prescription Page Color Guidance

**Current prescription detail pages already have correct layout structure.**

**DO NOT change the overall page structure or section backgrounds.**

**ONLY UPDATE:**
1. **Font families** → Change all fonts to Archivo and Archivo Semi Expanded
2. **Text colors** → Ensure all text is readable (triad black #09080E or master blue #0000FF)
3. **Button styles** → Orange (#F97316) primary buttons, blue (#0000FF) secondary
4. **Card borders** → Use master blue (#0000FF) for borders
5. **Accent colors** → Orange and blue only

**DO NOT change:**
- Page background colors (keep existing light blue #EEFBFF)
- Section layout structure
- Card/component backgrounds (keep white)
- Overall design composition

**Example of what TO change:**

```typescript
// BEFORE (generic fonts)
<h2 className="text-2xl font-bold">Title</h2>

// AFTER (branded fonts)
<h2 className="text-2xl font-bold text-[#0000FF]" style={{ fontFamily: 'Archivo Semi Expanded' }}>
  Title
</h2>
```

**Example of what NOT to change:**

```typescript
// KEEP THIS - don't change page backgrounds
<div className="min-h-screen" style={{ backgroundColor: '#EEFBFF' }}>
  {/* existing structure */}
</div>
```

---

**END OF PROMPT**
