# BUSINESSBLUEPRINT SITE BUILDING GUIDELINES
## Development Standards & Conventions

**Version:** 1.0  
**Last Updated:** January 12, 2026  
**Purpose:** Maintain consistency and quality across all BusinessBlueprint code

---

## 🎯 OVERVIEW

These guidelines ensure all code follows established patterns, maintains consistency, and integrates seamlessly with existing systems. **FOLLOW THESE STANDARDS FOR ALL DEVELOPMENT.**

---

## 📁 PROJECT STRUCTURE

### **Directory Organization**

```
businessblueprint/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── [feature]/   # Feature-specific components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── assets/          # Images, icons, fonts
│   └── public/              # Static assets
├── server/                   # Backend Node.js/Express
│   ├── routes/              # API route handlers
│   ├── services/            # Business logic
│   └── db.ts                # Database connection
├── shared/                   # Code shared between client/server
│   ├── schema.ts            # Database schema (Drizzle ORM)
│   ├── products.ts          # Product definitions
│   └── routes.ts            # Route manifest
└── docs/                     # Documentation
```

---

## 🎨 NAMING CONVENTIONS

### **Files & Folders**

**✅ CORRECT:**
```
components/
├── header.tsx              # Lowercase with hyphens
├── side-nav.tsx            # Lowercase with hyphens
├── scansblue-results.tsx   # Lowercase with hyphens
└── ui/
    ├── button.tsx
    └── dropdown-menu.tsx
```

**❌ INCORRECT:**
```
components/
├── Header.tsx              # NO - PascalCase for files
├── SideNav.tsx             # NO - PascalCase for files
├── scansBlueResults.tsx    # NO - camelCase for files
```

### **Components**

**React Component Names:** PascalCase
```typescript
// ✅ CORRECT
export function Header() {}
export function SideNav() {}
export function ScansBlueResults() {}

// ❌ INCORRECT
export function header() {}
export function sideNav() {}
```

### **Functions & Variables**

**Function Names:** camelCase
```typescript
// ✅ CORRECT
function handleAddToCart() {}
function getScansBlueResults() {}
async function triggerFullReport() {}

// ❌ INCORRECT
function HandleAddToCart() {}
function get_scans_blue_results() {}
```

**Variables:** camelCase
```typescript
// ✅ CORRECT
const cartCount = 0;
const billingCycle = 'monthly';
const hasClientPortalAccess = false;

// ❌ INCORRECT
const CartCount = 0;
const billing_cycle = 'monthly';
```

**Constants:** SCREAMING_SNAKE_CASE
```typescript
// ✅ CORRECT
const MAX_CART_ITEMS = 10;
const API_BASE_URL = 'https://api.example.com';

// ❌ INCORRECT
const maxCartItems = 10;
const apiBaseUrl = 'https://api.example.com';
```

### **Database Tables & Columns**

**Tables:** snake_case
```typescript
// ✅ CORRECT
scans_blue_results
scans_blue_purchases
digital_iq_assessments

// ❌ INCORRECT
ScansBlueResults
scansBlueResults
scans-blue-results
```

**Columns:** snake_case
```typescript
// ✅ CORRECT
user_id
created_at
digital_iq_score

// ❌ INCORRECT
userId
createdAt
digitalIQScore
```

---

## 🛣️ ROUTING PATTERNS

### **App Route Structure**

**Every app follows this three-page pattern:**

**1. Landing Page:** `/ appname`
```typescript
// Examples:
/send              // Marketing page for /send
/inbox             // Marketing page for /inbox  
/content           // Marketing page for /content
/relationships     // Marketing page for /relationships
/commverse         // Bundle landing page
/localblue         // Bundle landing page
```
- Public access (no authentication)
- Marketing/information page
- Includes pricing, features, benefits

**2. Dashboard:** `/ appname/dashboard`
```typescript
// Examples:
/send/dashboard              // Authenticated /send app
/inbox/dashboard             // Authenticated /inbox app
/content/dashboard           // Authenticated /content app
/relationships/dashboard     // Authenticated /relationships CRM
```
- Requires authentication
- Main application interface
- User's working environment

