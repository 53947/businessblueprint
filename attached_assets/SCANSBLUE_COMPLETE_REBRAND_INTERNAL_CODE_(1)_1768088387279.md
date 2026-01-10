# SCANSBLUE COMPLETE REBRAND - INTERNAL CODE UPDATE
## Phase 2: Rename All Internal Code

---

## 🚨 CORRECTION TO PREVIOUS INSTRUCTIONS

The previous rebrand prompt incorrectly stated to "keep internal code unchanged." 

**IGNORE THAT INSTRUCTION.**

This is a **COMPLETE REBRAND** which means:
- ✅ Rename database tables
- ✅ Rename all files
- ✅ Rename all components
- ✅ Rename all functions
- ✅ Rename all variables
- ✅ Rename API routes
- ✅ Everything from "SiteInspector" to "ScansBlue"

---

## 📋 PHASE 2: INTERNAL CODE REBRAND

### **STEP 1: DATABASE TABLES**

**Rename tables:**
```sql
ALTER TABLE site_inspector_results RENAME TO scans_blue_results;
ALTER TABLE site_inspector_purchases RENAME TO scans_blue_purchases;
```

**Update all queries/references:**
- Find: `site_inspector_results`
- Replace: `scans_blue_results`

- Find: `site_inspector_purchases`  
- Replace: `scans_blue_purchases`

---

### **STEP 2: FILE NAMES**

**Rename files:**
```
siteinspector.ts → scansblue.ts
siteinspector-results.tsx → scansblue-results.tsx
siteinspector-webhook.ts → scansblue-webhook.ts
SiteInspectorResults.tsx → ScansBlueResults.tsx
```

**Find ALL files with "siteinspector" or "SiteInspector" in filename and rename them.**

---

### **STEP 3: COMPONENT NAMES**

**Rename components:**
```tsx
// OLD
export function SiteInspectorResults() { }
export class SiteInspectorService { }

// NEW
export function ScansBlueResults() { }
export class ScansBlueService { }
```

**Update all imports:**
```tsx
// OLD
import { SiteInspectorResults } from './components/SiteInspectorResults';

// NEW
import { ScansBlueResults } from './components/ScansBlueResults';
```

---

### **STEP 4: FUNCTION NAMES**

**Rename all functions:**
```typescript
// OLD
async function triggerSiteInspectorFullReport() { }
async function processSiteInspectorWebhook() { }
async function getSiteInspectorResults() { }

// NEW
async function triggerScansBlueFullReport() { }
async function processScansBlueWebhook() { }
async function getScansBlueResults() { }
```

---

### **STEP 5: VARIABLE NAMES**

**Rename all variables:**
```typescript
// OLD
const siteInspectorData = ...;
const siteInspectorService = ...;
let hasSiteInspectorReport = ...;

// NEW
const scansBlueData = ...;
const scansBlueService = ...;
let hasScansBlueReport = ...;
```

---

### **STEP 6: API ROUTES**

**Rename API endpoints:**
```
/api/siteinspector/checkout → /api/scansblue/checkout
/api/siteinspector/success → /api/scansblue/success
/api/webhooks/siteinspector → /api/webhooks/scansblue
```

**Update all route handlers and fetch calls.**

---

### **STEP 7: TYPE DEFINITIONS**

**Rename types/interfaces:**
```typescript
// OLD
interface SiteInspectorResults { }
type SiteInspectorPurchase = { };

// NEW
interface ScansBlueResults { }
type ScansBluePurchase = { };
```

---

### **STEP 8: CONSTANTS & ENUMS**

**Rename constants:**
```typescript
// OLD
const SITEINSPECTOR_API_URL = ...;
const SITEINSPECTOR_REPORT_STATUS = ...;

// NEW
const SCANSBLUE_API_URL = ...;
const SCANSBLUE_REPORT_STATUS = ...;
```

---

### **STEP 9: COMMENTS & DOCUMENTATION**

**Update all code comments:**
```typescript
// OLD
// Trigger SiteInspector full report after payment
// SiteInspector webhook handler

// NEW
// Trigger ScansBlue full report after payment
// ScansBlue webhook handler
```

---

### **STEP 10: DRIZZLE SCHEMA FILES**

**Update schema definitions:**

**Location:** `db/schema.ts` or `server/db/schema.ts`

```typescript
// OLD
export const siteInspectorResults = pgTable('site_inspector_results', {
  id: serial('id').primaryKey(),
  // ...
});

export const siteInspectorPurchases = pgTable('site_inspector_purchases', {
  id: serial('id').primaryKey(),
  // ...
});

// NEW
export const scansBlueResults = pgTable('scans_blue_results', {
  id: serial('id').primaryKey(),
  // ...
});

export const scansBluePurchases = pgTable('scans_blue_purchases', {
  id: serial('id').primaryKey(),
  // ...
});
```

