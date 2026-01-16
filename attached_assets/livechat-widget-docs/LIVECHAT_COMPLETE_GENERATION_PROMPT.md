# COMPLETE STANDALONE LIVECHAT WIDGET - GENERATION PROMPT

---

## INTRODUCTION

### What This Prompt Does
This is a comprehensive generation prompt that creates a complete, production-ready standalone LiveChat widget system from scratch. When you provide this prompt to an AI coding assistant (Claude, Cursor, Replit AI, etc.), it will generate:

- A fully functional LiveChat widget (JavaScript)
- Complete backend server (Node.js + Express + Socket.IO)
- Database schema (PostgreSQL or SQLite)
- CRM integration adapters (Salesforce, HubSpot, Zoho, BusinessBlueprint, Generic Webhook)
- Admin dashboard (HTML/CSS/JS)
- One-command installation script
- Complete documentation

### How To Use This Prompt
1. Copy this entire prompt (from top to bottom)
2. Paste it into your AI coding assistant (Claude, Cursor, etc.)
3. The AI will generate all files in the proper structure
4. Download/save the generated files
5. Run the installer: `./install.sh`
6. Your LiveChat system is ready to deploy

### What Makes This System Special
**Standalone Architecture:**
- Works independently with its own backend and database
- NO external dependencies required to function
- Stores all conversations in its own database
- Can be deployed on any server

**Universal CRM Integration:**
- Integrates OPTIONALLY with ANY CRM
- Includes pre-built adapters for Salesforce, HubSpot, Zoho, BusinessBlueprint
- Generic webhook adapter for custom CRMs
- CRM integration is completely optional - widget works perfectly without it

**Production-Ready Features:**
- All 10 enhanced features fully implemented (offline messages, file uploads, rate limiting, etc.)
- Security best practices (JWT auth, input validation, rate limiting, XSS prevention)
- Real-time messaging via Socket.IO
- Mobile responsive design
- Error handling and retry logic

**Super Easy Installation:**
- One-command installer: `./install.sh`
- 5-minute setup time
- Interactive configuration wizard
- Supports PostgreSQL or SQLite
- Creates default admin account

### System Requirements
- Node.js 16+
- npm 8+
- PostgreSQL 12+ OR SQLite 3+
- 512MB RAM minimum
- 1GB disk space

### Target Use Cases
This system is designed to be:
1. **Sold as standalone product** - customers install on their own servers
2. **Part of CommVerse bundle** - one of 6 apps in the subscription
3. **White-labeled** - fully customizable branding
4. **Self-hosted** - complete ownership and control
5. **CRM-agnostic** - works with any CRM or standalone

---

## YOUR TASK

You are an expert full-stack developer tasked with building a complete, production-ready standalone LiveChat widget system.

**CRITICAL: DO NOT START CODING YET.**

### Step 1: Present Your Plan for Approval

Before writing ANY code, you MUST present:

1. **Complete File Structure Tree**
   - Show every file you'll create
   - Organize by directory
   - Include file sizes estimate (small/medium/large)

2. **Technology Stack**
   - Backend: Node.js version, frameworks, key dependencies
   - Database: PostgreSQL vs SQLite recommendation with reasoning
   - Frontend: Vanilla JS or any libraries needed
   - Real-time: Socket.IO version
   - File storage: Local vs cloud recommendation

3. **Implementation Order**
   - Which components you'll build first
   - Dependencies between components
   - Estimated time per component

4. **Estimated Scope**
   - Total number of files
   - Approximate total lines of code
   - Database tables count

5. **Questions & Clarifications**
   - Any ambiguities in requirements
   - Assumptions you're making
   - Options that need decisions

**Present this plan and WAIT for explicit approval before proceeding.**

### Step 2: After Approval, Build According to Specifications Below

---

## SYSTEM OVERVIEW

Create a self-contained LiveChat widget that:
- Works independently with its own backend and database
- Integrates optionally with ANY CRM (Salesforce, HubSpot, Zoho, BusinessBlueprint /relationships, or custom webhooks)
- Can be installed in 5 minutes with a single command
- Requires NO dependencies on external platforms to function
- Stores all conversations in its own database
- Syncs to external CRMs only if customer chooses to enable integration

---

