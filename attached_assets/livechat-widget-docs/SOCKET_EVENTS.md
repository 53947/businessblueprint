# Socket.IO Events Documentation

Real-time messaging protocol for the live chat widget.

## Client -> Server Events

### join:session
Join a visitor session room.
```javascript
socket.emit('join:session', sessionId);
```

### join:conversation
Join a specific conversation room (after first message).
```javascript
socket.emit('join:conversation', conversationId);
```

### chat:message
Send a message from visitor to agent.
```javascript
socket.emit('chat:message', {
  sessionId: "uuid",
  conversationId: 123,  // null for first message
  message: "Hello, I need help",
  visitorName: "John",
  visitorEmail: "john@example.com",
  clientId: "1"
});
```

### typing:start
Indicate visitor is typing.
```javascript
socket.emit('typing:start', {
  conversationId: 123,
  name: "John"
});
```

### typing:stop
Indicate visitor stopped typing.
```javascript
socket.emit('typing:stop', {
  conversationId: 123
});
```

## Server -> Client Events

### agent:message
Receive a message from an agent.
```javascript
socket.on('agent:message', (data) => {
  // data = {
  //   id: 789,
  //   message: "Hi John, how can I help?",
  //   agentName: "Support Agent",
  //   timestamp: "2025-01-16T15:30:00.000Z"
  // }
});
```

### message:history
Receive chat history on reconnection.
```javascript
socket.on('message:history', (data) => {
  // data = {
  //   messages: [
  //     {
  //       id: 1,
  //       content: "Hello",
  //       direction: "inbound",  // from visitor
  //       fromName: "John",
  //       conversationId: 123,
  //       createdAt: "2025-01-16T15:00:00.000Z"
  //     },
  //     {
  //       id: 2,
  //       content: "Hi! How can I help?",
  //       direction: "outbound",  // from agent
  //       fromName: "Support Agent",
  //       conversationId: 123,
  //       createdAt: "2025-01-16T15:01:00.000Z"
  //     }
  //   ]
  // }
});
```

### message:sent
Confirmation that a message was saved.
```javascript
socket.on('message:sent', (data) => {
  // data = {
  //   messageId: 789,
  //   conversationId: 123
  // }
});
```

### user:typing
Agent is typing indicator.
```javascript
socket.on('user:typing', (data) => {
  // data = { name: "Support Agent" }
});
```

### user:stop-typing
Agent stopped typing.
```javascript
socket.on('user:stop-typing', () => {
  // Hide typing indicator
});
```

## Connection Events

### connect
Socket connected successfully.
```javascript
socket.on('connect', () => {
  // Join session room
  socket.emit('join:session', sessionId);
});
```

### disconnect
Socket disconnected.
```javascript
socket.on('disconnect', () => {
  // Update UI to show offline status
});
```