**3. Setup:** `/ appname/setup`
```typescript
// Examples:
/send/setup              // Initial /send configuration
/inbox/setup             // Initial /inbox configuration
/content/setup           // Initial /content configuration
/relationships/setup     // Initial /relationships setup
```
- Requires authentication
- First-time setup wizard
- Configuration and onboarding

### **Display Text vs Route URLs**

**CRITICAL:** There's a difference between how we display app names and the actual route URLs.

**Display Text (UI/Navigation):**
```typescript
// ✅ ALWAYS include space between / and word
"/ send"
"/ inbox"
"/ content"
"/ relationships"
"/ commverse"
"/ localblue"

// ❌ NEVER display without space
"/send"
"/inbox"
```

**Route URLs (Actual Paths):**
```typescript
// ✅ NO space in actual URLs
/send
/inbox
/content
/relationships

// ❌ NEVER use space in URLs
/ send     // This would be URL-encoded as /%20send
```

**Example Implementation:**
```typescript
// Display text
<div className="text-sm font-bold">
  <span style={{ color: '#09080E' }}>/</span>
  <span style={{ color: '#FFFF00' }}>send</span>
</div>

// Route URL
<a href="/send">Visit /send</a>
```

### **Route Naming Standards**

**All routes:** lowercase, no trailing slashes
```typescript
// ✅ CORRECT - Landing pages
/send
/inbox
/content
/relationships
/commverse
/localblue

// ✅ CORRECT - Dashboards
/send/dashboard
/inbox/dashboard
/content/dashboard
/relationships/dashboard

// ✅ CORRECT - Setup pages
/send/setup
/inbox/setup
/content/setup

// ❌ INCORRECT
/Send                    // No uppercase
/content-landing         // Don't use -landing suffix
/send-app               // Don't use -app suffix  
/relationships/         // No trailing slash
```

### **Route Organization**

Routes are defined in `shared/routes.ts` as the single source of truth:

```typescript
export interface RouteDefinition {
  path: string;              // URL path
  name: string;              // Display name
  description: string;       // SEO description
  category: string;          // Grouping category
  requiresAuth: boolean;     // Requires login?
  isAdmin: boolean;          // Admin only?
  isDynamic: boolean;        // Has dynamic params?
  surfacedInNav: boolean;    // Show in navigation?
  badge?: string;            // Optional badge text
}
```

**Categories:**
- Public
- Assessment
- AI Coach
- Pricing
- Commverse
- LocalBlue
- Relationships
- Portal
- ScansBlue
- Resources
- Admin

---

## 🎨 STYLING & UI STANDARDS

### **Color Palette**

**Primary Colors:**
```css
#09080E  - Triad Black (primary text, backgrounds)
#FF6B00  - Commverse Orange
#6EA6FF  - LocalBlue Blue
#22C55E  - Relationships Green
#A00028  - Digital IQ Red
#A855F7  - Coach Blue Purple
```

**App-Specific Colors:**
```css
#FFFF00  - /send Yellow (with #000 border)
#0080FF  - /inbox Blue
#8000FF  - /livechat Purple
#E91EBC  - /content Pink
#FF0040  - /listings Red
#D59600  - /reputation Gold
```

### **Typography**

- **Primary Font:** System font stack (default)
- **Font Sizes:** Use Tailwind classes (text-xs, text-sm, text-base, text-lg, etc.)
- **Font Weights:** font-normal, font-medium, font-semibold, font-bold, font-extrabold

### **Spacing**

Use Tailwind spacing scale:
```
p-1  = 0.25rem (4px)
p-2  = 0.5rem  (8px)
p-3  = 0.75rem (12px)
p-4  = 1rem    (16px)
p-6  = 1.5rem  (24px)
p-8  = 2rem    (32px)
```

---

## 🧩 COMPONENT PATTERNS

### **Component Structure**

```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  // 4. Hooks (useState, useEffect, custom hooks)
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // 5. Event Handlers
  const handleClick = () => {
    setIsOpen(true);
    onAction?.();
  };
  
  // 6. Render
  return (
    <div className="p-4">
      <h1>{title}</h1>
      <Button onClick={handleClick}>Action</Button>
    </div>
  );
}
```

### **Data Testid Pattern**

**ALWAYS include data-testid for:**
- Buttons
- Links
- Form inputs
- Navigation items
- Interactive elements

