# BUILD / chat - COMPLETE SAAS PLATFORM

## CRITICAL: READ BEFORE STARTING

You are building a **complete, production-ready SaaS live chat platform** for BusinessBlueprint.io.

**STOP. Before writing ANY code:**

1. Present your complete implementation plan
2. List every file you will create (full tree)
3. Confirm your technology choices
4. Ask any clarifying questions
5. **WAIT FOR EXPLICIT APPROVAL**

**DO NOT write code until told to proceed.**

---

## WHAT YOU'RE BUILDING

**/ chat** is a Zendesk-style hosted live chat service. BusinessBlueprint hosts everything. Customers (companies) embed a widget on their website, and their visitors chat through it. All data is stored on BusinessBlueprint's servers.

### Product Details:
- **Name:** / chat
- **Pricing:** $29/mo standalone OR $24.75/mo in CommVerse bundle
- **Model:** SaaS (BusinessBlueprint hosts everything)
- **Architecture:** Multi-tenant (each company's data completely isolated)

### How It Works:

```
Visitor on Customer's Website
    ↓ (starts chat)
/ chat Widget (embedded JavaScript)
    ↓ (WebSocket connection)
BusinessBlueprint.io Server (YOU host this)
    ↓ (stores all data)
BusinessBlueprint.io Database
    ↓ (syncs contacts)
Customer's / relationships CRM Account
```

### Key Points:
- BusinessBlueprint hosts the widget, backend, database, admin dashboard
- Customers just embed a script tag on their website
- Customers log into BusinessBlueprint.io to respond to chats
- All visitor contacts auto-sync to customer's / relationships CRM
- Each company is completely isolated (multi-tenant)
- BusinessBlueprint collects anonymized behavioral analytics (no PII)

---

## CUSTOMER FLOW

### 1. Purchase:
- Company buys / chat ($29/mo) on BusinessBlueprint.io
- Requires BusinessBlueprint.io account

### 2. Setup:
- Customer goes to dashboard
- Gets embed code:
```html
<script>
  window.bbChatConfig = {
    customerId: "cust_abc123"
  };
</script>
<script src="https://businessblueprint.io/chat/widget.js" async></script>
```
- Adds to their website

### 3. CRM Connection:
- During setup, customer connects CRM
- Default option: FREE / relationships Starter (100 contacts, 1 user)
- Or upgrade to / relationships Performance ($29/mo) for unlimited
- All chat visitors automatically become contacts in their CRM

### 4. Usage:
- Visitors chat on customer's website
- Customer responds via BusinessBlueprint.io dashboard
- All conversations stored
- All contacts synced to / relationships

---

## MULTI-TENANT DATA ISOLATION

**CRITICAL: Companies never see each other's data.**

```
BusinessBlueprint.io Platform
│
├─ Acme Corp's Account
│  ├─ Acme's widget settings
│  ├─ Acme's conversations
│  ├─ Acme's / relationships CRM
│  │  ├─ John (Acme's visitor)
│  │  ├─ Sarah (Acme's visitor)
│  │  └─ Mike (Acme's visitor)
│  └─ Acme's analytics
│
├─ TechStart Inc's Account
│  ├─ TechStart's widget settings
│  ├─ TechStart's conversations
│  ├─ TechStart's / relationships CRM
│  │  ├─ Lisa (TechStart's visitor)
│  │  └─ David (TechStart's visitor)
│  └─ TechStart's analytics
│
└─ [Other companies - completely isolated]
```

**BusinessBlueprint (platform owner) can see:**
- Aggregated, anonymized analytics (conversation counts, response times, peak hours)
- System metrics (performance, errors)
- NO individual company data, NO PII, NO conversation contents

---

## FILE STRUCTURE

Build exactly this structure:

```
/ chat/
├── package.json
├── .env.example
├── README.md
│
├── server/
│   ├── index.js                      # Main Express + Socket.IO server
│   ├── config/
│   │   ├── database.js               # PostgreSQL connection
│   │   ├── socket.js                 # Socket.IO configuration
│   │   └── redis.js                  # Redis for sessions/presence
│   │
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication
│   │   ├── tenantIsolation.js        # Multi-tenant data isolation
│   │   ├── rateLimit.js              # Rate limiting
│   │   └── validation.js             # Input validation
│   │
│   ├── routes/
│   │   ├── widget/
│   │   │   ├── sessions.js           # POST /api/widget/sessions
│   │   │   ├── messages.js           # POST /api/widget/messages
│   │   │   └── upload.js             # POST /api/widget/upload
│   │   │
│   │   ├── dashboard/
│   │   │   ├── auth.js               # POST /api/dashboard/login
│   │   │   ├── conversations.js      # GET /api/dashboard/conversations
│   │   │   ├── messages.js           # POST /api/dashboard/messages
│   │   │   ├── settings.js           # GET/PUT /api/dashboard/settings
│   │   │   └── analytics.js          # GET /api/dashboard/analytics
│   │   │
│   │   └── admin/
│   │       ├── customers.js          # Platform admin routes
│   │       └── analytics.js          # Aggregated platform analytics
│   │
│   ├── services/
│   │   ├── socketService.js          # Real-time messaging
│   │   ├── crmSyncService.js         # Sync to / relationships
│   │   ├── analyticsService.js       # Track anonymized behaviors
│   │   ├── notificationService.js    # Email/push notifications
│   │   └── fileStorageService.js     # Handle uploads
│   │
│   ├── models/
│   │   ├── Customer.js               # Companies using / chat
│   │   ├── Conversation.js           # Chat sessions
│   │   ├── Message.js                # Individual messages
│   │   ├── Visitor.js                # Website visitors
│   │   ├── Agent.js                  # Customer's team members
│   │   └── WidgetSettings.js         # Per-customer widget config
│   │
│   └── database/
│       ├── migrations/
│       │   ├── 001_customers.sql
│       │   ├── 002_conversations.sql
│       │   ├── 003_messages.sql
│       │   ├── 004_visitors.sql
│       │   ├── 005_agents.sql
│       │   └── 006_widget_settings.sql
│       └── seeds/
│           └── demo_customer.sql
│
├── widget/
│   ├── src/
│   │   ├── widget.js                 # Main widget JavaScript
│   │   ├── ui.js                     # UI components
│   │   ├── socket.js                 # Socket.IO client
│   │   ├── storage.js                # LocalStorage handling
│   │   └── styles.css                # Widget styles
│   ├── build/
│   │   └── widget.min.js             # Bundled widget (served to customers)
│   └── webpack.config.js             # Widget bundler
│
├── dashboard/
│   ├── public/
│   │   ├── index.html                # Dashboard SPA entry
│   │   └── assets/
│   │       ├── css/
│   │       └── images/
│   └── src/
│       ├── App.js                    # Main React/Vue app
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Conversations.js      # List all chats
│       │   ├── Chat.js               # Individual conversation
│       │   ├── Settings.js           # Widget customization
│       │   └── Analytics.js          # Usage stats
│       ├── components/
│       │   ├── ConversationList.js
│       │   ├── ChatWindow.js
│       │   ├── MessageBubble.js
│       │   ├── VisitorInfo.js
│       │   └── WidgetPreview.js
│       └── services/
│           ├── api.js
│           └── socket.js
│
└── scripts/
    ├── migrate.js                    # Run database migrations
    └── seed.js                       # Seed demo data
```

---

## DATABASE SCHEMA

### customers (Companies using / chat)
```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_blueprint_id VARCHAR(255) UNIQUE NOT NULL,  -- Links to BB account
    company_name VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'standard',                 -- standard, bundle
    relationships_crm_id VARCHAR(255),                   -- Their CRM account ID
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### widget_settings (Per-customer widget configuration)
```sql
CREATE TABLE widget_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    company_name VARCHAR(255) DEFAULT 'Support',
    welcome_message TEXT DEFAULT 'Hi! How can we help you today?',
    primary_color VARCHAR(7) DEFAULT '#0000FF',
    position VARCHAR(20) DEFAULT 'bottom-right',
    require_email BOOLEAN DEFAULT false,
    enable_sound BOOLEAN DEFAULT true,
    offline_message TEXT DEFAULT 'We''re offline. Leave a message!',
    custom_fields JSONB DEFAULT '[]',
    business_hours JSONB,
    gdpr_enabled BOOLEAN DEFAULT false,
    gdpr_text TEXT,
    auto_open_delay INTEGER,                             -- Seconds
    proactive_message TEXT,
    proactive_delay INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id)
);
```

### agents (Customer's team members who respond to chats)
```sql
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(50) DEFAULT 'agent',                    -- agent, admin
    status VARCHAR(50) DEFAULT 'offline',                -- online, away, offline
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id, email)
);
```

### visitors (People chatting on customer's website)
```sql
CREATE TABLE visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    custom_fields JSONB,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address VARCHAR(45),
    crm_contact_id VARCHAR(255),                         -- Synced to / relationships
    first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP,
    total_conversations INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX(customer_id, email),
    INDEX(customer_id, session_id)
);
```

### conversations (Chat sessions)
```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    visitor_id UUID REFERENCES visitors(id),
    assigned_agent_id UUID REFERENCES agents(id),
    status VARCHAR(50) DEFAULT 'active',                 -- active, closed, archived
    channel VARCHAR(50) DEFAULT 'widget',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    last_message_at TIMESTAMP,
    unread_count INTEGER DEFAULT 0,
    rating INTEGER,                                      -- 1-5 stars
    tags JSONB DEFAULT '[]',
    metadata JSONB,
    INDEX(customer_id, status),
    INDEX(customer_id, last_message_at)
);
```

### messages (Individual chat messages)
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL,                    -- visitor, agent, system
    sender_id UUID,                                      -- visitor_id or agent_id
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text',             -- text, file, image, system
    file_url VARCHAR(500),
    file_name VARCHAR(255),
    file_size INTEGER,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX(conversation_id, created_at)
);
```