## ARCHITECTURE

```
Customer Website → Widget (JavaScript) → Standalone Backend (Node.js + Socket.IO) → Built-in Database (PostgreSQL/SQLite)
                                                    ↓ (Optional)
                                            CRM Integrations (Salesforce, HubSpot, Zoho, BusinessBlueprint, Webhook)
```

---

## REQUIRED FILE STRUCTURE

```
livechat-standalone/
├── README.md
├── INSTALLATION.md
├── package.json
├── .env.example
├── .gitignore
├── install.sh                          (One-command installer script)
│
├── frontend/
│   ├── widget/
│   │   └── livechat-widget.js          (Embeddable widget - complete with ALL features)
│   │
│   └── admin/
│       ├── index.html                   (Admin dashboard)
│       ├── login.html                   (Admin login)
│       ├── settings.html                (Widget settings)
│       └── integrations.html            (CRM integration setup)
│
├── backend/
│   ├── server.js                        (Main Express + Socket.IO server)
│   │
│   ├── config/
│   │   ├── database.js                  (Database connection)
│   │   └── socket.js                    (Socket.IO initialization)
│   │
│   ├── routes/
│   │   ├── api/
│   │   │   ├── sessions.js              (POST /api/sessions - create chat session)
│   │   │   ├── messages.js              (Message endpoints)
│   │   │   ├── upload.js                (POST /api/upload - file uploads)
│   │   │   ├── offline.js               (POST /api/offline - offline messages)
│   │   │   └── settings.js              (Widget settings)
│   │   │
│   │   ├── admin/
│   │   │   ├── auth.js                  (Admin authentication)
│   │   │   ├── conversations.js         (View all chats)
│   │   │   ├── agents.js                (Manage agents)
│   │   │   └── analytics.js             (Stats)
│   │   │
│   │   └── crm/
│   │       ├── index.js                 (CRM router)
│   │       ├── lookup.js                (GET /api/crm/lookup - check if contact exists)
│   │       ├── salesforce.js            (Salesforce adapter)
│   │       ├── hubspot.js               (HubSpot adapter)
│   │       ├── zoho.js                  (Zoho adapter)
│   │       ├── businessblueprint.js     (BusinessBlueprint /relationships adapter)
│   │       └── webhook.js               (Generic webhook adapter)
│   │
│   ├── models/
│   │   ├── Conversation.js
│   │   ├── Message.js
│   │   ├── Visitor.js
│   │   ├── Agent.js
│   │   ├── WidgetSettings.js
│   │   └── CRMIntegration.js
│   │
│   ├── services/
│   │   ├── socketService.js             (Socket.IO event handlers)
│   │   ├── emailService.js              (Email notifications for offline messages)
│   │   ├── crmSyncService.js            (Auto-sync to CRM)
│   │   └── fileStorageService.js        (File upload handling)
│   │
│   ├── middleware/
│   │   ├── auth.js                      (JWT authentication)
│   │   ├── rateLimit.js                 (Rate limiting)
│   │   └── validation.js                (Input validation)
│   │
│   └── database/
│       ├── migrations/
│       │   └── 001_initial_schema.sql
│       └── seeds/
│           └── default_admin.js
│
└── docker-compose.yml                   (Optional Docker deployment)
```

---

## DATABASE SCHEMA

Create these PostgreSQL tables:

