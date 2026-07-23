# BUSINESSBLUEPRINT COMPLETE SYSTEM ARCHITECTURE

## COMPANY STRUCTURE

```
TriadBlue.com (Parent Company)
├── BusinessBlueprint.io (Main Platform - Local SEO for small businesses)
├── SwipesBlue.com (Payment Gateway)
├── HostsBlue.com (Web Services)
└── ConsoleBlue (Internal Operations Management)
```

---

## BRAND STANDARDS

### Triad Colors:
- **Black:** #09080E
- **Blue:** #0000FF
- **Red:** #A00028
- **Purple:** #660099

### App Name Format:
**Always:** "/" (Black #09080E) + space + "appname" (Purple #660099)
**Font:** Archivo Semi Expanded
**Example:** / chat (slash in black, space, "chat" in purple)

### Icons:
- Each app has a specific icon that NEVER changes
- / chat icon = headset with chat bubble
- Never substitute icons

---

## PRODUCTS & PRICING

### CommVerse Bundle: $99/mo
Contains 4 apps:
1. **/ send** - Email campaigns
2. **/ inbox** - Unified inbox
3. **/ chat** - Live chat widget (formerly LiveChat)
4. **/ content** - Content management

**Standalone:** $29/mo each
**In bundle:** $24.75/mo each

### LocalBlue Bundle: $49.50/mo
Contains 2 apps:
1. **/ listings** - Local SEO listings
2. **/ reputation** - Review management

### / relationships CRM (Separate - NEVER in bundles)
- **FREE Starter:** 100 contacts, 1 user, basic features
- **Performance:** $29/mo (unlimited)
- Always offered as default CRM option
- Never discounted

---

## CUSTOMER FLOW

1. Customer creates BusinessBlueprint.io account (required)
2. Customer purchases app(s) or bundle
3. Customer goes to dashboard
4. Dashboard shows all purchased apps with setup progress
5. Customer clicks app to start setup
6. If multiple apps purchased → email sent with list of apps
7. Customer completes setup for each app

---

## / chat ARCHITECTURE (SaaS Model)

### How It Works:
- BusinessBlueprint.io hosts EVERYTHING (widget, backend, database, dashboard)
- Customer (company) embeds widget on their website
- Customer logs into BusinessBlueprint.io to respond to chats
- All data stored in YOUR database
- Contacts auto-sync to customer's / relationships CRM

### Multi-Tenant Isolation:
```
BusinessBlueprint.io Platform
│
├─ Acme Corp's Account
│  ├─ Acme's widget settings
│  ├─ Acme's conversations
│  └─ Acme's / relationships CRM
│     ├─ John (Acme's visitor)
│     └─ Sarah (Acme's visitor)
│
├─ TechStart Inc's Account
│  ├─ TechStart's widget settings
│  ├─ TechStart's conversations
│  └─ TechStart's / relationships CRM
│     ├─ Lisa (TechStart's visitor)
│     └─ David (TechStart's visitor)
│
└─ [Other companies - completely isolated]
```

**YOU (Platform Owner) See:**
- Aggregated, anonymized analytics (conversation counts, response times, peak hours)
- System metrics (performance, errors)
- NO individual company data, NO PII, NO conversation contents

**CUSTOMERS (Companies) See:**
- Only their own visitors
- Only their own conversations
- Only their own analytics

### Customer Embed Code:
```html
<script>
  window.bbChatConfig = {
    customerId: "cust_abc123"
  };
</script>
<script src="https://businessblueprint.io/chat/widget.js" async></script>
```

### CRM Integration:
- During setup, customer connects CRM
- Default: FREE / relationships Starter (100 contacts)
- Option: Upgrade to / relationships Performance ($29/mo)
- All chat visitors auto-create contacts in customer's CRM

---

## / send ARCHITECTURE (Email Campaigns)

### Email Infrastructure:
- Uses YOUR Resend account
- Customer doesn't need their own email provider

### Pricing:
- $29/mo includes 1,000 emails/month
- Overage: $1 per 1,000 additional emails
- Unused emails roll over (max 2,000 total)

### Non-Payment Protection:
- Campaigns queue (not cancelled) when limit reached
- Auto-pause on payment failure
- Resume when payment resolved

### Alternative Providers:
Customers can connect their own:
1. Resend (their account)
2. SendGrid
3. Mailgun
4. Custom SMTP

---

## REPLIT AGENT BUILDER RULES

### Prompt Structure:
1. Build COMPLETE systems, not documentation
2. Agent presents implementation plan FIRST
3. Agent waits for explicit approval before coding
4. Dean reviews all output

### What Prompts Should Include:
- Complete file structure
- Database schema
- API endpoints
- All features specified
- Validation checklist

---

## KEY BUSINESS RULES

1. **Account Required:** All apps require BusinessBlueprint.io account
2. **/ relationships Always Offered:** Every app offers free CRM during setup
3. **Never Discount CRM:** / relationships pricing stays at FREE or $29/mo
4. **Multi-Tenant Isolation:** Companies NEVER see each other's data
5. **You Host Everything:** SaaS model - customers don't self-host
6. **Anonymized Analytics:** You track behaviors, never PII
7. **Icons Are Sacred:** Never change or substitute app icons

---

## DASHBOARD FEATURES

### For Customers (Companies):

**Apps Page:**
- List all purchased apps
- Setup progress indicators (checkboxes)
- Download/setup buttons
- Documentation links

**/ chat Dashboard:**
- View active conversations
- Respond to chats in real-time
- Visitor info sidebar
- Widget customization settings
- Analytics (response times, satisfaction)

### Progress Tracking:
```
/ chat
Status: ✅ Active

1. ✅ Embed Code Added
2. ✅ CRM Connected (/ relationships)
3. ✅ Widget Customized

[Manage Settings] [View Analytics]
```

---

## TECHNICAL STACK

### / chat Backend:
- Node.js + Express
- PostgreSQL database
- Socket.IO for real-time
- Redis for sessions/presence
- JWT authentication

### Widget:
- Vanilla JavaScript (no framework)
- Socket.IO client
- Self-contained CSS
- Works on any website

### Features (All 10):
1. Offline message collection
2. File uploads (5MB limit)
3. Pre-chat custom fields
4. Rate limiting (10 msg/min)
5. Unread message badge
6. GDPR compliance notice
7. Widget state persistence
8. Proactive triggers
9. Returning visitor recognition
10. Error handling & retry logic

---

## DATABASE SCHEMA (/ chat)

### Tables:
- **customers** - Companies using / chat
- **widget_settings** - Per-customer configuration
- **agents** - Customer's team members
- **visitors** - Website visitors
- **conversations** - Chat sessions
- **messages** - Individual messages
- **analytics_events** - Anonymized behavioral data

### Key Relationships:
- Every table filtered by customer_id
- Visitors link to CRM contact_id
- Conversations link to visitors and agents
- Messages link to conversations

---

## SUMMARY

**BusinessBlueprint.io = Local SEO Platform with App Marketplace**

**Apps sold individually or in bundles:**
- CommVerse (4 apps): $99/mo
- LocalBlue (2 apps): $49.50/mo
- Standalone: $29/mo each

**/ relationships CRM = Always separate, always offered free**

**/ chat = Zendesk-style SaaS (you host everything)**

**/ send = Email campaigns using your Resend account**

**All apps require BusinessBlueprint.io account and integrate with / relationships CRM**
