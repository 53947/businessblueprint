# LIVECHAT WIDGET - GENERATION PROMPT

---

## INTRODUCTION

### What This Prompt Does
This generates a production-ready LiveChat widget system that customers purchase as a standalone app ($29/mo) or as part of the CommVerse bundle ($24.75/mo per app).

**Key Architecture:**
- LiveChat widget (embeddable JavaScript)
- Backend server (Node.js + Socket.IO)
- **REQUIRES external CRM** - does NOT include built-in contact storage
- Integrates with /relationships CRM OR customer's existing CRM
- Admin dashboard for agents to respond to chats

### How To Use This Prompt
1. Copy this entire prompt
2. Paste into AI coding assistant (Claude, Cursor, Replit AI)
3. AI will present implementation plan
4. Approve the plan
5. AI generates all files
6. Deploy to production

### Product Context
**LiveChat** is one of 6 apps in the CommVerse bundle from BusinessBlueprint/TriadBlue ecosystem:
- **Standalone:** $29/month
- **In CommVerse Bundle:** $24.75/month (with /send, /inbox, /content)
- **In LocalBlue Bundle:** Separate bundle with /listings + /reputation

**Installation automatically offers:**
- FREE /relationships Starter CRM (100 contacts, 1 user, basic features)
- Upgrade to /relationships Performance ($29/mo) for unlimited
- OR connect customer's existing CRM (Salesforce, HubSpot, Zoho, etc.)

---

## YOUR TASK

You are an expert full-stack developer building a production-ready LiveChat widget system.

**CRITICAL: DO NOT START CODING YET.**

### Step 1: Present Implementation Plan

Before writing ANY code, present:

1. **Complete File Structure**
   - Every file you'll create
   - Organized by directory
   - File size estimates

2. **Technology Stack**
   - Backend: Node.js version, frameworks, dependencies
   - Database: What needs to be stored (NOT contacts - those go in CRM)
   - Frontend: Widget technology (vanilla JS recommended)
   - Real-time: Socket.IO version
   - File storage: Recommendations

3. **CRM Integration Strategy**
   - How widget connects to /relationships CRM
   - How widget connects to external CRMs
   - What data flows between widget and CRM

4. **Implementation Order**
   - Which components first
   - Dependencies between components
   - Estimated time per phase

5. **Questions & Clarifications**
   - Any ambiguities
   - Assumptions you're making
   - Decisions needed

**WAIT FOR EXPLICIT APPROVAL before generating code.**

### Step 2: Build According to Specifications Below

---

## SYSTEM ARCHITECTURE

```
Customer's Website
    ↓ (embeds widget)
LiveChat Widget (JavaScript)
    ↓ (WebSocket)
LiveChat Backend (Node.js + Socket.IO)
    ↓ (stores conversations only)
Minimal Database (messages, sessions, settings)
    ↓ (syncs contacts)
External CRM (required)
    ├─→ /relationships (FREE or $29/mo)
    └─→ Customer's CRM (Salesforce, HubSpot, etc.)
```

### What Gets Stored Where

**LiveChat Database (minimal):**
- conversation_sessions (session_id, started_at, ended_at, status)
- messages (session_id, content, direction, timestamp, agent_id)
- widget_settings (colors, position, welcome message, etc.)
- agent_assignments (which agent handles which conversation)

