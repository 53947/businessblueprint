# Vendasta Integration Setup Guide

## 📞 **For Your Monday Call with Vendasta**

### **What to Request:**

1. **Production API Access** with these specific permissions:
   - Customer/Client data (read/write)
   - Form submissions (read)
   - Message/Inbox access (read/write)
   - Campaign management (read/write)
   - Business listings (read)
   - Reviews and reputation (read)
   - Webhook configuration (read/write)

2. **API Token Generation** - Request help generating a production token with maximum scope

3. **Webhook Configuration** - Set up webhook endpoint:
   ```
   URL: https://your-domain.replit.app/api/webhooks/vendasta
   Events: customer.created, customer.updated, form.submitted, message.received
   ```

### **Questions to Ask Vendasta:**

1. **"What's the correct scope format for maximum API access?"**
2. **"Can you help generate a production token with full permissions?"**
3. **"What's the proper webhook event list for form submissions and client updates?"**
4. **"What's the base URL for production API calls?"**
5. **"Do you have documentation for Campaign Pro API integration?"**

## 🔧 **After You Get Credentials**

Once you have the API token, provide these environment variables:

```bash
VENDASTA_API_TOKEN=your_production_token
VENDASTA_BASE_URL=https://prod-api.vendasta.com (or URL they provide)
VENDASTA_WEBHOOK_SECRET=your_webhook_secret
```

## ✅ **Integration Ready**

The platform is now prepared to:
- Authenticate with either token or API key
- Process real-time webhooks
- Sync client data bidirectionally
- Aggregate Campaign Pro data
- Provide secure dashboard access

## 🎯 **Immediate Testing Plan**

Once credentials are added:
1. Test API connectivity
2. Sync sample client data
3. Process webhook events
4. Demonstrate Campaign Pro integration
5. Verify dashboard access flow

The integration architecture is complete and ready for your Vendasta credentials.