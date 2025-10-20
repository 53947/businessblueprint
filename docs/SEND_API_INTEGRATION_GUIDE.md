
# /send API Integration Guide

## Overview

The **businessblueprint.io /send** platform provides a unified email and SMS marketing API with built-in compliance (GDPR, CAN-SPAM, TCPA). This guide will help you integrate /send into your application.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Core Concepts](#core-concepts)
4. [API Endpoints](#api-endpoints)
5. [Integration Examples](#integration-examples)
6. [Best Practices](#best-practices)
7. [Error Handling](#error-handling)
8. [Rate Limits & Quotas](#rate-limits--quotas)
9. [Webhooks](#webhooks)
10. [Support](#support)

---

## Getting Started

### Prerequisites

- Active businessblueprint.io account
- API credentials (JWT token)
- HTTPS endpoint for webhooks (optional)

### Base URL

```
Production: https://businessblueprint.io/api/send
```

### Quick Start

```bash
# Test your API connection
curl -X GET https://businessblueprint.io/api/send/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Authentication

All API requests require JWT authentication in the `Authorization` header.

### Obtaining Your API Token

1. Log in to your businessblueprint.io account
2. Navigate to **Settings → API Keys**
3. Generate a new API token
4. Store securely (never commit to version control)

### Authentication Header

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN',
  'Content-Type': 'application/json'
}
```

### Token Security

- **Never** expose tokens in client-side code
- Rotate tokens every 90 days
- Use environment variables: `process.env.SEND_API_TOKEN`
- Revoke immediately if compromised

---

## Core Concepts

### 1. Contacts

Contacts are individuals in your database with email/phone numbers and consent status.

**Key Fields:**
- `email` (required)
- `phone` (optional, E.164 format: +15551234567)
- `emailConsent` (boolean)
- `smsConsent` (boolean)
- `firstName`, `lastName`
- `tags` (array for segmentation)
- `customFields` (object for additional data)

### 2. Lists

Lists are collections of contacts for targeted campaigns.

**Use Cases:**
- Segment by purchase history
- Geographic targeting
- Behavioral grouping

### 3. Campaigns

Campaigns are email or SMS messages sent to lists or segments.

**Types:**
- One-time broadcasts
- Drip sequences
- Automated triggers

### 4. Consent Management

/send automatically handles:
- Double opt-in verification
- Unsubscribe links
- Consent timestamps
- Geographic compliance rules

---

## API Endpoints

### Contacts Management

#### Create Contact

```http
POST /api/send/contacts
```

**Request Body:**
```json
{
  "email": "driver@example.com",
  "phone": "+15551234567",
  "firstName": "John",
  "lastName": "Doe",
  "emailConsent": true,
  "smsConsent": true,
  "tags": ["driver-applicant", "2025-recruitment"],
  "customFields": {
    "cdlClass": "A",
    "yearsExperience": 5,
    "location": "New York"
  }
}
```

**Response:**
```json
{
  "success": true,
  "contact": {
    "id": "cnt_abc123",
    "email": "driver@example.com",
    "phone": "+15551234567",
    "emailConsent": true,
    "smsConsent": true,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

#### List Contacts

```http
GET /api/send/contacts?page=1&limit=50&tag=driver-applicant
```

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, max: 100)
- `tag` (string, filter by tag)
- `search` (string, search email/name)

**Response:**
```json
{
  "success": true,
  "contacts": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 247,
    "pages": 5
  }
}
```

#### Update Contact

```http
PATCH /api/send/contacts/:contactId
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "tags": ["driver-hired"],
  "customFields": {
    "hireDate": "2025-02-01"
  }
}
```

#### Delete Contact

```http
DELETE /api/send/contacts/:contactId
```

**Response:**
```json
{
  "success": true,
  "message": "Contact deleted and compliance records retained"
}
```

---

### Lists Management

#### Create List

```http
POST /api/send/lists
```

**Request Body:**
```json
{
  "name": "Q1 2025 Driver Recruitment",
  "description": "Potential CDL-A drivers for spring onboarding",
  "tags": ["recruitment", "cdl-a"]
}
```

#### Add Contact to List

```http
POST /api/send/lists/:listId/contacts/:contactId
```

#### Remove Contact from List

```http
DELETE /api/send/lists/:listId/contacts/:contactId
```

#### Get List Contacts

```http
GET /api/send/lists/:listId/contacts
```

---

### Campaigns (Coming Soon)

Campaign creation and management endpoints are in development. Current approach:

1. **Create contacts via API** (documented above)
2. **Organize into lists** (documented above)
3. **Create campaigns in dashboard** (https://businessblueprint.io/send-app)

**Planned Endpoints:**
```http
POST /api/send/campaigns          # Create campaign
GET /api/send/campaigns            # List campaigns
GET /api/send/campaigns/:id        # Get campaign details
POST /api/send/campaigns/:id/send  # Send campaign
GET /api/send/campaigns/:id/stats  # Get analytics
```

---

## Integration Examples

### Node.js / Express

```javascript
// Install axios: npm install axios
const axios = require('axios');

class SendAPIClient {
  constructor(apiToken) {
    this.baseURL = 'https://businessblueprint.io/api/send';
    this.headers = {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    };
  }

  async createContact(contactData) {
    try {
      const response = await axios.post(
        `${this.baseURL}/contacts`,
        contactData,
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error.response?.data);
      throw error;
    }
  }

  async addToList(listId, contactId) {
    try {
      const response = await axios.post(
        `${this.baseURL}/lists/${listId}/contacts/${contactId}`,
        {},
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding to list:', error.response?.data);
      throw error;
    }
  }

  async getContacts(params = {}) {
    try {
      const response = await axios.get(
        `${this.baseURL}/contacts`,
        { 
          headers: this.headers,
          params: params
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error.response?.data);
      throw error;
    }
  }
}

// Usage
const sendClient = new SendAPIClient(process.env.SEND_API_TOKEN);

// Example: Driver recruitment flow
async function recruitDriver(applicantData) {
  // Create contact
  const contact = await sendClient.createContact({
    email: applicantData.email,
    phone: applicantData.phone,
    firstName: applicantData.firstName,
    lastName: applicantData.lastName,
    emailConsent: true,
    smsConsent: applicantData.smsOptIn,
    tags: ['driver-applicant'],
    customFields: {
      cdlClass: applicantData.cdlClass,
      yearsExperience: applicantData.experience,
      referralSource: applicantData.source
    }
  });

  // Add to recruitment list
  await sendClient.addToList('lst_recruitment_2025', contact.contact.id);

  return contact;
}
```

### Python

```python
import requests
import os

class SendAPIClient:
    def __init__(self, api_token):
        self.base_url = 'https://businessblueprint.io/api/send'
        self.headers = {
            'Authorization': f'Bearer {api_token}',
            'Content-Type': 'application/json'
        }
    
    def create_contact(self, contact_data):
        response = requests.post(
            f'{self.base_url}/contacts',
            json=contact_data,
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def get_contacts(self, **params):
        response = requests.get(
            f'{self.base_url}/contacts',
            params=params,
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()

# Usage
send_client = SendAPIClient(os.getenv('SEND_API_TOKEN'))

# Create contact
contact = send_client.create_contact({
    'email': 'driver@example.com',
    'phone': '+15551234567',
    'firstName': 'John',
    'lastName': 'Doe',
    'emailConsent': True,
    'smsConsent': True,
    'tags': ['driver-applicant']
})
```

### PHP

```php
<?php

class SendAPIClient {
    private $baseURL = 'https://businessblueprint.io/api/send';
    private $apiToken;
    
    public function __construct($apiToken) {
        $this->apiToken = $apiToken;
    }
    
    private function makeRequest($method, $endpoint, $data = null) {
        $ch = curl_init($this->baseURL . $endpoint);
        
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->apiToken,
            'Content-Type: application/json'
        ]);
        
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
    
    public function createContact($contactData) {
        return $this->makeRequest('POST', '/contacts', $contactData);
    }
    
    public function getContacts($params = []) {
        $query = http_build_query($params);
        return $this->makeRequest('GET', '/contacts?' . $query);
    }
}

// Usage
$sendClient = new SendAPIClient(getenv('SEND_API_TOKEN'));

$contact = $sendClient->createContact([
    'email' => 'driver@example.com',
    'phone' => '+15551234567',
    'firstName' => 'John',
    'lastName' => 'Doe',
    'emailConsent' => true,
    'smsConsent' => true,
    'tags' => ['driver-applicant']
]);
```

---

## Best Practices

### 1. Consent Management

✅ **Do:**
- Always obtain explicit consent before adding contacts
- Set `emailConsent` and `smsConsent` based on user opt-in
- Provide clear unsubscribe options
- Honor opt-out requests immediately

❌ **Don't:**
- Add contacts without permission
- Purchase email lists
- Enable consent by default
- Ignore unsubscribe requests

### 2. Data Quality

✅ **Do:**
- Validate email addresses before submission
- Use E.164 format for phone numbers (+15551234567)
- Clean data before import
- Remove duplicates

❌ **Don't:**
- Submit invalid email formats
- Use local phone number formats
- Import uncleaned data
- Create duplicate contacts

### 3. Tagging Strategy

✅ **Do:**
- Use consistent tag naming conventions
- Create tags for: source, status, segment, campaign
- Keep tags lowercase with hyphens: `driver-applicant`
- Document your tag taxonomy

**Example Tag Structure:**
```
source-website
source-referral
status-applicant
status-hired
segment-cdl-a
segment-local-routes
campaign-q1-2025
```

### 4. Rate Limiting

- Respect API rate limits (100 requests/minute)
- Implement exponential backoff for retries
- Batch operations when possible
- Use webhooks instead of polling

### 5. Error Handling

```javascript
async function safeCreateContact(contactData) {
  try {
    return await sendClient.createContact(contactData);
  } catch (error) {
    if (error.response?.status === 409) {
      // Contact already exists - update instead
      return await sendClient.updateContact(contactData.email, contactData);
    } else if (error.response?.status === 429) {
      // Rate limit - wait and retry
      await new Promise(resolve => setTimeout(resolve, 60000));
      return await sendClient.createContact(contactData);
    } else {
      // Log and handle other errors
      console.error('Contact creation failed:', error);
      throw error;
    }
  }
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Process response |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Check request format/validation |
| 401 | Unauthorized | Check API token |
| 403 | Forbidden | Check permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource (e.g., email exists) |
| 429 | Too Many Requests | Wait 60s, implement backoff |
| 500 | Server Error | Retry with exponential backoff |

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email address is invalid",
    "field": "email"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Invalid input data
- `DUPLICATE_CONTACT` - Contact with email already exists
- `INVALID_TOKEN` - Authentication failed
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INSUFFICIENT_PERMISSIONS` - Access denied

---

## Rate Limits & Quotas

### API Rate Limits

- **100 requests per minute** per API token
- **10,000 requests per day** per account
- **Burst capacity:** Up to 200 requests in 10 seconds

### Quota Management

| Plan | Contacts | Emails/Month | SMS/Month |
|------|----------|--------------|-----------|
| Standalone ($35/mo) | Unlimited | 50,000 | 5,000 |
| Bundle ($75/mo) | Unlimited | 100,000 | 10,000 |

### Handling Rate Limits

```javascript
class RateLimitedClient {
  constructor(apiToken) {
    this.client = new SendAPIClient(apiToken);
    this.requestQueue = [];
    this.processing = false;
  }

  async queueRequest(fn) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ fn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || this.requestQueue.length === 0) return;
    
    this.processing = true;
    const { fn, resolve, reject } = this.requestQueue.shift();
    
    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      if (error.response?.status === 429) {
        // Re-queue for retry
        this.requestQueue.unshift({ fn, resolve, reject });
        await new Promise(r => setTimeout(r, 60000));
      } else {
        reject(error);
      }
    }
    
    this.processing = false;
    
    // Rate limit: max 100/min = ~600ms between requests
    setTimeout(() => this.processQueue(), 600);
  }
}
```

---

## Webhooks

### Coming Soon

Webhook endpoints for real-time notifications:

- `contact.created` - New contact added
- `contact.updated` - Contact modified
- `contact.unsubscribed` - Opt-out event
- `campaign.sent` - Campaign delivered
- `email.opened` - Email opened
- `email.clicked` - Link clicked
- `sms.delivered` - SMS delivered
- `sms.failed` - SMS delivery failed

**Webhook Setup (Planned):**
```http
POST /api/send/webhooks
{
  "url": "https://yourdomain.com/webhooks/send",
  "events": ["contact.created", "email.opened"],
  "secret": "your_webhook_secret"
}
```

---

## Support

### Documentation

- **API Reference:** https://businessblueprint.io/docs/send-api
- **Dashboard:** https://businessblueprint.io/send-app
- **Changelog:** https://businessblueprint.io/changelog

### Getting Help

- **Email:** support@businessblueprint.io
- **Response Time:** < 24 hours
- **Priority Support:** Available for Bundle plan customers

### Community

- **GitHub Issues:** Report bugs and request features
- **Status Page:** https://status.businessblueprint.io
- **Developer Newsletter:** Monthly API updates

### Feature Requests

Submit via dashboard or email with:
- Use case description
- Expected behavior
- Business impact
- Timeline requirements

---

## Pricing

### /send Standalone: $35/month

- Full API access
- 50,000 emails/month
- 5,000 SMS/month
- Unlimited contacts
- Email & SMS campaigns
- Real-time analytics
- Compliance automation

### Commverse Bundle: $75/month

- Everything in /send
- **PLUS** /livechat + /inbox
- 100,000 emails/month
- 10,000 SMS/month
- Unified customer view
- Cross-platform analytics

### Get Started

1. Sign up: https://businessblueprint.io/assessment
2. Complete digital assessment
3. Choose /send standalone or bundle
4. Receive API credentials
5. Start integrating

---

## Example: Complete Driver Recruitment Integration

```javascript
// Complete workflow for Hudson Tides driver recruitment

const SendAPIClient = require('./SendAPIClient');
const sendClient = new SendAPIClient(process.env.SEND_API_TOKEN);

// Driver recruitment list ID (create once in dashboard)
const RECRUITMENT_LIST_ID = 'lst_driver_recruitment_2025';

// 1. Driver submits application on website
app.post('/api/driver-application', async (req, res) => {
  const { email, phone, firstName, lastName, cdlClass, experience, smsOptIn } = req.body;
  
  try {
    // Create contact in /send
    const contact = await sendClient.createContact({
      email,
      phone: phone.startsWith('+') ? phone : `+1${phone}`,
      firstName,
      lastName,
      emailConsent: true, // They submitted the form
      smsConsent: smsOptIn === true,
      tags: ['driver-applicant', 'website-submission'],
      customFields: {
        cdlClass,
        yearsExperience: experience,
        applicationDate: new Date().toISOString(),
        source: 'website'
      }
    });
    
    // Add to recruitment list
    await sendClient.addToList(RECRUITMENT_LIST_ID, contact.contact.id);
    
    // Trigger welcome email campaign (via dashboard)
    // Campaign will auto-send to new list members
    
    res.json({ 
      success: true, 
      message: 'Application received! Check your email for next steps.' 
    });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Unable to process application' 
    });
  }
});

// 2. Driver is hired - update status
app.post('/api/driver-hired/:email', async (req, res) => {
  const { email } = req.params;
  const { hireDate, route } = req.body;
  
  try {
    // Update contact
    const contacts = await sendClient.getContacts({ search: email });
    const contact = contacts.contacts[0];
    
    await sendClient.updateContact(contact.id, {
      tags: ['driver-hired', 'active-driver'],
      customFields: {
        hireDate,
        assignedRoute: route,
        status: 'active'
      }
    });
    
    // Remove from recruitment list, add to active drivers list
    await sendClient.removeFromList(RECRUITMENT_LIST_ID, contact.id);
    await sendClient.addToList('lst_active_drivers', contact.id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false });
  }
});
```

---

## Next Steps

1. **Get API Credentials**: Sign up at https://businessblueprint.io
2. **Read Full Docs**: https://businessblueprint.io/docs/send-api
3. **Test Integration**: Use examples above in your development environment
4. **Launch Campaigns**: Create your first campaign in the dashboard
5. **Monitor Analytics**: Track performance at https://businessblueprint.io/send-app

**Questions?** Email support@businessblueprint.io

---

*Last Updated: January 2025*  
*API Version: 1.0*  
*Platform: businessblueprint.io/send*
