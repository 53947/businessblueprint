# BUSINESSBLUEPRINT SITEINSPECTOR → SCANSBLUE REBRAND
## Update All References and Integration

---

## 🤖 AGENT INSTRUCTIONS - READ FIRST

BusinessBlueprint currently integrates with "SiteInspector" for website analysis. The SiteInspector service has been rebranded to "ScansBlue" with a new domain (scansblue.com) and brand identity.

**Your task:** Update ALL references from SiteInspector to ScansBlue throughout the BusinessBlueprint codebase.

**CRITICAL:** This is NOT just a find-replace. You must:
1. Update environment variables (API URLs)
2. Update brand assets (icons, logos)
3. Update all user-facing text
4. Update email templates
5. Update prescription page display
6. Keep internal code/file/table names unchanged
7. Test complete integration still works

**Do NOT:**
- Rename database tables
- Rename component files
- Break existing functionality
- Change API integration logic (only URLs/branding)

---

## 🎨 NEW BRAND IDENTITY

### **Brand Name:**
**ScansBlue** (one word, camelCase)

### **Tagline:**
"Your Site Inspector Agent"

### **Description:**
"Website Analysis, Clarified. Understand structure, performance, and hidden issues instantly."

### **Domain:**
scansblue.com

### **Brand Assets Provided:**
Three new files to replace `Site_Inspection.png`:
1. `scansblue-logo-icon.png` - Full logo with text + icon
2. `scansblue-logo-url.png` - Logo with domain
3. `scansblue_icon.png` - Icon only (use this as replacement for Site_Inspection.png)

---

## 📋 STEP 1: UPDATE ENVIRONMENT VARIABLES

### **Current Variables:**
```env
SITEINSPECTOR_API_URL=https://siteinspector.dev/api/businessblueprint
SITEINSPECTOR_API_KEY=BBAPI_live_...
SITEINSPECTOR_TEST_KEY=BBAPI_test_...
```

### **New Variables:**
```env
SCANSBLUE_API_URL=https://scansblue.com/api/businessblueprint
SCANSBLUE_API_KEY=BBAPI_live_...
SCANSBLUE_TEST_KEY=BBAPI_test_...
```

**Action Required:**
1. Update in Replit Secrets (or .env file)
2. Update all code references to use new variable names
3. Keep old variables temporarily for backward compatibility

---

## 🖼️ STEP 2: REPLACE BRAND ASSETS

### **Current Files:**
- `/dist/public/assets/Site_Inspection.png` (or similar location in assets)
- `/dist/public/assets/Website-SEO.png` (keep this - not part of rebrand)
- DO NOT THROW OUT IMAGES.  ARCHIVE THEM IN THE ASSOCIATED FOLDER

### **New Files to Add:**

**Files are located in `/dist/public/assets/` directory:**
```
/dist/public/assets/scansblue/scansblue_icon.png (primary icon - use everywhere)
/dist/public/assets/scansblue/scansblue-logo-icon.png (full logo with icon)
/dist/public/assets/scansblue/scansblue-logo-url.png (logo with domain)
```

**IMPORTANT:** Assets are in `/dist/public/assets/scansblue` NOT `/public/`

**File Usage:**
- **Emails:** Use `scansblue_icon.png` for all email icons
- **Prescription Page:** Use `scansblue_icon.png` for section icons
- **Purchase Page:** Use `scansblue-logo-icon.png` for branding
- **Documentation:** Use `scansblue-logo-url.png` when showing domain

---

## 📝 STEP 3: UPDATE USER-FACING TEXT

### **Global Find & Replace (User-Facing Only):**

```
FIND: "SiteInspector"
REPLACE: "ScansBlue"

FIND: "Site Inspector"
REPLACE: "ScansBlue"

FIND: "siteinspector.dev"
REPLACE: "scansblue.com"
```

**Files to Update:**

### **1. Email Templates**

**Location:** `server/services/resend-email.ts` (or wherever emails are generated)

**Digital IQ Report Email:**

```html
<!-- OLD -->
<img src="{{SITE_URL}}/Site_Inspection.png" alt="SiteInspector" />
<h3>Want a Complete Website Audit?</h3>
<p>Get your complete SiteInspector Report for just $10</p>

<!-- NEW -->
<img src="{{SITE_URL}}/scansblue_icon.png" alt="ScansBlue" />
<h3>Want a Complete Website Audit?</h3>
<p>Get your complete ScansBlue Report for just $10</p>
```

**Full Report Delivery Email:**

```html
<!-- OLD -->
<img src="{{SITE_URL}}/Site_Inspection.png" alt="SiteInspector" />
<h1>Your SiteInspector Full Report is Ready</h1>
<p>Your comprehensive SiteInspector report is ready.</p>

<!-- NEW -->
<img src="{{SITE_URL}}/scansblue_icon.png" alt="ScansBlue" />
<h1>Your ScansBlue Full Report is Ready</h1>
<p>Your comprehensive ScansBlue report is ready.</p>
```