**Update all relations:**
```typescript
// Update any foreign key relations referencing these tables
```

**Generate new migration:**
```bash
npx drizzle-kit generate:pg
```

---

### **STEP 11: FRONTEND ROUTES/URLS**

**Update all route paths:**

```typescript
// OLD routes
/siteinspector/purchase
/siteinspector/success
/prescription/:id#siteinspector

// NEW routes
/scansblue/purchase
/scansblue/success
/prescription/:id#scansblue
```

**Files to update:**
- Route definitions (e.g., `app/routes.tsx`, `client/src/routes.tsx`)
- Navigation links (`<Link to="/siteinspector/purchase">`)
- Redirect URLs
- Hash anchors (`#siteinspector` → `#scansblue`)

---

### **STEP 12: ENVIRONMENT VARIABLE REFERENCES**

**Update code that reads env vars:**

```typescript
// OLD
process.env.SITEINSPECTOR_API_URL
process.env.SITEINSPECTOR_API_KEY
process.env.SITEINSPECTOR_TEST_KEY

// NEW
process.env.SCANSBLUE_API_URL
process.env.SCANSBLUE_API_KEY
process.env.SCANSBLUE_TEST_KEY
```

**Note:** The actual Replit Secrets were already updated. This is updating the CODE that reads them.

---

### **STEP 13: DATABASE INDEXES**

**Rename any indexes:**

```sql
-- Find indexes
SELECT indexname FROM pg_indexes WHERE tablename LIKE '%site_inspector%';

-- Rename them
ALTER INDEX site_inspector_results_assessment_id_idx 
RENAME TO scans_blue_results_assessment_id_idx;

ALTER INDEX site_inspector_purchases_assessment_id_idx 
RENAME TO scans_blue_purchases_assessment_id_idx;
```

---

### **STEP 14: FOREIGN KEY CONSTRAINTS**

**Update constraint names:**

```sql
-- Rename foreign key constraints
ALTER TABLE scans_blue_results 
RENAME CONSTRAINT site_inspector_results_assessment_id_fkey 
TO scans_blue_results_assessment_id_fkey;

ALTER TABLE scans_blue_purchases 
RENAME CONSTRAINT site_inspector_purchases_assessment_id_fkey 
TO scans_blue_purchases_assessment_id_fkey;
```

---

### **STEP 15: CSS CLASS NAMES**

**Update CSS/Tailwind classes:**

```css
/* OLD */
.siteinspector-results { }
.siteinspector-card { }
.siteinspector-header { }

/* NEW */
.scansblue-results { }
.scansblue-card { }
.scansblue-header { }
```

**In JSX/TSX:**
```tsx
// OLD
<div className="siteinspector-results">

// NEW
<div className="scansblue-results">
```

---

### **STEP 16: TEST FILES**

**Rename test files:**
```
siteinspector.test.ts → scansblue.test.ts
siteinspector-service.test.ts → scansblue-service.test.ts
SiteInspectorResults.test.tsx → ScansBlueResults.test.tsx
```

**Update test descriptions:**
```typescript
// OLD
describe('SiteInspector service', () => {
  it('should trigger full report', () => {

// NEW
describe('ScansBlue service', () => {
  it('should trigger full report', () => {
```

---

### **STEP 17: MOCK DATA & FIXTURES**

**Update test fixtures:**

```typescript
// OLD
const mockSiteInspectorData = {
  type: 'site_inspector_full_report',
  // ...
};

// NEW
const mockScansBlueData = {
  type: 'scans_blue_full_report',
  // ...
};
```

---

### **STEP 18: LOG MESSAGES**

**Update all console.log/logger statements:**

```typescript
// OLD
console.log('[SiteInspector] Fast Check completed');
logger.info('SiteInspector webhook received');

// NEW
console.log('[ScansBlue] Fast Check completed');
logger.info('ScansBlue webhook received');
```

---

### **STEP 19: ERROR MESSAGES**

**Update error messages (user-facing and internal):**

```typescript
// OLD
throw new Error('SiteInspector API failed');
return { error: 'Could not fetch SiteInspector results' };

// NEW
throw new Error('ScansBlue API failed');
return { error: 'Could not fetch ScansBlue results' };
```

---

### **STEP 20: ZOD SCHEMAS / VALIDATION**

**Update validation schemas:**

```typescript
// OLD
const siteInspectorResultsSchema = z.object({
  type: z.literal('site_inspector_full_report'),
  // ...
});

// NEW
const scansBlueResultsSchema = z.object({
  type: z.literal('scans_blue_full_report'),
  // ...
});
```

---

### **STEP 21: COMPONENT PROPS**

**Update prop type names:**

```typescript
// OLD
interface SiteInspectorResultsProps {
  siteInspectorData: SiteInspectorResults;
}

// NEW
interface ScansBlueResultsProps {
  scansBlueData: ScansBlueResults;
}
```

---

