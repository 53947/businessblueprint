# BUSINESSBLUEPRINT SITEMAP - BUILD FROM ACTUAL CODEBASE
## Audit and Document What Actually Exists

---

## AGENT INSTRUCTIONS

**Your task:** Scan the entire BusinessBlueprint.io codebase and create a comprehensive sitemap showing EXACTLY what exists - no assumptions, no guesses, just facts.

**Critical:** There is already a sitemap link in the footer. You need to create the actual sitemap page at that route and populate it with real data from the codebase.

---

## STEP 1: FIND THE EXISTING SITEMAP ROUTE

1. Locate the sitemap link in the footer component
2. Identify the route it points to (likely `/sitemap` or `/site-map`)
3. Check if a page exists at that route
4. If not, create it
5. If yes, replace the content with the comprehensive sitemap you'll build

---

## STEP 2: SCAN THE CODEBASE

**Audit these locations to find all routes/pages:**

### Frontend Routes:
- Check routing configuration files (e.g., `routes.tsx`, `App.tsx`, `index.tsx`, router config)
- List every defined route
- Note which routes are:
  - Public (accessible without login)
  - Authenticated (require login)
  - Admin (require admin access)

### Pages Directory:
- Scan all files in `/pages`, `/app/pages`, `/src/pages`, or wherever pages are stored
- List every page component
- Note the route each page corresponds to

### Components Used in Routes:
- Identify which components are rendered at which routes
- Note any dynamic routes (e.g., `/prescription/:id`)

### API Endpoints:
- Scan `/api` directory or API route files
- List all API endpoints
- Note their methods (GET, POST, etc.)

---

## STEP 3: CHECK NAVIGATION LINKS

**Audit what's actually linked in navigation:**

### Header/Main Navigation:
- Check the header component
- List all navigation links
- Note which pages are accessible from main nav

### Footer Navigation:
- Check the footer component
- List all footer links
- Verify sitemap link exists and works

### Dashboard Sidebar:
- If dashboard exists, check sidebar component
- List all app sections/links
- Note which are visible vs hidden

### Dropdown Menus:
- Check Solutions dropdown
- Check Resources dropdown
- Check Products menu
- List all items in each

---

## STEP 4: IDENTIFY STATUS OF EACH PAGE

For every route/page found, determine:

**Status Indicators:**
- **LIVE** - Route exists, page works, linked in navigation
- **BUILT** - Route exists, page works, but NOT linked in navigation
- **INCOMPLETE** - Route exists but page has errors or missing content
- **BROKEN** - Route defined but page doesn't render
- **REDIRECT** - Route redirects to another page
- **ADMIN ONLY** - Requires admin authentication

---

## STEP 5: CREATE THE SITEMAP PAGE

**Build two views on the sitemap page:**

### View 1: Hierarchical Tree
```
BusinessBlueprint.io
│
├─ PUBLIC PAGES
│  ├─ [actual route] - [page name] - [status]
│  ├─ [actual route] - [page name] - [status]
│  └─ ...
│
├─ AUTHENTICATED PAGES
│  ├─ [actual route] - [page name] - [status]
│  └─ ...
│
└─ ADMIN PAGES
   └─ ...
```

### View 2: Status Table

| Route | Page Name | Status | Linked in Nav? | Notes |
|-------|-----------|--------|----------------|-------|
| /actual-route | Actual Page | LIVE/BUILT/etc | Yes/No | Actual notes |

---

## STEP 6: POPULATE WITH REAL DATA

**DO NOT make assumptions. Only include:**
- Routes that actually exist in the code
- Pages that actually render
- Links that actually appear in navigation
- Status based on actual testing

**If you're unsure about something:**
- Test it (visit the route)
- Check if it renders
- Check if it works
- Mark as INCOMPLETE if broken

---

## REQUIRED OUTPUT FORMAT

### Sitemap Page Must Include:

**Header:**
- Title: "Explore Our Platform"
- Subtitle: "Everything you need to build, grow, and manage your digital presence - all in one place"

**Section 1: Hierarchical Tree**
- Visual tree structure showing all pages
- Status indicators for each item
- Organized by: Public, Authenticated, Admin, API

**Section 2: Status Table**
- Complete table of all routes
- Columns: Route, Page Name, Status, Linked in Nav?, Notes
- Sortable/filterable

**Section 3: Critical Issues (if any)**
- List any broken routes
- List any routes not linked but should be
- List any missing pages that are referenced

**Footer:**
- Last updated timestamp
- Note: "This sitemap is generated from actual codebase analysis"

---

## STYLING REQUIREMENTS

- Match existing BusinessBlueprint design system
- Use existing color scheme (#09080E black, blues, etc.)
- Mobile responsive
- Clean, scannable layout
- Professional appearance

---

## TESTING REQUIREMENTS

Before reporting complete:

1. **Verify sitemap link in footer works**
   - Click the footer link
   - Confirms it loads the new sitemap page

2. **Verify all routes listed are accurate**
   - Spot check 10+ routes
   - Confirm they actually exist
   - Confirm status is correct

3. **Verify navigation links are accurate**
   - Check what's marked as "Linked in Nav"
   - Confirm those items actually appear in nav

4. **Mobile test**
   - View on mobile
   - Ensure readable and functional

---

## CRITICAL REMINDERS

1. **Only document what EXISTS** - Don't include planned features
2. **Test before marking as LIVE** - Verify pages actually work
3. **No assumptions** - If you're not sure, test it
4. **Update footer link** - Make sure it points to your new sitemap page
5. **Be honest about status** - If something is broken, mark it BROKEN

---

## COMPLETION CHECKLIST

- [ ] Scanned all route definitions
- [ ] Scanned all page components
- [ ] Checked all navigation menus
- [ ] Tested key routes to verify status
- [ ] Created sitemap page at correct route
- [ ] Footer link works and points to sitemap
- [ ] Hierarchical tree view complete
- [ ] Status table complete
- [ ] Mobile responsive
- [ ] Critical issues section included (if any)
- [ ] Last updated timestamp added

---

## REPORT FORMAT

When complete, provide:

1. **Screenshot of the sitemap page**
2. **Count of pages found:**
   - Total routes found: [number]
   - Public routes: [number]
   - Authenticated routes: [number]
   - Admin routes: [number]
   - API endpoints: [number]
3. **Summary of status:**
   - LIVE: [number]
   - BUILT: [number]
   - INCOMPLETE: [number]
   - BROKEN: [number]
4. **Critical issues found:** [list or "none"]
5. **Confirmation:** Footer link tested and working

---

**BEGIN CODEBASE AUDIT AND SITEMAP CREATION NOW.**

Scan the actual code. Document the truth. Build the sitemap.
