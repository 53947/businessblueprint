# Vendasta Integration Setup Guide

## Overview
This guide helps you complete the integration between cloudpleaser.io and Vendasta's Business Center API.

## Current Status
✅ **Database Schema**: All tables created (clients, campaigns, inbox_messages, dashboard_access)  
✅ **API Endpoints**: Webhook handlers and client sync endpoints ready  
✅ **Services**: VendastaIntegrationService implemented with full functionality  
⚠️ **API Connection**: Waiting for credentials to be added  

## Required Setup Steps

### 1. Add Vendasta API Credentials
Navigate to the **Secrets** tab in Replit and add these three secrets:

**VENDASTA_API_KEY**
- Your Vendasta API key for authentication
- Found in your Vendasta developer dashboard

**VENDASTA_CLIENT_ID** 
- Your application's client ID
- Provided when you register your app with Vendasta

**VENDASTA_CLIENT_SECRET**
- Your application's client secret  
- Keep this secure and never expose in client-side code

### 2. Configure Webhooks in Vendasta
Set up webhooks in your Vendasta account to point to:
```
https://your-replit-domain.replit.app/api/webhooks/vendasta
```

Events to subscribe to:
- `customer.created` - New client registrations
- `customer.updated` - Client data changes
- `form.submitted` - Form submissions from embedded forms
- `message.received` - Inbox messages for Campaign Pro

### 3. Test the Integration

#### Access Integration Dashboard
Navigate to: `https://your-domain.replit.app/vendasta`

This dashboard provides:
- Real-time integration status
- Component health checks
- Client sync testing
- Webhook endpoint information

#### Test Client Sync
1. Go to the Vendasta integration page
2. Enter a Vendasta customer identifier
3. Click "Sync Client" to test the connection
4. Verify client data appears in your database

## Integration Features

### Data Synchronization
- **Real-time Client Sync**: Automatic sync of client data from Vendasta CRM
- **Webhook Processing**: Handles form submissions and client updates
- **Bi-directional Data**: Assessment results can be pushed back to Vendasta

### Campaign Pro Integration  
- **Inbox Messages**: Collects emails, SMS, social media messages
- **Sentiment Analysis**: AI-powered message sentiment tracking
- **Campaign Management**: Create and track marketing campaigns
- **Client Communication History**: Complete message timeline

### Dashboard Access
- **Secure Tokens**: Generate secure access tokens for clients
- **Vendasta Dashboard**: Direct integration with Business Center dashboard
- **Client Portal**: Own the complete client experience within cloudpleaser.io

## API Endpoints

### Webhook Endpoints
```
POST /api/webhooks/vendasta - Receives Vendasta webhooks
```

### Client Management
```
GET /api/clients/:id - Get client details
GET /api/clients/:id/campaign-data - Get client + campaign data
GET /api/clients/:id/messages - Get client inbox messages
POST /api/clients/sync-vendasta - Sync specific client from Vendasta
```

### Campaign Management
```
POST /api/clients/:id/campaigns - Create new campaign
PATCH /api/messages/:id/read - Mark message as read
```

### Testing
```
GET /api/vendasta/test - Integration status and health check
```

## Database Tables

### Clients Table
Stores client data synced from Vendasta CRM:
- Company information
- Contact details  
- Business category
- Enabled features
- External Vendasta ID reference

### Inbox Messages Table
Campaign Pro communication data:
- Message content and metadata
- Platform information (email, SMS, social)
- Sentiment analysis results
- Read/unread status

### Campaigns Table
Marketing campaign tracking:
- Campaign details and content
- Scheduling and status
- Performance metrics
- Client association

### Dashboard Access Table
Secure dashboard token management:
- Access tokens for client authentication
- Vendasta dashboard URL mapping
- Access tracking and expiration

## Security Features

### Webhook Verification
- HMAC-SHA1 signature verification
- Prevents unauthorized webhook submissions
- Configurable webhook secret

### Token-Based Access
- Secure dashboard access tokens
- Client-specific authentication
- Automatic token generation

## Next Steps

1. **Add API Credentials**: Complete the secrets setup in Replit
2. **Configure Webhooks**: Set up webhook endpoints in Vendasta
3. **Test Integration**: Use the dashboard to verify everything works
4. **Go Live**: Start processing real client data

## Support

If you encounter issues:
1. Check the integration dashboard for status
2. Verify API credentials are correct
3. Ensure webhook URLs are properly configured
4. Review server logs for detailed error information

The integration is designed to be robust and handle production-level traffic once credentials are configured.