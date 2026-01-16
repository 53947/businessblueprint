# BUILD LIVECHAT WIDGET - COMPLETE SYSTEM

## FOR REPLIT AGENT BUILDER

You are building this in Replit. Use these Replit-specific settings:

**Environment:**
- Node.js runtime
- Use `npm` for dependencies
- Main entry: `backend/server.js`
- Port: Use `process.env.PORT || 3000`
- Database: SQLite (simplest for Replit) - file at `./livechat.db`

**Replit Configuration (.replit file):**
```
run = "npm start"
language = "nodejs"
entrypoint = "backend/server.js"

[env]
PORT = "3000"
```

**Important for Replit:**
- All file paths relative to project root
- Use SQLite (not PostgreSQL) for simplicity
- No Docker needed
- Keep everything in single project
- Widget accessible at: `https://{repl-name}.{username}.repl.co/widget/livechat-widget.js`

---

## CRITICAL INSTRUCTIONS

You are building a production-ready LiveChat widget from scratch. This is NOT a modification of existing code - you are creating an ENTIRELY NEW system.

**STOP. Before you do ANYTHING:**

Present this plan and GET APPROVAL:
1. List every file you will create (full file tree)
2. List your technology choices (confirm SQLite for Replit)
3. Confirm you understand: Widget REQUIRES external CRM (does NOT store contacts)
4. Ask any clarifying questions

**DO NOT PROCEED until explicitly told to continue.**

---

## WHAT YOU'RE BUILDING

**Product:** LiveChat widget for BusinessBlueprint customers ($29/mo standalone, $24.75/mo in CommVerse bundle)

**Core Architecture:**
```
Embeddable Widget → Backend Server → Minimal Database (sessions/messages ONLY)
                         ↓
                    External CRM (REQUIRED)
                    ├─ /relationships (FREE or $29/mo) ← DEFAULT
                    └─ Customer's CRM (Salesforce, HubSpot, etc.)
```

**Key Rule:** Widget NEVER stores contact data. All visitor info (name, email, phone) goes directly to the connected CRM.

---

## COMPLETE FILE LIST TO CREATE

Create exactly these files - no more, no less:

```
livechat-widget/
├── README.md
├── package.json
├── .env.example
├── install.sh

├── widget/
│   └── livechat-widget.js                    ← Embeddable JavaScript

├── backend/
│   ├── server.js                             ← Main Express + Socket.IO server
│   ├── config/
│   │   ├── database.js
│   │   └── socket.js
│   ├── routes/
│   │   ├── sessions.js                       ← POST /api/sessions
│   │   ├── messages.js                       ← POST /api/messages
│   │   ├── upload.js                         ← POST /api/upload
│   │   └── crm.js                            ← GET /api/crm/lookup
│   ├── services/
│   │   ├── crmService.js                     ← CRM sync logic
│   │   └── socketService.js                  ← Socket.IO handlers
│   ├── adapters/
│   │   ├── relationshipsCRM.js               ← /relationships integration
│   │   ├── salesforce.js
│   │   ├── hubspot.js
│   │   └── webhook.js
│   └── database/
│       └── schema.sql                        ← Database tables

├── admin/
│   ├── login.html
│   ├── dashboard.html
│   └── settings.html

└── installer/
    └── crm-setup.js                          ← Auto-install /relationships
```

---

## DATABASE SCHEMA

Create ONLY these tables (no contacts table):

```sql
-- Session tracking (NOT visitor data)
CREATE TABLE sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    crm_contact_id VARCHAR(255),              -- Reference to CRM contact
    crm_type VARCHAR(50),
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    status VARCHAR(50)
);

-- Messages only
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255),
    direction VARCHAR(20),                     -- inbound or outbound
    content TEXT,
    created_at TIMESTAMP
);

-- Widget settings
CREATE TABLE widget_settings (
    customer_id VARCHAR(255) PRIMARY KEY,
    company_name VARCHAR(255),
    primary_color VARCHAR(7),
    welcome_message TEXT,
    custom_fields JSONB
);

-- CRM config per customer
CREATE TABLE crm_config (
    customer_id VARCHAR(255) PRIMARY KEY,
    crm_type VARCHAR(50),                      -- relationships, salesforce, hubspot
    api_key VARCHAR(500),
    api_endpoint VARCHAR(500),
    is_active BOOLEAN
);
```

---

## WIDGET CODE STRUCTURE

`widget/livechat-widget.js` must:

1. Display chat bubble (customizable position/colors)
2. Collect visitor info: name, email, custom fields
3. **Immediately send visitor data to backend** → backend syncs to CRM
4. Connect via Socket.IO for real-time messages
5. Handle: typing indicators, file uploads, offline messages, rate limiting, GDPR consent
6. Store session ID in localStorage
7. Show unread badge when minimized