**External CRM (customer's choice):**
- contacts (name, email, phone, company, etc.)
- contact_activities (chat history, timestamps, outcomes)
- contact_metadata (custom fields, tags, lifecycle stage)

**KEY PRINCIPLE:** LiveChat NEVER stores contact information. All visitor data flows immediately to the connected CRM.

---

## REQUIRED FILE STRUCTURE

```
livechat-widget/
├── README.md
├── INSTALLATION.md
├── package.json
├── .env.example
├── .gitignore
├── install.sh                      (Interactive installer)
│
├── widget/
│   ├── livechat-widget.js          (Embeddable widget - standalone)
│   └── widget-config-template.js   (Configuration template)
│
├── backend/
│   ├── server.js                   (Main Express + Socket.IO server)
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── socket.js
│   │
│   ├── routes/
│   │   ├── api/
│   │   │   ├── sessions.js         (Create chat session)
│   │   │   ├── messages.js         (Send/receive messages)
│   │   │   ├── upload.js           (File uploads)
│   │   │   └── offline.js          (Offline messages)
│   │   │
│   │   ├── admin/
│   │   │   ├── auth.js             (Agent login)
│   │   │   ├── conversations.js    (View active chats)
│   │   │   └── settings.js         (Configure widget)
│   │   │
│   │   └── crm/
│   │       ├── relationships.js    (BusinessBlueprint /relationships adapter)
│   │       ├── salesforce.js       (Salesforce adapter)
│   │       ├── hubspot.js          (HubSpot adapter)
│   │       ├── zoho.js             (Zoho adapter)
│   │       └── webhook.js          (Generic webhook adapter)
│   │
│   ├── models/
│   │   ├── Session.js
│   │   ├── Message.js
│   │   ├── WidgetSettings.js
│   │   └── AgentAssignment.js
│   │
│   ├── services/
│   │   ├── socketService.js        (Socket.IO handlers)
│   │   ├── crmSyncService.js       (Sync visitors to CRM)
│   │   └── fileStorageService.js   (Handle uploads)
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── validation.js
│   │
│   └── database/
│       ├── migrations/
│       │   └── 001_initial_schema.sql
│       └── seeds/
│           └── default_settings.js
│
├── admin-dashboard/
│   ├── index.html                  (Agent dashboard)
│   ├── login.html
│   ├── settings.html
│   └── assets/
│       ├── css/
│       └── js/
│
└── installer/
    ├── crm-setup.js                (CRM connection wizard)
    └── relationships-install.js    (Auto-install /relationships)
```

---

## DATABASE SCHEMA (Minimal - No Contact Storage)

```sql
-- conversation_sessions (NOT storing visitor info - that goes to CRM)
CREATE TABLE conversation_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    crm_contact_id VARCHAR(255),         -- Reference to contact in external CRM
    crm_type VARCHAR(50),                 -- 'relationships', 'salesforce', etc.
    agent_id INTEGER,
    status VARCHAR(50) DEFAULT 'active',  -- active, closed, archived
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    last_message_at TIMESTAMP,
    page_url TEXT,
    referrer TEXT,
    metadata JSONB
);

-- messages (chat transcript only)
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES conversation_sessions(session_id) ON DELETE CASCADE,
    direction VARCHAR(20) NOT NULL,      -- inbound (visitor), outbound (agent)
    content TEXT NOT NULL,
    agent_id INTEGER,
    message_type VARCHAR(50) DEFAULT 'text', -- text, file, system
    file_url VARCHAR(500),
    file_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    metadata JSONB
);

-- widget_settings (per customer installation)
CREATE TABLE widget_settings (
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(255) UNIQUE NOT NULL,  -- BusinessBlueprint customer ID
    company_name VARCHAR(255) DEFAULT 'Support Team',
    primary_color VARCHAR(7) DEFAULT '#F97316',
    position VARCHAR(20) DEFAULT 'bottom-right',
    welcome_message TEXT DEFAULT 'Hi! How can we help you today?',
    require_email BOOLEAN DEFAULT FALSE,
    enable_sound BOOLEAN DEFAULT TRUE,
    custom_fields JSONB,                 -- Additional fields to collect (sent to CRM)
    gdpr_enabled BOOLEAN DEFAULT FALSE,
    gdpr_privacy_url TEXT,
    auto_open_delay INTEGER,
    file_uploads_enabled BOOLEAN DEFAULT TRUE,
    max_file_size INTEGER DEFAULT 5242880,
    rate_limit_messages INTEGER DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- agent_assignments
CREATE TABLE agent_assignments (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES conversation_sessions(session_id),
    agent_id INTEGER NOT NULL,           -- References agent in BusinessBlueprint system
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active'
);

-- crm_configuration (per customer)
CREATE TABLE crm_configuration (
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(255) UNIQUE NOT NULL,
    crm_type VARCHAR(50) NOT NULL,       -- relationships, salesforce, hubspot, zoho, webhook
    is_active BOOLEAN DEFAULT TRUE,
    api_endpoint VARCHAR(500),           -- CRM API endpoint
    api_key VARCHAR(500),                -- Encrypted API key
    api_secret VARCHAR(500),             -- Encrypted secret (if needed)
    webhook_url VARCHAR(500),            -- For generic webhook integration
    field_mapping JSONB,                 -- Map widget fields to CRM fields
    sync_enabled BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_session_id ON conversation_sessions(session_id);
CREATE INDEX idx_sessions_crm_contact ON conversation_sessions(crm_contact_id);
CREATE INDEX idx_messages_session ON messages(session_id);
CREATE INDEX idx_messages_created ON messages(created_at);
```

---

## WIDGET FEATURES (livechat-widget.js)

### Core Features
1. ✅ Chat bubble UI (customizable position, colors)
2. ✅ Welcome form (name, email, custom fields)
3. ✅ Real-time messaging via Socket.IO
4. ✅ Typing indicators (both directions)
5. ✅ Sound notifications
6. ✅ Connection status indicator
7. ✅ Mobile responsive design
8. ✅ Persistent session across page navigation

### Enhanced Features (ALL REQUIRED)
1. ✅ **Offline Message Collection** - Form when no agents available
2. ✅ **File Upload Support** - Images, PDFs, documents (5MB limit)
3. ✅ **Pre-Chat Custom Fields** - Configurable additional fields
4. ✅ **Rate Limiting** - Prevent spam (10 messages/minute)
5. ✅ **Unread Message Badge** - Show count on minimized widget
6. ✅ **GDPR Compliance** - Optional privacy consent checkbox
7. ✅ **Widget State Persistence** - Remember open/closed state
8. ✅ **Proactive Triggers** - Auto-open based on time/page/exit intent
9. ✅ **Returning Visitor Recognition** - Greet by name if in CRM
10. ✅ **Error Handling** - Graceful failures, retry logic

### Widget Configuration

```javascript
window.bbLiveChatConfig = {
  customerId: "cust_abc123",           // BusinessBlueprint customer ID
  companyName: "Your Company",
  primaryColor: "#F97316",
  position: "bottom-right",
  welcomeMessage: "Hi! How can we help?",
  requireEmail: false,
  enableSound: true,
  
  customFields: [
    { name: "phone", label: "Phone", type: "tel", required: false },
    { name: "company", label: "Company", type: "text", required: false }
  ],
  
  gdprEnabled: false,
  gdprPrivacyUrl: "",
  
  autoOpenDelay: null,
  autoOpenPages: [],
  autoOpenOnExit: false,
  
  fileUploadsEnabled: true,
  maxFileSize: 5242880,
  
  apiEndpoint: "https://livechat.businessblueprint.io"
};
```

---

## CRM INTEGRATION REQUIREMENTS

### /relationships Integration (Default)

**During Installation:**
```
┌────────────────────────────────────────────┐
│ LiveChat Setup - CRM Required              │
├────────────────────────────────────────────┤
│                                            │
│ LiveChat stores conversations but needs   │
│ a CRM to manage your contacts.            │
│                                            │
│ ┌────────────────────────────────────┐   │
│ │ ✓ Use /relationships CRM           │   │
│ │                                    │   │
│ │ FREE Starter Plan:                 │   │
│ │ • 100 contacts                     │   │
│ │ • 1 user                           │   │
│ │ • Basic features                   │   │
│ │ • Ready in 30 seconds              │   │
│ │                                    │   │
│ │ [Install /relationships] ←━━━━━   │   │
│ └────────────────────────────────────┘   │
│                                            │
│ Already have a CRM?                        │
│ [Connect Salesforce]                       │
│ [Connect HubSpot]                          │
│ [Connect Zoho]                             │
│ [Connect via Webhook]                      │
│                                            │
└────────────────────────────────────────────┘
```

**When /relationships is selected:**
1. Check if customer already has /relationships account (same login)
2. If yes: Connect automatically, done
3. If no: Auto-provision FREE /relationships Starter account
4. Store API credentials in `crm_configuration` table
5. Test connection
6. Show success message

**API Integration with /relationships:**

```javascript
// Create/update contact in /relationships
POST https://businessblueprint.io/api/relationships/contacts
Authorization: Bearer {customer_api_key}
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "company": "Acme Inc",
  "source": "livechat",
  "customFields": {
    "initial_page": "https://example.com/pricing",
    "referrer": "https://google.com"
  }
}

Response:
{
  "contactId": "cont_xyz789",
  "status": "created"
}

// Add chat activity to contact
POST https://businessblueprint.io/api/relationships/activities
Authorization: Bearer {customer_api_key}
{
  "contactId": "cont_xyz789",
  "type": "livechat",
  "title": "LiveChat Conversation",
  "description": "Customer inquired about pricing",
  "timestamp": "2026-01-16T10:30:00Z",
  "metadata": {
    "sessionId": "sess_abc123",
    "messageCount": 12,
    "duration": 420
  }
}

// Lookup existing contact
GET https://businessblueprint.io/api/relationships/contacts/lookup?email=john@example.com
Authorization: Bearer {customer_api_key}

Response:
{
  "found": true,
  "contact": {
    "id": "cont_xyz789",
    "name": "John Doe",
    "email": "john@example.com",
    "lifecycleStage": "customer",
    "lastContact": "2026-01-10T14:20:00Z"
  }
}
```

### External CRM Integration

Each CRM adapter implements:

```javascript
class CRMAdapter {
  async authenticate(config) { }
  
  async createContact(visitorData) {
    // Returns CRM contact ID
  }
  
  async updateContact(crmContactId, data) { }
  
  async addActivity(crmContactId, activityData) {
    // Log chat as activity/note in CRM
  }
  
  async lookupContact(email) {
    // Returns contact if exists, null otherwise
  }
}
```

**Required Adapters:**
1. /relationships (default)
2. Salesforce
3. HubSpot
4. Zoho
5. Generic Webhook (for any CRM with API)

---

## INSTALLATION FLOW

### install.sh Script

```bash
#!/bin/bash
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  LiveChat Widget Installation"
echo "  by BusinessBlueprint"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js required"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm required"; exit 1; }

echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install --quiet
echo "✅ Dependencies installed"
echo ""

# Database setup
echo "🗄️  Database Configuration"
read -p "Database type? (1) PostgreSQL (2) SQLite [1]: " db_choice
db_choice=${db_choice:-1}

if [ "$db_choice" = "1" ]; then
    read -p "PostgreSQL host [localhost]: " db_host
    db_host=${db_host:-localhost}
    read -p "PostgreSQL database [livechat]: " db_name
    db_name=${db_name:-livechat}
    read -p "PostgreSQL user [postgres]: " db_user
    db_user=${db_user:-postgres}
    read -sp "PostgreSQL password: " db_pass
    echo ""
    DATABASE_URL="postgresql://${db_user}:${db_pass}@${db_host}:5432/${db_name}"
else
    DATABASE_URL="sqlite:./livechat.db"
fi

# Generate secrets
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Create .env
cat > .env << EOF
PORT=3000
NODE_ENV=production
DATABASE_URL=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET}
CORS_ORIGIN=*
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
EOF

echo "✅ Configuration created"
echo ""

# Run migrations
echo "🔧 Setting up database..."
npm run migrate
echo "✅ Database ready"
echo ""

# CRM Setup
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  CRM Configuration (Required)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "LiveChat requires a CRM to store customer contacts."
echo ""
echo "1) Use /relationships CRM (FREE - Automated setup)"
echo "2) Connect Salesforce"
echo "3) Connect HubSpot"
echo "4) Connect Zoho"
echo "5) Connect via Webhook (Any CRM)"
echo ""
read -p "Select CRM [1]: " crm_choice
crm_choice=${crm_choice:-1}

if [ "$crm_choice" = "1" ]; then
    echo ""
    echo "Setting up /relationships CRM..."
    node installer/relationships-install.js
else
    echo ""
    echo "Manual CRM configuration required."
    echo "After installation, visit: http://localhost:3000/admin/settings"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎉 Installation Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Start server:"
echo "  npm start"
echo ""
echo "Widget URL:"
echo "  http://localhost:3000/widget/livechat-widget.js"
echo ""
echo "Admin Dashboard:"
echo "  http://localhost:3000/admin"
echo ""
```

---

## BACKEND API ENDPOINTS

### Public API (Widget)

**POST /api/sessions**
Create chat session, sync visitor to CRM
```json
Request:
{
  "customerId": "cust_abc123",
  "sessionId": "sess_xyz",
  "visitorName": "John Doe",
  "visitorEmail": "john@example.com",
  "visitorPhone": "555-1234",
  "customFields": { "company": "Acme" },
  "pageUrl": "https://example.com/pricing",
  "pageTitle": "Pricing",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0..."
}

Response:
{
  "sessionId": "sess_xyz",
  "crmContactId": "cont_123",
  "existingContact": true,
  "contactName": "John Doe"
}
```

**POST /api/messages**
Send message, log to CRM activity
```json
Request:
{
  "sessionId": "sess_xyz",
  "direction": "inbound",
  "content": "What are your pricing options?",
  "crmContactId": "cont_123"
}
```

**POST /api/upload**
Upload file attachment
```
multipart/form-data: file, sessionId
Response: { "url": "/uploads/file.jpg" }
```

**POST /api/offline**
Offline message submission
```json
Request:
{
  "visitorName": "John",
  "visitorEmail": "john@example.com",
  "message": "Please call me back",
  "pageUrl": "https://example.com"
}
```

**GET /api/crm/lookup**
Check if visitor exists in CRM
```
?email=john@example.com
Response: { "found": true, "contact": {...} }
```

### Admin API (Agents)

**POST /admin/auth/login**
```json
{ "email": "agent@company.com", "password": "..." }
Response: { "token": "jwt_token", "agent": {...} }
```

**GET /admin/conversations**
List active/recent conversations

**GET /admin/conversations/:sessionId/messages**
Get conversation history

**POST /admin/messages**
Agent sends reply

**PUT /admin/settings**
Update widget configuration

**GET /admin/crm/status**
Check CRM connection health

**PUT /admin/crm/configure**
Update CRM settings

---

## SOCKET.IO EVENTS

### Client → Server

```javascript
socket.emit('join:session', sessionId);
socket.emit('chat:message', { sessionId, message, crmContactId });
socket.emit('typing:start', { sessionId });
socket.emit('typing:stop', { sessionId });
```

### Server → Client

```javascript
socket.on('agent:message', (data) => {
  // { message, agentName, timestamp }
});

socket.on('message:history', (data) => {
  // { messages: [...] }
});

socket.on('message:sent', (data) => {
  // { messageId }
});

socket.on('user:typing', (data) => {
  // { agentName }
});

socket.on('user:stop-typing', () => {});

socket.on('agents:offline', () => {
  // Show offline form
});
```

---

## SECURITY REQUIREMENTS

1. **Input Validation** - Sanitize all inputs, validate email formats
2. **Authentication** - JWT tokens for admin API, bcrypt for passwords
3. **Rate Limiting** - 10 messages/min client-side, 100 req/min server-side
4. **CORS** - Configurable allowed origins
5. **File Uploads** - Validate types/sizes, scan for malware
6. **SQL Injection** - Use parameterized queries
7. **XSS Prevention** - Escape HTML in messages
8. **API Keys** - Encrypt CRM credentials in database
9. **HTTPS Only** - Require SSL in production

---

## ADMIN DASHBOARD

Simple, functional agent interface:

1. **Login Page** - Email/password authentication
2. **Active Conversations** - List of ongoing chats with unread counts
3. **Chat Interface** - Real-time messaging, visitor info sidebar
4. **Settings** - Widget customization, colors, messages, fields
5. **CRM Configuration** - Connect/disconnect CRM, test connection
6. **Analytics** - Conversation counts, response times, common pages

---

## TESTING CHECKLIST

- [ ] Widget loads on any website
- [ ] Welcome form validates properly
- [ ] Messages send/receive in real-time
- [ ] File uploads work (images, PDFs)
- [ ] Offline form submits successfully
- [ ] Rate limiting prevents spam
- [ ] Unread badge shows correctly
- [ ] GDPR consent works (if enabled)
- [ ] Widget state persists across pages
- [ ] Proactive triggers work
- [ ] CRM lookup finds existing contacts
- [ ] New contacts create in CRM automatically
- [ ] Chat activities log to CRM
- [ ] Error handling shows friendly messages
- [ ] Socket reconnects after disconnect
- [ ] Admin can log in
- [ ] Admin can view/respond to chats
- [ ] /relationships integration works
- [ ] External CRM integration works
- [ ] Install script completes successfully

---

## PACKAGE.JSON

```json
{
  "name": "livechat-widget",
  "version": "1.0.0",
  "description": "LiveChat widget by BusinessBlueprint",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js",
    "migrate": "node backend/database/migrate.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.6.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "axios": "^1.6.2",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## OUTPUT REQUIREMENTS

Generate ALL files in proper structure:
1. Complete and functional code
2. Well-commented
3. Production-ready
4. Following best practices

Build in this order:
1. Database schema
2. Backend server
3. Socket.IO service
4. CRM adapters (/relationships + external)
5. API routes
6. Widget JavaScript
7. Admin dashboard
8. Installation scripts
9. Documentation

---

## FINAL NOTES

- Widget works ONLY with external CRM connected
- /relationships is the default, easiest option
- All visitor data flows to CRM immediately
- LiveChat database stores ONLY: sessions, messages, settings, agent assignments
- Installation must be simple: one command, 5 minutes max
- Code must be clean, documented, maintainable
- Security is critical
- All 10 enhanced features must be implemented

**Now generate the complete LiveChat widget system.**