**Update ALL email templates that mention SiteInspector.**

---

### **2. Prescription/Dashboard Page**

**Location:** `client/src/pages/dashboard.tsx` or `Prescription.tsx`

**Component: SiteInspectorResults**

```tsx
// OLD
<div className="flex items-center gap-3 mb-4">
  <img src="/Site_Inspection.png" alt="SiteInspector" className="w-12 h-12" />
  <h2 className="text-2xl font-bold text-blue-600">Website Technical Analysis</h2>
</div>

// NEW
<div className="flex items-center gap-3 mb-4">
  <img src="/scansblue_icon.png" alt="ScansBlue" className="w-12 h-12" />
  <h2 className="text-2xl font-bold text-blue-600">Website Technical Analysis</h2>
</div>
```

**Update all text references:**

```tsx
// OLD
<p>Want the Complete Picture?</p>
<p>Get a comprehensive technical audit with...</p>
<button>Get Full Report - $10</button>

// NEW (keep the same - no "SiteInspector" text here, so no change needed)
// Just verify no "SiteInspector" text exists in this component
```

**Upsell Section:**

```tsx
// OLD
<p>This was a quick scan. Get a comprehensive SiteInspector audit...</p>

// NEW
<p>This was a quick scan. Get a comprehensive ScansBlue audit...</p>
```

---

### **3. Purchase Page**

**Location:** `/client/src/pages/siteinspector/purchase.tsx` (or similar)

**Update branding:**

```tsx
// OLD
<h1>Get Your SiteInspector Full Report</h1>
<p>Comprehensive website analysis for just $10</p>

// NEW
<h1>Get Your ScansBlue Full Report</h1>
<p>Comprehensive website analysis for just $10</p>
```

**Add logo:**

```tsx
<div className="text-center mb-6">
  <img 
    src="/scansblue-logo-icon.png" 
    alt="ScansBlue" 
    className="h-16 mx-auto mb-4" 
  />
  <h1 className="text-3xl font-bold">Get Your ScansBlue Full Report</h1>
  <p className="text-lg text-gray-600">Website Analysis, Clarified</p>
</div>
```

---

### **4. Success Page**

**Location:** `/client/src/pages/siteinspector/success.tsx` (or similar)

```tsx
// OLD
<h1>SiteInspector Report Purchased!</h1>
<p>Your SiteInspector Full Report is being generated...</p>

// NEW
<h1>ScansBlue Report Purchased!</h1>
<p>Your ScansBlue Full Report is being generated...</p>
```

---

## 🔧 STEP 4: UPDATE API INTEGRATION

### **1. Find API Call Sites**

**Locations to check:**
- `server/routes.ts` - Assessment processing
- Any files that call SiteInspector API

**Update environment variable references:**

```typescript
// OLD
const response = await fetch(
  `${process.env.SITEINSPECTOR_API_URL}/fast-check`,
  {
    headers: {
      'X-API-Key': process.env.SITEINSPECTOR_API_KEY,
    }
  }
);

// NEW
const response = await fetch(
  `${process.env.SCANSBLUE_API_URL}/fast-check`,
  {
    headers: {
      'X-API-Key': process.env.SCANSBLUE_API_KEY,
    }
  }
);
```

**All API calls to update:**
1. Fast Check call (during assessment)
2. Full Report trigger (after purchase)
3. Any other SiteInspector API calls

---

### **2. Update Webhook Endpoints**

**If webhook URL is hardcoded:**

```typescript
// OLD
webhookUrl: `${process.env.SITE_URL}/api/webhooks/siteinspector`

// NEW (keep the same - this is OUR webhook, not changing)
// Just verify it still works with ScansBlue
```

---

### **3. Update Payment Metadata**

**In payment creation:**

```typescript
// OLD
metadata: {
  type: 'siteinspector_full_report',
  // ...
}

// NEW (keep internal naming - this is not user-visible)
// OR update if you want consistency:
metadata: {
  type: 'scansblue_full_report',
  // ...
}
```

---

## 📊 STEP 5: UPDATE DATABASE REFERENCES (Optional)

### **Current Schema:**
```sql
site_inspector_results
site_inspector_purchases
```

### **Decision:**