**Configuration:**
```javascript
window.bbLiveChatConfig = {
  customerId: "cust_123",
  companyName: "My Company",
  primaryColor: "#F97316",
  position: "bottom-right",
  welcomeMessage: "Hi! How can we help?",
  customFields: [
    { name: "phone", label: "Phone", type: "tel" }
  ]
};
```

---

## BACKEND SERVER LOGIC

`backend/server.js`:
- Express server on port 3000
- Socket.IO for real-time
- Load CRM adapter based on customer's `crm_config`
- Never store contact data locally

**API Flow:**
```
POST /api/sessions
├─ Receive: { visitorName, visitorEmail, customFields }
├─ Look up customer's CRM config
├─ Call crmService.syncContact()
│  └─ Creates/updates contact in external CRM
├─ Store session with crm_contact_id reference
└─ Return: { sessionId, crmContactId, existingContact }

POST /api/messages
├─ Receive: { sessionId, message }
├─ Save to messages table
├─ Emit via Socket.IO to admin
├─ Call crmService.logActivity()
│  └─ Logs chat in CRM as activity
└─ Return: { messageId }
```

---

## CRM ADAPTERS

Each adapter (`adapters/*.js`) must implement:

```javascript
class CRMAdapter {
  async syncContact(data) {
    // POST to CRM API to create/update contact
    // Returns: { crmContactId }
  }
  
  async lookupContact(email) {
    // GET from CRM API
    // Returns: { found: true/false, contact: {...} }
  }
  
  async logActivity(crmContactId, activityData) {
    // POST chat transcript as activity/note in CRM
  }
}
```

**relationshipsCRM.js** calls:
```
POST https://businessblueprint.io/api/relationships/contacts
GET https://businessblueprint.io/api/relationships/contacts/lookup?email=
POST https://businessblueprint.io/api/relationships/activities
```

---

## INSTALLATION SCRIPT

`install.sh`:
1. Check Node.js installed
2. Run `npm install`
3. Ask: PostgreSQL or SQLite?
4. Create `.env` file
5. Run database migrations
6. **CRM Setup:**
   ```
   Choose CRM:
   1) /relationships (FREE - Auto setup) ← DEFAULT
   2) Salesforce (Manual config)
   3) HubSpot (Manual config)
   4) Webhook (Manual config)
   ```
7. If option 1: Run `installer/crm-setup.js` to auto-configure /relationships
8. Show success message with widget URL

---

## ADMIN DASHBOARD

Simple HTML/CSS/JS (no framework):

**login.html:**
- Email/password form
- POST to /admin/login
- Store JWT token

**dashboard.html:**
- List active conversations
- Click to view chat
- Real-time updates via Socket.IO
- Send replies

**settings.html:**
- Configure widget (colors, messages, fields)
- View/test CRM connection

---

## REQUIRED FEATURES

Widget MUST include all 10 features:

1. ✅ Offline message form (when no agents)
2. ✅ File uploads (images, PDFs, 5MB limit)
3. ✅ Custom fields (phone, company, etc.)
4. ✅ Rate limiting (10 msg/min)
5. ✅ Unread badge on minimized widget
6. ✅ GDPR consent checkbox (optional)
7. ✅ State persistence across pages
8. ✅ Auto-open triggers (time, page, exit intent)
9. ✅ Returning visitor greeting (from CRM)
10. ✅ Error handling & retry logic

---

## BUILD ORDER

1. Database schema
2. Backend server + Socket.IO
3. CRM service + /relationships adapter
4. API routes (sessions, messages, upload)
5. Widget JavaScript (complete with all features)
6. Admin dashboard (basic HTML/CSS/JS)
7. Installation script
8. Other CRM adapters (Salesforce, HubSpot, webhook)
9. README documentation

---

## VALIDATION CHECKLIST

After building, verify:
- [ ] No `contacts` or `visitors` table in database
- [ ] Widget sends visitor data immediately to backend
- [ ] Backend syncs visitor to CRM before doing anything else
- [ ] Sessions table stores `crm_contact_id` reference only
- [ ] All chat activities log to CRM
- [ ] Installation offers /relationships as default
- [ ] Widget works end-to-end (visitor → chat → CRM)
- [ ] Admin can view/respond to chats
- [ ] File uploads work
- [ ] All 10 features implemented

---

## CRITICAL REMINDERS

- **DO NOT create a contacts/visitors table** - that's the CRM's job
- **DO sync every visitor to CRM immediately** - no local storage
- **DO make /relationships the default** - easiest path
- **DO include all 10 enhanced features** - not optional
- **DO create actual working code** - not placeholders or comments
- **DO make it production-ready** - complete, tested, documented

---

**NOW: Present your implementation plan and wait for approval before building anything.**