### analytics_events (Anonymized behavioral data)
```sql
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,                    -- widget_opened, message_sent, etc.
    event_data JSONB,                                    -- Anonymized data only
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX(customer_id, event_type, created_at)
);
```

---

## WIDGET FEATURES

The embeddable widget must include:

### Core Features:
1. **Chat bubble** - Customizable position (bottom-right, bottom-left)
2. **Chat window** - Opens on click
3. **Welcome form** - Name, email (optional), custom fields
4. **Real-time messaging** - Via Socket.IO
5. **Typing indicators** - Both directions
6. **Sound notifications** - Configurable
7. **Message history** - Persists across page navigation
8. **Mobile responsive** - Works on all devices

### Enhanced Features:
1. **Offline message form** - When no agents available
2. **File uploads** - Images, PDFs, documents (5MB limit)
3. **Pre-chat custom fields** - Configurable by customer
4. **Rate limiting** - 10 messages/minute per visitor
5. **Unread badge** - Shows count when minimized
6. **GDPR consent** - Optional checkbox before starting chat
7. **Session persistence** - Remember visitor across pages
8. **Proactive triggers** - Auto-open after X seconds or on exit intent
9. **Returning visitor** - Greet by name if recognized
10. **Error handling** - Graceful failures with retry logic

### Widget Configuration:
```javascript
window.bbChatConfig = {
  customerId: "cust_abc123"
  // All other settings loaded from server based on customerId
};
```

