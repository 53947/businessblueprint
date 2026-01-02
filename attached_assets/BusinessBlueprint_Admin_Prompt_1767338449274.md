# BusinessBlueprint.io Admin Panel - Replit Builder Agent Prompt

## Project Overview
Build a comprehensive admin panel for BusinessBlueprint.io, a SaaS platform that helps local businesses grow through AI-powered assessments, prescriptions, and integrated marketing/operations apps. This admin panel must support the complete client lifecycle and all product features.

## Core Requirements

### 1. CLIENT MANAGEMENT SYSTEM

**Client Dashboard (Main View)**
- Display all clients with key metrics:
  - Client ID, Company Name, Contact Info
  - Account Status (Active, Trial, Suspended, Churned)
  - Subscription Tier & MRR
  - Onboarding Progress (%)
  - Active Apps from bundles
  - Last Activity Date
  - Health Score (engagement metric)
- Filterable by: status, subscription tier, app usage, signup date, health score
- Searchable by: Client ID, Company Name, Email, Phone, External ID
- Bulk actions: Export, Send Message, Update Status

**Individual Client Portal Access**
- Click any client to access their full portal at `/client-login?clientId=XX`
- View-as-client mode (impersonate for support)
- Quick actions: Access Portal, Edit Account, View Activity Log, Send Message

**Client Detail Page (Click into any client)**
- Account Overview:
  - All contact information
  - Business details (industry, size, location)
  - Account created date, last login
  - Assigned account manager (future feature)
- Subscription Management:
  - Current plan and pricing
  - Billing cycle and next payment date
  - Payment method (linked to SwipesBlue)
  - Upgrade/Downgrade options
  - Pause/Cancel subscription
- Active Apps & Bundles:
  - CommVerse bundle status (/send, /content, /livechat, /inbox)
  - LocalBlue bundle status (/listings, /reputation)
  - /relationships CRM usage
  - AIPromptBuilders access
  - AgentInspector access
  - Per-app usage metrics
- Assessment History:
  - All completed assessments with dates
  - Scores and results
  - View/download assessment reports
- Prescription History:
  - AI-generated prescriptions delivered
  - Implementation status
  - Results/ROI tracking
- Activity Timeline:
  - Login history
  - Feature usage
  - Support tickets
  - System notifications sent
- Support Notes:
  - Internal notes about client
  - Support ticket history
  - Add new note functionality

### 2. ASSESSMENT MANAGEMENT SYSTEM

**Assessment Builder**
- Create new assessments with:
  - Assessment name and description
  - Category (SEO, Reputation, Social Media, Website, Overall Business)
  - Question library with question types:
    - Multiple choice
    - Rating scale (1-10)
    - Yes/No
    - Text input
    - Google Business Intelligence data pull (automated)
  - Scoring logic and weights
  - Result thresholds (Good/Needs Improvement/Critical)
- Template library for common assessments
- Clone/duplicate existing assessments
- Version control for assessment updates

**Assessment Library**
- View all available assessments
- Active/Inactive status toggle
- Edit existing assessments
- Preview assessment (client view)
- Analytics per assessment:
  - Completion rate
  - Average score
  - Time to complete
  - Drop-off points

**Client Assessment Assignment**
- Assign assessments to specific clients or client segments
- Schedule automated assessment delivery
- Set reminder cadence
- Track completion status

**Assessment Results Dashboard**
- View all submitted assessments
- Filter by: client, assessment type, date range, score range
- Export results to CSV/PDF
- Flag assessments needing attention
- Compare results across clients (benchmarking)

### 3. AI PRESCRIPTION MANAGEMENT

**Prescription Review Queue**
- All AI-generated prescriptions awaiting review
- Sort by: priority, creation date, client
- Preview prescription content
- Side-by-side view: Assessment data → AI prescription
- Approve/Reject/Edit workflow
- Bulk approval for trusted AI outputs

**Prescription Editor**
- Edit AI-generated content before delivery
- Add/remove recommendations
- Adjust priority levels
- Customize action items
- Add manual notes or explanations
- Set implementation timeline

**Prescription Templates**
- Create prescription templates for common scenarios
- Template variables that auto-populate from assessment data
- Industry-specific prescription frameworks
- Best practice libraries

**Prescription Delivery & Tracking**
- Schedule delivery to client portal
- Email notification to client
- Track client viewing/engagement
- Implementation status tracking:
  - Not Started
  - In Progress
  - Completed
  - Blocked/Needs Help
- ROI tracking (connect prescriptions to business results)