**Option A: Keep Database Names**
- Pro: No migration needed, less risk
- Con: Internal naming doesn't match external branding
- **Recommendation:** Keep as-is (internal naming doesn't matter)

**Option B: Rename Tables**
```sql
ALTER TABLE site_inspector_results RENAME TO scans_blue_results;
ALTER TABLE site_inspector_purchases RENAME TO scans_blue_purchases;
```
- Pro: Consistent naming throughout
- Con: Requires migration, update all queries
- **Recommendation:** Only if you want 100% consistency

**For this rebrand: KEEP database table names unchanged.**

---

## 🧪 STEP 6: TESTING CHECKLIST

### **Visual Verification:**
- [ ] Prescription page shows ScansBlue icon
- [ ] Purchase page shows ScansBlue branding
- [ ] Success page shows ScansBlue text
- [ ] All emails show scansblue_icon.png

### **Text Verification:**
- [ ] No "SiteInspector" visible in emails
- [ ] No "SiteInspector" visible on prescription page
- [ ] No "SiteInspector" visible on purchase page
- [ ] No "siteinspector.dev" URLs visible anywhere

### **Functional Testing:**
- [ ] Submit test assessment
- [ ] Verify Fast Check still works
- [ ] Verify Fast Check results display on prescription
- [ ] Purchase Full Report ($10 test payment)
- [ ] Verify Full Report triggers
- [ ] Receive Full Report delivery email
- [ ] Verify Full Report displays on prescription

### **API Integration:**
- [ ] Fast Check API call uses scansblue.com URL
- [ ] Full Report API call uses scansblue.com URL
- [ ] Webhook receives callbacks successfully
- [ ] All API responses parse correctly

---

## 📋 FILES TO UPDATE CHECKLIST

**Brand Assets:**
- [ ] Add `/dist/public/assets/scansblue_icon.png`
- [ ] Add `/dist/public/assets/scansblue-logo-icon.png`
- [ ] Add `/dist/public/assets/scansblue-logo-url.png`
- [ ] Remove or deprecate `/dist/public/assets/Site_Inspection.png` (optional)

**IMPORTANT:** All assets are in `/dist/public/assets/` directory

**Environment Variables:**
- [ ] Update `SCANSBLUE_API_URL` in Replit Secrets
- [ ] Update `SCANSBLUE_API_KEY` in Replit Secrets
- [ ] Update `SCANSBLUE_TEST_KEY` in Replit Secrets (if applicable)

**Email Templates:**
- [ ] Digital IQ Report email (icon + all text)
- [ ] Full Report Delivery email (icon + all text)
- [ ] Any other emails mentioning SiteInspector

**UI Components:**
- [ ] Prescription/Dashboard page (SiteInspectorResults component)
- [ ] Purchase page
- [ ] Success page
- [ ] Any other pages showing SiteInspector branding

**API Integration:**
- [ ] Fast Check API call (URL + headers)
- [ ] Full Report API call (URL + headers)
- [ ] Webhook handler (verify still works)

**Documentation/Comments:**
- [ ] Update code comments (optional but recommended)
- [ ] Update README if mentions SiteInspector (optional)

---

## 🎯 COMPLETION CRITERIA

**Before marking complete, provide:**

### **1. Screenshot Evidence:**
- Digital IQ email with ScansBlue icon
- Prescription page showing ScansBlue results
- Purchase page with ScansBlue branding
- Full Report delivery email

### **2. Text Verification Report:**
```
Searched entire codebase for user-facing references:
- "SiteInspector": [list locations or "none found"]
- "Site Inspector": [list locations or "none found"]
- "siteinspector.dev": [list locations or "none found"]
```

### **3. Functional Test Results:**
```
✅ Submitted test assessment #[ID]
✅ Fast Check completed successfully
✅ Fast Check results display on prescription
✅ Purchased Full Report (test payment)
✅ Full Report triggered successfully
✅ Received delivery email
✅ Full Report displays on prescription
```

### **4. Files Modified:**
Complete list of all files changed with summary of changes.

---

## ⚠️ CRITICAL REMINDERS

1. **Environment Variables First:**
   - Update Replit Secrets BEFORE testing
   - Old API URL (siteinspector.dev) must still work during transition
   - New API URL (scansblue.com) will be the primary going forward

2. **Icon File Priority:**
   - Primary icon: `scansblue_icon.png` (use everywhere)
   - Full logo: `scansblue-logo-icon.png` (purchase page, prominent locations)
   - Logo with URL: `scansblue-logo-url.png` (documentation, marketing)

3. **User-Facing Only:**
   - Internal code names can stay "SiteInspector"
   - Database tables can stay "site_inspector_*"
   - Only user-visible text must change

4. **Test End-to-End:**
   - Don't just verify visual changes
   - Actually run full assessment → purchase → delivery flow
   - Confirm API integration works with new domain

---

## 🔄 MIGRATION NOTES

**If ScansBlue API is not ready yet:**
- Keep old `SITEINSPECTOR_API_URL` working
- Update UI/branding first
- Switch API URL when scansblue.com is live
- Test thoroughly before switching

**Rollback Plan:**
- Keep old icon file: `Site_Inspection.png`
- Keep old environment variables set
- Can revert text changes if needed
- No database changes = easy rollback

---

**BEGIN REBRAND. FOLLOW STEPS IN ORDER. REPORT PROGRESS AFTER EACH STEP.**

*End of BusinessBlueprint ScansBlue Rebrand Prompt*