---

## SOCKET.IO EVENTS

### Widget → Server:
```javascript
// Visitor joins
socket.emit('visitor:join', { sessionId, customerId });

// Visitor sends message
socket.emit('visitor:message', { conversationId, content });

// Visitor typing
socket.emit('visitor:typing', { conversationId });
socket.emit('visitor:stop_typing', { conversationId });

// Visitor uploads file
socket.emit('visitor:upload', { conversationId, file });
```

### Server → Widget:
```javascript
// Agent message
socket.on('agent:message', { conversationId, content, agentName });

// Agent typing
socket.on('agent:typing', { conversationId, agentName });
socket.on('agent:stop_typing', { conversationId });

// Agent assigned
socket.on('agent:assigned', { conversationId, agentName, agentAvatar });

// Connection status
socket.on('agents:online');
socket.on('agents:offline');
```

### Dashboard → Server:
```javascript
// Agent joins
socket.emit('agent:join', { agentId, customerId });

// Agent sends message
socket.emit('agent:message', { conversationId, content });

// Agent typing
socket.emit('agent:typing', { conversationId });

// Agent assigns conversation
socket.emit('agent:assign', { conversationId, agentId });

// Agent closes conversation
socket.emit('agent:close', { conversationId });
```

### Server → Dashboard:
```javascript
// New conversation
socket.on('conversation:new', { conversation, visitor });

// Visitor message
socket.on('visitor:message', { conversationId, content });

// Visitor typing
socket.on('visitor:typing', { conversationId });

// Visitor went offline
socket.on('visitor:offline', { conversationId });
```