**Prescription Analytics**
- Most common recommendations
- Implementation rates by recommendation type
- Time to value metrics
- Client satisfaction scores
- A/B testing different prescription formats

### 4. APP BUNDLE MANAGEMENT

**CommVerse Bundle Admin**

**/send - Email Campaign Manager**
- Template library management
- Campaign performance dashboard
- Deliverability monitoring (open rates, click rates, bounce rates)
- Spam score checker for templates
- Client-specific email configuration
- Integration with client CRM data
- Scheduled send management

**/content - Content Management System**
- Content calendar overview (all clients)
- AI content generation queue
- Content approval workflow
- Content performance analytics
- Template library for social posts, blogs, etc.
- Content scheduling across platforms
- Client-specific content strategies

**/livechat - Live Chat Administration**
- Chat transcript archive (searchable)
- AI bot training interface
- Escalation rules configuration
- Response time analytics
- Customer satisfaction scores
- Agent assignment rules (for future team expansion)
- Canned response library

**/inbox - Unified Inbox Management**
- Message routing rules
- Auto-response configuration
- Integration status monitoring (email, SMS, social)
- Message priority settings
- Archival and search functionality

**LocalBlue Bundle Admin**

**/listings - Business Listings Manager**
- Directory sync status dashboard
- Listing accuracy scores
- Update queue (pending changes)
- Citation monitoring across platforms
- Bulk update tools
- Error log and resolution tracking
- Client-specific listing configurations

**/reputation - Reputation Management**
- Review monitoring dashboard (all clients)
- Review response template library
- Automated response settings
- Sentiment analysis trends
- Review request campaign manager
- Competitor benchmarking tools
- Alert configuration for negative reviews

**Central Hub**

**/relationships - CRM Administration**
- Data integrity checks
- Contact merge tools
- Duplicate detection
- Pipeline management templates
- Automation rule builder
- Integration settings with other apps
- Custom field management

### 5. SUPPORT & CLIENT SUCCESS

**Ticket System**
- Create/view all support tickets
- Ticket status workflow (New, In Progress, Waiting on Client, Resolved, Closed)
- Priority levels (Low, Medium, High, Urgent)
- Assignment to team members (future)
- Linked to client accounts
- Internal notes vs client-visible responses
- SLA tracking and alerts
- Common issues categorization

**Knowledge Base Manager**
- Create/edit help articles
- Organize by app/feature
- Internal vs client-facing articles
- Search functionality
- Analytics on most-viewed articles
- Suggested articles based on client issues

**Onboarding Tracker**
- Onboarding checklist per client
- Automated task assignment
- Progress visualization
- Bottleneck identification
- Time-to-value tracking
- Automated onboarding communications

