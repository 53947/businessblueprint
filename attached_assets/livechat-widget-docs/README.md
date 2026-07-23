# Business Blueprint Live Chat Widget

Embeddable live chat widget for customer websites.

## Quick Installation

Add this code before the closing `</body>` tag on any website:

```html
<!-- Business Blueprint Live Chat Widget -->
<script>
  window.bbLiveChatConfig = {
    clientId: "YOUR_CLIENT_ID",
    companyName: "Your Company Name",
    primaryColor: "#F97316",
    position: "bottom-right",
    welcomeMessage: "Hi! How can we help you today?",
    requireEmail: true,
    enableSound: true
  };
</script>
<script src="https://businessblueprint.io/livechat-widget.js" async></script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clientId` | string | "1" | Your Business Blueprint client ID |
| `companyName` | string | "Business Blueprint" | Displayed in chat header |
| `primaryColor` | string | "#F97316" | Brand color for buttons and messages |
| `position` | string | "bottom-right" | Widget position: `bottom-right`, `bottom-left`, `top-right`, `top-left` |
| `welcomeMessage` | string | "Hi! How can we help you today?" | Initial greeting message |
| `requireEmail` | boolean | false | Require email before starting chat |
| `enableSound` | boolean | true | Play notification sounds |
| `apiEndpoint` | string | (auto-detected) | Override the API server URL |

## How It Works

1. Widget loads and displays a chat bubble
2. User clicks bubble to open chat window
3. User enters name (and optionally email)
4. Widget connects via Socket.IO to the BusinessBlueprint server
5. Messages are sent/received in real-time
6. Agents respond from the /inbox dashboard

## Files Included

- `livechat-widget.js` - The embeddable widget (standalone, no dependencies)
- `README.md` - This documentation
- `BACKEND_API.md` - Backend endpoints the widget calls
- `SOCKET_EVENTS.md` - Real-time messaging protocol

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

## Customization

The widget uses inline styles and creates its own CSS. The primary color affects:
- Chat bubble button
- Header background
- Send button
- Outbound message bubbles

## JavaScript API

After loading, you can control the widget programmatically:

```javascript
// Open the chat widget
window.BBLiveChat.open();

// Close the chat widget
window.BBLiveChat.close();
```