---

## CRM SYNC (/ relationships)

When a visitor provides their info, sync to customer's / relationships CRM:

### Create/Update Contact:
```javascript
// POST to / relationships API
POST https://businessblueprint.io/api/relationships/contacts
Authorization: Bearer {customer_relationships_api_key}

{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "555-1234",
  "source": "chat",
  "customFields": {
    "first_page": "https://acme.com/pricing",
    "referrer": "https://google.com"
  }
}

// Response
{
  "contactId": "cont_xyz789",
  "status": "created" // or "updated" if exists
}
```

### Log Chat Activity:
```javascript
// POST chat as activity
POST https://businessblueprint.io/api/relationships/activities
Authorization: Bearer {customer_relationships_api_key}

{
  "contactId": "cont_xyz789",
  "type": "chat",
  "title": "Live Chat Conversation",
  "description": "Discussed pricing options",
  "timestamp": "2026-01-20T10:30:00Z",
  "metadata": {
    "conversationId": "conv_abc123",
    "duration": 420,
    "messageCount": 12,
    "rating": 5
  }
}
```

---

## DASHBOARD FEATURES

### For Customers (Companies):

**Conversations Page:**
- List all active/recent conversations
- Filter by status (active, closed, archived)
- Search by visitor name/email
- Real-time updates (new messages appear instantly)
- Unread count badges

**Chat View:**
- Full conversation history
- Visitor info sidebar (name, email, page, CRM link)
- Send messages in real-time
- Upload files
- Close/archive conversation
- Add tags
- Request rating

**Settings Page:**
- Widget customization (colors, position, messages)
- Business hours
- Auto-responses
- GDPR settings
- Custom fields configuration
- Embed code copy

**Analytics Page:**
- Total conversations (today, week, month)
- Average response time
- Customer satisfaction ratings
- Peak hours chart
- Top pages where chats start

### For Platform Admin (BusinessBlueprint):

**Aggregated Analytics (Anonymized):**
- Total conversations across all customers
- Average response times
- Peak usage hours
- Popular industries
- Widget load performance
- Error rates

**NO access to:**
- Individual company data
- Conversation contents
- Visitor PII
- Company-specific metrics

---

## SECURITY REQUIREMENTS

1. **Multi-tenant Isolation**
   - Every query includes customer_id filter
   - Middleware verifies tenant ownership
   - No cross-tenant data leakage possible

2. **Authentication**
   - JWT tokens for dashboard access
   - API keys for widget authentication
   - bcrypt for password hashing