```sql
-- conversations
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    visitor_id INTEGER REFERENCES visitors(id),
    agent_id INTEGER REFERENCES agents(id),
    status VARCHAR(50) DEFAULT 'active',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    last_message_at TIMESTAMP,
    crm_synced BOOLEAN DEFAULT FALSE,
    crm_contact_id VARCHAR(255),
    metadata JSONB
);

-- messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    direction VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    from_name VARCHAR(255),
    from_email VARCHAR(255),
    agent_id INTEGER REFERENCES agents(id),
    message_type VARCHAR(50) DEFAULT 'text',
    file_url VARCHAR(500),
    file_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    metadata JSONB
);

-- visitors
CREATE TABLE visitors (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    custom_fields JSONB,
    page_url TEXT,
    page_title TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address VARCHAR(45),
    first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP,
    total_conversations INTEGER DEFAULT 0,
    crm_contact_id VARCHAR(255),
    crm_type VARCHAR(50),
    metadata JSONB
);

-- agents
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'agent',
    avatar_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'online',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    settings JSONB
);

-- widget_settings
CREATE TABLE widget_settings (
    id SERIAL PRIMARY KEY,
    widget_id VARCHAR(255) UNIQUE NOT NULL,
    company_name VARCHAR(255) DEFAULT 'Support Team',
    primary_color VARCHAR(7) DEFAULT '#F97316',
    position VARCHAR(20) DEFAULT 'bottom-right',
    welcome_message TEXT DEFAULT 'Hi! How can we help you today?',
    require_email BOOLEAN DEFAULT FALSE,
    enable_sound BOOLEAN DEFAULT TRUE,
    custom_fields JSONB,
    offline_message TEXT,
    gdpr_enabled BOOLEAN DEFAULT FALSE,
    gdpr_privacy_url TEXT,
    auto_open_delay INTEGER,
    auto_open_pages TEXT[],
    working_hours JSONB,
    file_uploads_enabled BOOLEAN DEFAULT TRUE,
    max_file_size INTEGER DEFAULT 5242880,
    allowed_file_types TEXT[] DEFAULT ARRAY['image/*', '.pdf', '.doc', '.docx'],
    rate_limit_messages INTEGER DEFAULT 10,
    rate_limit_window INTEGER DEFAULT 60,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- crm_integrations
CREATE TABLE crm_integrations (
    id SERIAL PRIMARY KEY,
    crm_type VARCHAR(50) NOT NULL,
    is_enabled BOOLEAN DEFAULT FALSE,
    api_key VARCHAR(500),
    api_secret VARCHAR(500),
    instance_url VARCHAR(500),
    webhook_url VARCHAR(500),
    sync_direction VARCHAR(20) DEFAULT 'bidirectional',
    sync_contacts BOOLEAN DEFAULT TRUE,
    sync_conversations BOOLEAN DEFAULT TRUE,
    auto_sync BOOLEAN DEFAULT TRUE,
    field_mapping JSONB,
    last_sync TIMESTAMP,
    sync_status VARCHAR(50) DEFAULT 'idle',
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- offline_messages
CREATE TABLE offline_messages (
    id SERIAL PRIMARY KEY,
    visitor_name VARCHAR(255),
    visitor_email VARCHAR(255) NOT NULL,
    visitor_phone VARCHAR(50),
    message TEXT NOT NULL,
    page_url TEXT,
    status VARCHAR(50) DEFAULT 'new',
    replied_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_conversations_visitor ON conversations(visitor_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_visitors_email ON visitors(email);
CREATE INDEX idx_visitors_crm_contact ON visitors(crm_contact_id);
```

---

## WIDGET FEATURES (livechat-widget.js)

The widget MUST include ALL of these features:

### Core Features
1. Chat bubble UI with customizable position and colors
2. Welcome form with name and email collection
3. Real-time messaging via Socket.IO
4. Message history persistence
5. Typing indicators (both directions)
6. Sound notifications
7. Connection status indicator
8. Mobile responsive design

### Enhanced Features (ALL REQUIRED)
1. **Offline Message Collection**
   - Show offline form when no agents available
   - Collect visitor info + message
   - Send email notification to admin
   - API: POST /api/offline

2. **File Upload Support**
   - Allow image/document uploads
   - 5MB size limit (configurable)
   - Display files inline in chat
   - API: POST /api/upload

3. **Pre-Chat Custom Fields**
   - Configurable custom fields (phone, company, etc.)
   - Field validation
   - Store in visitor.custom_fields

4. **Rate Limiting / Spam Prevention**
   - Client-side: Max 10 messages per minute
   - Server-side: Rate limit by IP
   - Block spam attempts

5. **Unread Message Badge**
   - Show count on minimized widget
   - Clear on open
   - Red badge with number

6. **GDPR Compliance**
   - Optional privacy policy consent
   - Checkbox before starting chat
   - Link to privacy policy

7. **Widget State Persistence**
   - Remember if widget was open
   - Restore state across page navigation
   - 30-minute expiry

8. **Proactive Chat Triggers**
   - Auto-open after X seconds
   - Auto-open on specific pages
   - Exit intent trigger