```typescript
// ✅ CORRECT
<button data-testid="button-add-to-cart">Add to Cart</button>
<a href="/cart" data-testid="link-view-cart">View Cart</a>
<input data-testid="input-email" />

// Pattern: [element-type]-[descriptive-name]
// Examples:
// - button-sign-out
// - link-solution-send
// - input-business-name
// - nav-item-relationships
```

### **Image Assets**

**Icon Imports Pattern:**
```typescript
// Use relative paths from @assets
import sendIcon from "@assets/native icons and favicons/: send app icon.png";
import sendLogo from "@assets/send_1762930219634.png";
```

**Icon Usage:**
```typescript
<img 
  src={sendIcon} 
  alt="/send" 
  className="w-7 h-7 object-contain" 
/>
```

---

## 📱 MOBILE DEVELOPMENT STANDARDS

### **Mobile-First Requirement**

**CRITICAL:** Every component and navigation element MUST have both desktop and mobile implementations.

### **Mobile Navigation Pattern**

**Header Structure:**
```
Desktop: Horizontal mega menu with dropdowns
Mobile: Accordion menu with +/- toggles
```

**Mobile Menu Location:**
- Lives in same `header.tsx` file
- Wrapped in `{isMobileMenuOpen && ...}` conditional
- Uses accordion pattern with `openAccordion` state
- Must match desktop menu structure exactly

### **Mobile Accordion Pattern**

```typescript
// Mobile accordion header
<button
  onClick={() => setOpenAccordion(isOpen ? null : item.label)}
  className="w-full flex items-center justify-between p-4"
>
  <div className="text-left">
    <div className="font-bold">{item.label}</div>
    <div className="text-xs text-gray-600">{item.description}</div>
  </div>
  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
</button>

// Mobile accordion content
{isOpen && (
  <div className="p-4 border-t space-y-3">
    {/* Content here - must match desktop */}
  </div>
)}
```

### **Mobile Menu Sections Must Match Desktop**

**How It Works:**
- Mobile accordion → Desktop dropdown
- Same 5 steps, same links

**Products:**
- Mobile inline cards → Desktop mega menu
- Same pricing, same items, same bundles

**Solutions:**
- Mobile 2-column grid → Desktop 3-column grid
- ALL items must be present (14 total)

**Resources:**
- Mobile 4 sections → Desktop 4 columns
- Same links in each section

### **Mobile Testing Checklist**

Before reporting complete:

- [ ] Tested at 375px width (iPhone SE)
- [ ] Tested at 390px width (iPhone 12/13/14)
- [ ] Tested at 428px width (iPhone 14 Pro Max)
- [ ] All accordion sections open/close correctly
- [ ] All links work on mobile
- [ ] No horizontal scroll
- [ ] Touch targets are 44px minimum
- [ ] No desktop-only content visible on mobile
- [ ] Mobile cart button visible and functional
- [ ] Mobile footer buttons work

### **Common Mobile Mistakes**

**❌ DON'T:**
1. Update desktop without updating mobile
2. Use `hidden lg:block` without mobile alternative
3. Skip mobile testing
4. Assume mobile "just works"
5. Report complete without mobile screenshots
6. Use mouse-only interactions (hover)
7. Create touch targets smaller than 44px

**✅ DO:**
1. Update both desktop AND mobile together
2. Test on actual mobile viewport
3. Provide mobile screenshots
4. Use touch-friendly interactions
5. Maintain parity between desktop/mobile
6. Check responsive breakpoints
7. Verify accordion content matches dropdowns

---

## 🔗 NAVIGATION PATTERNS

### **Dropdown Menu Structure**

**Desktop Navigation:**
```typescript
<NavigationMenuItem>
  <NavigationMenuTrigger data-testid="menu-trigger-[name]">
    <img src={icon} alt="" className="w-4 h-4" />
    <span>Menu Name</span>
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    {/* Content here */}
  </NavigationMenuContent>
</NavigationMenuItem>
```

**App Card Pattern:**
```typescript
<NavigationMenuLink asChild>
  <a 
    href="/app-route" 
    className="flex flex-col items-center p-3 rounded-lg border-2 hover:shadow-lg transition-all cursor-pointer" 
    style={{ borderColor: '#COLOR' }}
    data-testid="link-solution-app-name"
  >
    <img src={appIcon} alt="/app" className="h-12 w-12 object-contain mb-2" />
    <div className="text-sm font-bold text-gray-900 dark:text-white text-center">
      /app-name
    </div>
    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
      Description
    </p>
  </a>
</NavigationMenuLink>
```