### **STEP 22: SERVICE/PROVIDER INSTANCES**

**Update singleton instances:**

```typescript
// OLD
export const siteInspectorService = new SiteInspectorService();

// NEW
export const scansBlueService = new ScansBlueService();
```

**Update all imports:**
```typescript
// OLD
import { siteInspectorService } from './services/siteinspector';

// NEW
import { scansBlueService } from './services/scansblue';
```

---

### **STEP 23: PACKAGE.JSON SCRIPTS**

**Update npm scripts (if any reference siteinspector):**

```json
{
  "scripts": {
    "test:siteinspector": "..." → "test:scansblue": "...",
    "migrate:siteinspector": "..." → "migrate:scansblue": "..."
  }
}
```

---

### **STEP 24: README / DOCUMENTATION**

**Update project documentation:**

- README.md (any SiteInspector mentions)
- CONTRIBUTING.md
- API documentation
- Developer guides
- Architecture diagrams

---

### **STEP 25: METADATA & SEO**

**Update any hardcoded metadata:**

```typescript
// OLD
const metadata = {
  title: 'SiteInspector Integration',
  description: 'Powered by SiteInspector'
};

// NEW
const metadata = {
  title: 'ScansBlue Integration',
  description: 'Powered by ScansBlue'
};
```

---

## 🔍 FIND & REPLACE GUIDE

**Use case-sensitive find & replace:**

1. **PascalCase:**
   - Find: `SiteInspector`
   - Replace: `ScansBlue`

2. **camelCase:**
   - Find: `siteInspector`
   - Replace: `scansBlue`

3. **snake_case:**
   - Find: `site_inspector`
   - Replace: `scans_blue`

4. **kebab-case:**
   - Find: `site-inspector`
   - Replace: `scans-blue`

5. **UPPERCASE:**
   - Find: `SITEINSPECTOR`
   - Replace: `SCANSBLUE`

6. **lowercase:**
   - Find: `siteinspector`
   - Replace: `scansblue`

---

## ⚠️ EXCEPTIONS (DO NOT CHANGE)

**These should NOT be renamed:**

1. **External references that must match SiteInspector API:**
   - Webhook payload field names (if SiteInspector sends them)
   - API response field names (if SiteInspector defines them)

2. **Git history/changelog references:**
   - Old commit messages mentioning SiteInspector
   - CHANGELOG.md entries (historical)

3. **Migration files:**
   - Keep old migration names for history
   - New migrations can use ScansBlue

---

## 🧪 TESTING AFTER RENAME

**Critical tests:**

1. **Database queries work:**
   - [ ] Can fetch scans_blue_results
   - [ ] Can insert scans_blue_purchases
   - [ ] All foreign keys work

2. **Components render:**
   - [ ] ScansBlueResults displays on prescription page
   - [ ] No import errors
   - [ ] Props pass correctly

3. **API routes respond:**
   - [ ] /api/scansblue/checkout works
   - [ ] /api/webhooks/scansblue receives callbacks
   - [ ] All endpoints return correct data

4. **Functions execute:**
   - [ ] triggerScansBlueFullReport() runs
   - [ ] processScansBlueWebhook() handles data
   - [ ] All renamed functions work

5. **End-to-end flow:**
   - [ ] Submit assessment
   - [ ] Purchase Full Report
   - [ ] Webhook triggers
   - [ ] Results display

---

## 📋 COMPLETION CHECKLIST

Before reporting complete:

- [ ] All database tables renamed
- [ ] All files renamed
- [ ] All components renamed
- [ ] All functions renamed
- [ ] All variables renamed
- [ ] All API routes renamed
- [ ] All types/interfaces renamed
- [ ] All constants renamed
- [ ] All comments updated
- [ ] No "SiteInspector" found in code (except comments about old name)
- [ ] All tests pass
- [ ] Application builds without errors
- [ ] End-to-end test completed successfully

---

## 🚨 MIGRATION STRATEGY

**Recommended approach:**

1. **Create database migration first** (rename tables)
2. **Update all code references** (files, functions, variables)
3. **Test locally** (ensure no breaks)
4. **Deploy** (all changes at once)

**OR (safer for production):**

1. **Add new tables** alongside old ones
2. **Dual-write** to both tables temporarily
3. **Update code gradually**
4. **Migrate data**
5. **Drop old tables** when confirmed working

**Choose the approach that fits your deployment strategy.**

---

## ✅ EXPECTED OUTCOME

After this phase:
- Zero references to "SiteInspector" in codebase (except historical context)
- All code uses "ScansBlue" naming
- Database uses scans_blue_* tables
- API routes are /api/scansblue/*
- Components are ScansBlue*
- Everything works exactly the same, just renamed

---

**BEGIN INTERNAL CODE REBRAND NOW.**

Report back when complete with:
1. List of all files renamed
2. Confirmation that all code references updated
3. Test results showing everything works