9. **CRM Integration Hook**
   - Check if returning visitor: GET /api/crm/lookup?email=
   - Show personalized greeting if found
   - Auto-sync new contacts

10. **Error Handling & Retry Logic**
    - Graceful network failure handling
    - Auto-reconnect with exponential backoff
    - Show error messages to user
    - Max 3 retry attempts

### Widget Configuration Options

```javascript
window.bbLiveChatConfig = {
  clientId: "1",
  companyName: "Your Company",
  primaryColor: "#F97316",
  position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
  welcomeMessage: "Hi! How can we help you today?",
  requireEmail: false,
  enableSound: true,
  
  // Custom fields
  customFields: [
    { name: "phone", label: "Phone Number", type: "tel", required: false },
    { name: "company", label: "Company", type: "text", required: false }
  ],
  
  // GDPR
  gdprEnabled: false,
  gdprPrivacyUrl: "https://yoursite.com/privacy",
  
  // Proactive triggers
  autoOpenDelay: 30000, // 30 seconds
  autoOpenPages: ["/pricing", "/checkout"],
  autoOpenOnExit: false,
  
  // File uploads
  fileUploadsEnabled: true,
  maxFileSize: 5242880, // 5MB
  allowedFileTypes: ["image/*", ".pdf", ".doc", ".docx"],
  
  // Rate limiting
  rateLimitMessages: 10,
  rateLimitWindow: 60, // seconds
  
  // API endpoint (optional override)
  apiEndpoint: "https://your-server.com"
};
```

---

## BACKEND API ENDPOINTS

### Public API (for widget)

**POST /api/sessions**
Create new chat session
```json
Request: {
  "clientId": "1",
  "sessionId": "uuid",
  "visitorName": "John Doe",
  "visitorEmail": "john@example.com",
  "customFields": { "phone": "555-1234" },
  "pageUrl": "https://example.com/page",
  "pageTitle": "Page Title",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0..."
}
Response: {
  "success": true,
  "sessionId": "uuid",
  "conversationId": 123
}
```

**POST /api/upload**
Upload file
```
Request: multipart/form-data with file
Response: {
  "success": true,
  "url": "/uploads/filename.jpg",
  "fileName": "filename.jpg"
}
```

**POST /api/offline**
Submit offline message
```json
Request: {
  "visitorName": "John",
  "visitorEmail": "john@example.com",
  "message": "I need help with...",
  "pageUrl": "https://example.com"
}
Response: {
  "success": true,
  "messageId": 456
}
```

**GET /api/crm/lookup**
Look up visitor in CRM
```
Request: ?email=john@example.com
Response: {
  "found": true,
  "contact": {
    "id": "123",
    "firstName": "John",
    "lastName": "Doe",
    "lifecycleStage": "customer"
  },
  "source": "salesforce"
}
```

### Admin API (requires JWT auth)

**POST /admin/api/auth/login**
Admin login
```json
Request: { "email": "admin@example.com", "password": "password" }
Response: { "token": "jwt_token", "agent": {...} }
```

**GET /admin/api/conversations**
List all conversations
```
Response: {
  "conversations": [
    {
      "id": 1,
      "visitorName": "John",
      "status": "active",
      "lastMessageAt": "2024-01-16T10:30:00Z",
      "unreadCount": 2
    }
  ]
}
```

**GET /admin/api/conversations/:id/messages**
Get messages for conversation
```
Response: {
  "messages": [...]
}
```

**POST /admin/api/settings**
Update widget settings
```json
Request: {
  "companyName": "My Company",
  "primaryColor": "#0000FF",
  ...
}
```

**GET /admin/api/integrations**
List CRM integrations
```
Response: {
  "integrations": [
    { "crm_type": "salesforce", "is_enabled": true },
    { "crm_type": "hubspot", "is_enabled": false }
  ]
}
```

**PUT /admin/api/integrations/:type**
Configure CRM integration
```json
Request: {
  "is_enabled": true,
  "api_key": "...",
  "api_secret": "...",
  "instance_url": "...",
  "field_mapping": { ... }
}
```

---

## SOCKET.IO EVENTS

### Client → Server

**join:session**
```javascript
socket.emit('join:session', sessionId);
```