---

## 💾 DATABASE PATTERNS

### **Schema Definition (Drizzle ORM)**

```typescript
import { pgTable, serial, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core";

export const tableName = pgTable("table_name", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true),
  data: text("data"),
});
```

### **Query Patterns**

```typescript
// ✅ CORRECT - Use service layer
const results = await ScansBlueService.getResults(userId);

// ❌ INCORRECT - Don't query directly in components
const results = await db.select().from(scans_blue_results);
```

---

## 🔌 API PATTERNS

### **Route Handler Structure**

```typescript
import type { Express } from "express";

export function registerScansBlueRoutes(app: Express) {
  // GET endpoint
  app.get("/api/scansblue/results/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const results = await ScansBlueService.getResults(id);
      res.json(results);
    } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // POST endpoint
  app.post("/api/scansblue/purchase", async (req, res) => {
    try {
      const { userId, reportId } = req.body;
      const result = await ScansBlueService.createPurchase(userId, reportId);
      res.json(result);
    } catch (error) {
      console.error("Error creating purchase:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
```

---

## 🎯 PRODUCTS & PRICING

### **Product ID Standards**

```typescript
// ✅ CORRECT - lowercase, no special characters
"send"
"inbox"
"content"
"livechat"
"listings"
"reputation"
"relationships"
"commverse"     // Bundle
"localblue"     // Bundle

// ❌ INCORRECT
"Send"
"send-app"
"/ send"
```

### **Pricing Display**

```typescript
// Monthly pricing
const monthlyPrice = 34;
const displayPrice = `$${monthlyPrice}/mo`;

// Annual pricing (20% discount)
const annualPrice = Math.round(monthlyPrice * 12 * 0.8);
const displayPrice = `$${annualPrice}/yr`;
```

---

## 🔒 AUTHENTICATION PATTERNS

### **Auth Check Pattern**

```typescript
import { useAuth } from "@/hooks/useAuth";

export function ProtectedComponent() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/portal/login" />;
  }
  
  return <div>Protected content</div>;
}
```

### **Conditional Navigation**

```typescript
// ✅ CORRECT - Check auth, redirect to login if needed
<a href={isLoggedIn ? "/portal/inbox" : "/portal/login?redirect=/portal/inbox"}>
  Inbox
</a>
```

---

## ⚠️ COMMON MISTAKES TO AVOID

### **❌ Don't:**
1. Use inconsistent naming patterns
2. Create duplicate route definitions
3. Query database directly in components
4. Hardcode colors (use variables)
5. Skip data-testid attributes
6. Use PascalCase for files
7. Add `-landing` suffix to routes
8. Create routes not in shared/routes.ts
9. Use different icon patterns
10. Skip mobile responsiveness

### **✅ Do:**
1. Follow established naming conventions
2. Use shared/routes.ts as source of truth
3. Use service layer for data access
4. Use color constants
5. Add data-testid to all interactive elements
6. Use lowercase-with-hyphens for files
7. Keep route names clean and simple
8. Register all routes in shared/routes.ts
9. Follow icon import patterns
10. Test on mobile and desktop

---

## 📝 CODE REVIEW CHECKLIST

Before submitting code:

- [ ] Follows naming conventions
- [ ] Uses correct file structure
- [ ] Includes data-testid attributes
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Matches existing patterns
- [ ] Routes registered in shared/routes.ts
- [ ] Database queries use service layer
- [ ] Error handling implemented
- [ ] TypeScript types defined
- [ ] Comments for complex logic
- [ ] No hardcoded values

---

## 🆘 WHEN IN DOUBT

**Always:**
1. Look at existing code for patterns
2. Check shared/routes.ts for route definitions
3. Check BUSINESSBLUEPRINT_SYSTEM_KNOWLEDGE_BASE.md for business logic
4. Ask before creating new patterns
5. Match existing component structure

**Never:**
1. Invent new patterns without approval
2. Skip established conventions "because it's easier"
3. Create routes outside the manifest
4. Use different naming patterns "just this once"

---

**These guidelines are mandatory for all development. Consistency is key to maintainability.**
