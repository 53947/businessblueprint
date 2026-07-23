# Backend API Documentation

The live chat widget requires these backend endpoints to function.

## Base URL

Production: `https://businessblueprint.io`

## Endpoints

### POST /api/inbox/livechat/session

Creates a new chat session when a visitor starts chatting.

**Request Body:**
```json
{
  "clientId": "1",
  "sessionId": "uuid-generated-by-widget",
  "visitorName": "John Doe",
  "visitorEmail": "john@example.com",
  "pageUrl": "https://example.com/products",
  "pageTitle": "Products - Example.com",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0..."
}
```

**Response:**
```json
{
  "success": true,
  "sessionId": "uuid",
  "conversationId": 123
}
```

### GET /api/crm/integration/lookup

Optional CRM lookup to recognize returning visitors.

**Query Parameters:**
- `email` - Visitor's email address

**Response:**
```json
{
  "found": true,
  "contact": {
    "id": 456,
    "firstName": "John",
    "lastName": "Doe",
    "lifecycleStage": "customer"
  }
}
```

## Socket.IO Connection

The widget connects to the same base URL using Socket.IO with these auth options:

```javascript
io(baseUrl, {
  auth: {
    sessionId: "visitor-session-uuid",
    role: "customer"
  },
  transports: ['websocket', 'polling']
});
```