3. **Rate Limiting**
   - Widget: 10 messages/minute per visitor
   - API: 100 requests/minute per customer
   - Prevent spam and abuse

4. **Input Validation**
   - Sanitize all inputs
   - Validate email formats
   - Escape HTML in messages (XSS prevention)

5. **File Uploads**
   - 5MB max file size
   - Allowed types: images, PDF, doc, docx
   - Virus scanning (optional)
   - Stored securely with unique names

6. **HTTPS Only**
   - All connections over TLS
   - Secure WebSocket (wss://)

---

## API ENDPOINTS

### Widget API (Public):

```
POST /api/widget/sessions
  - Create chat session
  - Body: { customerId, visitorData }
  - Returns: { sessionId, conversationId, settings }

POST /api/widget/messages
  - Send message
  - Body: { conversationId, sessionId, content }
  - Returns: { messageId }

POST /api/widget/upload
  - Upload file
  - Body: multipart/form-data
  - Returns: { fileUrl, fileName }

GET /api/widget/history/:conversationId
  - Get message history
  - Returns: { messages[] }
```

### Dashboard API (Authenticated):

```
POST /api/dashboard/auth/login
  - Agent login
  - Body: { email, password }
  - Returns: { token, agent }

GET /api/dashboard/conversations
  - List conversations
  - Query: ?status=active&page=1
  - Returns: { conversations[], total, pages }

GET /api/dashboard/conversations/:id
  - Get conversation with messages
  - Returns: { conversation, messages[], visitor }

POST /api/dashboard/messages
  - Agent sends message
  - Body: { conversationId, content }
  - Returns: { messageId }

PUT /api/dashboard/conversations/:id/close
  - Close conversation
  - Returns: { success }

GET /api/dashboard/settings
  - Get widget settings
  - Returns: { settings }

PUT /api/dashboard/settings
  - Update widget settings
  - Body: { settings }
  - Returns: { settings }

GET /api/dashboard/analytics
  - Get analytics
  - Query: ?period=week
  - Returns: { stats }
```

---

## ENVIRONMENT VARIABLES

```env
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@host:5432/chat

# Redis (for sessions/presence)
REDIS_URL=redis://host:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# File Storage
STORAGE_TYPE=s3  # or 'local'
AWS_BUCKET=chat-uploads
AWS_REGION=us-east-1
AWS_ACCESS_KEY=xxx
AWS_SECRET_KEY=xxx

# / relationships API
RELATIONSHIPS_API_URL=https://businessblueprint.io/api/relationships

# Widget CDN
WIDGET_CDN_URL=https://cdn.businessblueprint.io/chat
```

---

## BUILD OUTPUT

When complete, the system should:

1. ✅ Serve embeddable widget at `/chat/widget.js`
2. ✅ Handle real-time messaging via Socket.IO
3. ✅ Store all conversations in PostgreSQL
4. ✅ Sync contacts to / relationships CRM
5. ✅ Provide customer dashboard for responding to chats
6. ✅ Isolate data completely between customers (multi-tenant)
7. ✅ Track anonymized behavioral analytics
8. ✅ Support all 10 enhanced widget features
9. ✅ Work on mobile and desktop
10. ✅ Handle errors gracefully

---

## VALIDATION CHECKLIST

Before submitting, verify:

- [ ] Widget loads correctly on any website
- [ ] Real-time messaging works (visitor ↔ agent)
- [ ] Multi-tenant isolation (Customer A cannot see Customer B's data)
- [ ] CRM sync creates contacts in / relationships
- [ ] Dashboard shows conversations correctly
- [ ] File uploads work
- [ ] Offline messages saved when no agents
- [ ] Session persists across page navigation
- [ ] Mobile responsive design
- [ ] All 10 enhanced features implemented

---

**NOW: Present your implementation plan and WAIT for approval before building.**