**join:conversation**
```javascript
socket.emit('join:conversation', conversationId);
```

**chat:message**
```javascript
socket.emit('chat:message', {
  sessionId: "uuid",
  conversationId: 123,
  message: "Hello",
  visitorName: "John",
  visitorEmail: "john@example.com",
  clientId: "1"
});
```

**typing:start**
```javascript
socket.emit('typing:start', {
  conversationId: 123,
  name: "John"
});
```

**typing:stop**
```javascript
socket.emit('typing:stop', {
  conversationId: 123
});
```

### Server → Client

**agent:message**
```javascript
socket.on('agent:message', (data) => {
  // data = { id, message, agentName, timestamp }
});
```

**message:history**
```javascript
socket.on('message:history', (data) => {
  // data = { messages: [...] }
});
```

**message:sent**
```javascript
socket.on('message:sent', (data) => {
  // data = { messageId, conversationId }
});
```

**user:typing**
```javascript
socket.on('user:typing', (data) => {
  // data = { name: "Agent Name" }
});
```

**user:stop-typing**
```javascript
socket.on('user:stop-typing', () => {
  // Hide typing indicator
});
```

**agents:offline**
```javascript
socket.on('agents:offline', () => {
  // Show offline form
});
```

---

## CRM INTEGRATION ADAPTERS

Each CRM adapter must implement:

```javascript
class CRMAdapter {
  // Authenticate with CRM
  async authenticate(integration) { }
  
  // Sync visitor to CRM contact
  async syncContact(visitor, integration) {
    // Return CRM contact ID
  }
  
  // Sync message to CRM activity/note
  async syncMessage(message, conversation, integration) { }
  
  // Look up contact by email
  async lookupContact(email, integration) {
    // Return contact object or null
  }
}
```

### Required Adapters:

1. **Salesforce** (services/crm/salesforceAdapter.js)
   - Use OAuth or API key authentication
   - Create/update Lead or Contact
   - Create Task for each message
   - Query API for contact lookup

2. **HubSpot** (services/crm/hubspotAdapter.js)
   - Use Bearer token authentication
   - Create/update Contact
   - Create Engagement (Note) for messages
   - Search API for contact lookup

3. **Zoho** (services/crm/zohoAdapter.js)
   - Use OAuth authentication
   - Create/update Contact
   - Create Note for messages
   - Search API for contact lookup

4. **BusinessBlueprint** (services/crm/businessblueprintAdapter.js)
   - Use Bearer token to BusinessBlueprint API
   - POST to /api/relationships/contacts
   - POST to /api/relationships/activities
   - GET from /api/relationships/contacts/lookup

5. **Generic Webhook** (services/crm/webhookAdapter.js)
   - POST visitor data to custom webhook URL
   - POST message data to custom webhook URL
   - Support custom field mapping

---

## INSTALLATION SYSTEM

### One-Command Installer (install.sh)

```bash
#!/bin/bash
echo "🚀 LiveChat Standalone Installer"
echo "================================"

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "❌ Node.js required"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm required"; exit 1; }

echo "✅ Node.js $(node -v) detected"
echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Database setup
echo "🗄️  Database setup..."
read -p "Database type? (1) PostgreSQL (2) SQLite: " db_choice

if [ "$db_choice" = "1" ]; then
    read -p "PostgreSQL host [localhost]: " db_host
    db_host=${db_host:-localhost}
    read -p "PostgreSQL port [5432]: " db_port
    db_port=${db_port:-5432}
    read -p "Database name [livechat]: " db_name
    db_name=${db_name:-livechat}
    read -p "Username [postgres]: " db_user
    db_user=${db_user:-postgres}
    read -sp "Password: " db_pass
    echo ""
    DATABASE_URL="postgresql://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}"
else
    DATABASE_URL="sqlite:./livechat.db"
fi

# Generate JWT secret
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
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@yourdomain.com
EOF

echo "✅ Configuration created"

# Run migrations
echo "🔧 Running database migrations..."
npm run migrate

# Create admin
echo "👤 Creating admin account..."
read -p "Admin email: " admin_email
read -sp "Admin password: " admin_pass
echo ""

npm run create-admin -- --email="${admin_email}" --password="${admin_pass}"

echo ""
echo "🎉 Installation complete!"
echo ""
echo "Start server: npm start"
echo "Widget URL: http://localhost:3000/widget/livechat-widget.js"
echo "Admin Dashboard: http://localhost:3000/admin"
echo ""
```