**Feature Request Tracking**
- Client feature requests
- Voting system
- Status updates (Under Review, Planned, In Progress, Shipped, Won't Do)
- Notify requesters when shipped
- Roadmap visibility

### 6. ANALYTICS & REPORTING

**Business Intelligence Dashboard**
- Key metrics overview:
  - Total clients (Active, Trial, Churned)
  - MRR and ARR
  - Churn rate
  - Average customer lifetime value
  - New client acquisition (this month)
  - Active subscriptions by tier
- Revenue analytics:
  - Revenue trends over time
  - Revenue by subscription tier
  - Revenue by app/bundle
  - SwipesBlue transaction summary
- Client engagement metrics:
  - Daily/Weekly/Monthly active users
  - Feature adoption rates
  - App usage by bundle
  - Assessment completion rates
- Product analytics:
  - Most used features
  - Least used features (candidates for removal)
  - User journey flows
  - Conversion funnel (trial → paid)

**Custom Report Builder**
- Select metrics and dimensions
- Date range selection
- Export to PDF/CSV/Excel
- Schedule automated reports
- Share reports with team (future)

### 7. SYSTEM ADMINISTRATION

**Global Settings**
- Platform branding (logo, colors)
- Email templates and branding
- Notification settings
- SwipesBlue payment integration configuration
- API keys and webhooks
- Maintenance mode toggle
- Feature flags (enable/disable features globally)

**User & Permission Management** (for future team)
- Admin user accounts
- Role-based permissions (Super Admin, Admin, Support, Read-Only)
- Activity audit log
- Session management

**Integration Management**
- SwipesBlue connection status
- HostsBlue connection status
- LINKBlue API status
- Google Business Intelligence API
- External integrations (social platforms, review sites, etc.)
- Webhook logs and debugging

**System Health Monitoring**
- Server status
- API response times
- Error logs (categorized by severity)
- Database performance
- Background job queue status
- Alerts for critical issues

### 8. AI TOOL MANAGEMENT

**AIPromptBuilders Administration**
- Prompt template library
- Client usage tracking
- Custom prompt configuration per client
- Claude API integration status
- Usage limits and throttling

**AgentInspector Administration**
- DeepSeek AI integration configuration
- Quality assurance results
- Code review history
- Development feedback archive
- Alert settings for critical issues

## Technical Requirements

### Authentication & Security
- Secure admin login (separate from client login)
- Two-factor authentication
- Session timeout settings
- IP whitelist capability
- Audit logging for all admin actions

### Database Schema Considerations
- Client accounts table
- Assessments and responses tables
- Prescriptions table
- App usage tracking tables
- Support tickets table
- Analytics events table
- Admin user accounts table

### Payment Integration
- **CRITICAL**: All payment processing MUST use SwipesBlue (proprietary payment gateway)
- No Stripe, PayPal, or other third-party payment processors
- SwipesBlue integration for:
  - Subscription billing
  - One-time payments
  - Failed payment handling
  - Refund processing
  - Transaction history

### User Interface Requirements
- Responsive design (desktop primary, mobile-friendly)
- Clean, modern interface
- Fast load times
- Intuitive navigation
- Keyboard shortcuts for power users
- Dark mode option
- Accessible (WCAG 2.1 AA compliance)

### Performance Requirements
- Dashboard loads in <2 seconds
- Handle 1000+ clients without performance degradation
- Real-time updates for critical metrics
- Efficient database queries with proper indexing
- Caching for frequently accessed data

### Data Export Capabilities
- Export client lists to CSV
- Export assessment results to PDF/Excel
- Export analytics reports
- Backup and restore functionality

## Navigation Structure

```
BusinessBlueprint.io/admin
│
├── Dashboard (Overview)
│
├── Clients
│   ├── All Clients
│   ├── Active Accounts
│   ├── Trial Accounts
│   ├── Churned/Cancelled
│   └── Add New Client
│
├── Assessments
│   ├── Assessment Library
│   ├── Create New Assessment
│   ├── Submitted Results
│   ├── Assignment Manager
│   └── Analytics
│
├── Prescriptions
│   ├── Review Queue
│   ├── Approved & Delivered
│   ├── Templates
│   └── Analytics
│
├── Apps
│   ├── CommVerse
│   │   ├── /send
│   │   ├── /content
│   │   ├── /livechat
│   │   └── /inbox
│   ├── LocalBlue
│   │   ├── /listings
│   │   └── /reputation
│   └── /relationships (CRM)
│
├── Support
│   ├── Tickets
│   ├── Knowledge Base
│   ├── Onboarding Tracker
│   └── Feature Requests
│
├── Analytics
│   ├── Business Overview
│   ├── Client Engagement
│   ├── Revenue Reports
│   └── Custom Reports
│
├── AI Tools
│   ├── AIPromptBuilders
│   └── AgentInspector
│
└── Settings
    ├── Global Settings
    ├── Integrations
    ├── User Management
    └── System Health
```

## Priority Development Phases

### Phase 1 - MVP (Launch Ready)
- Client management (view, search, basic details)
- Assessment submission viewing
- Basic analytics dashboard
- SwipesBlue payment integration
- Support ticket system

### Phase 2 - Growth Features
- Assessment builder and assignment
- AI prescription review and approval
- App-level admin controls (CommVerse & LocalBlue)
- Knowledge base
- Enhanced analytics

### Phase 3 - Advanced Features
- Custom report builder
- Feature request tracking
- Advanced automation rules
- A/B testing frameworks
- Team collaboration tools

## Success Criteria
- Admin can manage complete client lifecycle from onboarding to churn
- All assessment and prescription workflows are streamlined
- App bundle administration is centralized and efficient
- Support and client success tools reduce response times
- Analytics provide actionable insights for business decisions
- System integrates seamlessly with SwipesBlue for all payments
- Platform is ready to scale from 10 to 1000+ clients

## Notes for Replit Builder Agent
- This is a production system, not a demo
- Code quality and maintainability are critical
- Use modern frameworks (React, Next.js, or similar)
- Database should be PostgreSQL or similar robust RDBMS
- Include comprehensive error handling
- Build with mobile responsiveness in mind
- Include inline documentation for future maintenance
- Set up proper environment variables for API keys and sensitive data
- Implement rate limiting and security best practices
- Create database migrations for schema changes
- Include seed data for testing