### package.json

```json
{
  "name": "livechat-standalone",
  "version": "1.0.0",
  "description": "Standalone LiveChat widget with universal CRM integration",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js",
    "migrate": "node backend/database/migrate.js",
    "create-admin": "node backend/scripts/createAdmin.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.6.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "morgan": "^1.10.0",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "axios": "^1.6.2",
    "nodemailer": "^6.9.7",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## SECURITY REQUIREMENTS

1. **Input Validation**
   - Sanitize all user inputs
   - Validate email formats
   - Escape HTML in messages
   - Validate file types and sizes

2. **Authentication**
   - JWT tokens for admin API
   - Bcrypt for password hashing
   - Secure session management

3. **Rate Limiting**
   - Client-side: 10 messages/minute
   - Server-side: 100 requests/minute per IP
   - File uploads: 5 files/minute

4. **CORS**
   - Configurable CORS origin
   - Default to allow all (customizable)

5. **File Uploads**
   - Validate file types
   - Scan for malware (optional)
   - Store outside web root
   - Serve with proper headers

6. **SQL Injection Prevention**
   - Use parameterized queries
   - Use ORM/query builder

7. **XSS Prevention**
   - Escape all HTML output
   - Content Security Policy headers

---

## ADMIN DASHBOARD REQUIREMENTS

Create a simple, functional admin dashboard with:

1. **Login Page** (login.html)
   - Email/password form
   - JWT authentication
   - Remember me option

2. **Conversations List** (index.html)
   - List all active/closed conversations
   - Show visitor name, last message, timestamp
   - Unread message count
   - Filter by status
   - Click to open conversation

3. **Chat Interface**
   - Real-time message view
   - Send messages as agent
   - View visitor info sidebar
   - File attachment support
   - Typing indicators

4. **Settings Page** (settings.html)
   - Widget customization
   - Colors, position, welcome message
   - Custom fields configuration
   - Working hours
   - File upload settings

5. **Integrations Page** (integrations.html)
   - List all available CRM integrations
   - Enable/disable toggle
   - Configuration forms for each CRM
   - Test connection button
   - Sync status

6. **Analytics Dashboard**
   - Total conversations
   - Response times
   - Most active pages
   - Customer satisfaction

---

## TESTING CHECKLIST

Before considering complete, test:

- [ ] Widget loads on any website
- [ ] Welcome form validation works
- [ ] Messages send and receive in real-time
- [ ] File uploads work
- [ ] Offline form submits successfully
- [ ] Rate limiting prevents spam
- [ ] Unread badge shows/hides correctly
- [ ] GDPR consent works if enabled
- [ ] Widget state persists across pages
- [ ] Proactive triggers work
- [ ] CRM lookup finds existing contacts
- [ ] Error handling shows user-friendly messages
- [ ] Socket reconnects after disconnect
- [ ] Admin can log in
- [ ] Admin can view conversations
- [ ] Admin can send messages
- [ ] Admin can configure widget
- [ ] CRM integration can be enabled
- [ ] Salesforce sync works
- [ ] HubSpot sync works
- [ ] BusinessBlueprint sync works
- [ ] Install script completes successfully

---

## OUTPUT FORMAT

Generate ALL files in proper structure. Each file should be:
1. Complete and functional
2. Well-commented
3. Following best practices
4. Production-ready

Start with:
1. Database schema
2. Backend server
3. Socket.IO service
4. API routes
5. CRM adapters
6. Widget JavaScript
7. Admin dashboard
8. Installation scripts
9. Documentation

---

## FINAL NOTES

- This is a COMPLETE, STANDALONE system
- It must work WITHOUT any external dependencies to function
- CRM integration is OPTIONAL - widget works perfectly without it
- Installation must be SIMPLE - one command or 5 minutes max
- Code must be CLEAN, DOCUMENTED, and MAINTAINABLE
- Security must be ROBUST - no shortcuts
- All 10 enhanced features must be FULLY IMPLEMENTED

Now generate the complete LiveChat standalone system.
