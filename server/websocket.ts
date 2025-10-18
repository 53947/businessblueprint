import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { db } from './db';
import { 
  inboxMessages2, 
  inboxConversations, 
  livechatSessions 
} from '@shared/schema';
import { eq, and, desc } from 'drizzle-orm';
import { jwtService } from './services/jwt';

interface SocketData {
  userId?: number;
  clientId?: number;
  sessionId?: string;
  role?: 'agent' | 'customer';
}

export function setupWebSocket(server: HTTPServer) {
  const io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://*.replit.app', 'https://*.replit.dev']
        : ['http://localhost:5000', 'http://127.0.0.1:5000'],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  // Middleware for authentication
  io.use(async (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token;
    const sessionId = socket.handshake.auth.sessionId;
    const role = socket.handshake.auth.role;
    
    // Customer role (live chat widget) - doesn't require JWT, uses sessionId
    if (role === 'customer' && sessionId) {
      socket.data = {
        sessionId,
        role: 'customer'
      } as SocketData;
      return next();
    }
    
    // Agent role (inbox app) - requires JWT authentication
    if (role === 'agent' || token) {
      if (!token) {
        return next(new Error('Authentication required: No token provided'));
      }
      
      try {
        // Verify JWT token
        const payload = jwtService.verifyToken(token);
        
        // Check if token is still active
        const isActive = await jwtService.isTokenActive(token);
        if (!isActive) {
          return next(new Error('Authentication failed: Token has been revoked'));
        }
        
        // Attach authenticated user data
        socket.data = {
          userId: payload.clientId,
          clientId: payload.clientId,
          role: 'agent'
        } as SocketData;
        
        next();
      } catch (error) {
        console.error('WebSocket authentication error:', error);
        return next(new Error('Authentication failed: Invalid or expired token'));
      }
    } else {
      // No valid authentication method provided
      return next(new Error('Authentication required: Provide either token (agent) or sessionId (customer)'));
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('🔌 WebSocket client connected:', socket.id);

    // Join client-specific room
    socket.on('join:client', (clientId: number) => {
      socket.data.clientId = clientId;
      socket.join(`client:${clientId}`);
      console.log(`Client ${socket.id} joined room: client:${clientId}`);
    });

    // Join conversation room
    socket.on('join:conversation', (conversationId: number) => {
      socket.join(`conversation:${conversationId}`);
      console.log(`Client ${socket.id} joined conversation: ${conversationId}`);
    });

    // Handle incoming chat messages from live chat widget
    socket.on('chat:message', async (data: {
      sessionId: string;
      conversationId?: number;
      message: string;
      visitorName?: string;
      visitorEmail?: string;
      clientId: number;
    }) => {
      try {
        let conversationId = data.conversationId;

        // Create conversation if it doesn't exist
        if (!conversationId) {
          const [conversation] = await db.insert(inboxConversations).values({
            clientId: data.clientId,
            contactName: data.visitorName || 'Anonymous',
            contactIdentifier: data.sessionId,
            primaryChannelType: 'livechat',
            status: 'open',
            lastMessageAt: new Date(),
            lastMessagePreview: data.message.substring(0, 100),
          }).returning();

          conversationId = conversation.id;

          // Update livechat session with conversation ID
          await db.update(livechatSessions)
            .set({ conversationId })
            .where(eq(livechatSessions.sessionId, data.sessionId));
        }

        // Insert message
        const [message] = await db.insert(inboxMessages2).values({
          conversationId,
          channelType: 'livechat',
          messageType: 'incoming',
          direction: 'inbound',
          content: data.message,
          contentType: 'text',
          fromIdentifier: data.sessionId,
          fromName: data.visitorName || 'Anonymous',
          toIdentifier: `client:${data.clientId}`,
          toName: 'Support Team',
          status: 'delivered',
        }).returning();

        // Update conversation with latest message
        await db.update(inboxConversations)
          .set({
            lastMessageAt: new Date(),
            lastMessagePreview: data.message.substring(0, 100),
            unreadCount: db.$count(inboxMessages2, eq(inboxMessages2.conversationId, conversationId)),
            updatedAt: new Date(),
          })
          .where(eq(inboxConversations.id, conversationId));

        // Emit to conversation room (all agents monitoring this conversation)
        io.to(`conversation:${conversationId}`).emit('message:new', {
          ...message,
          conversationId
        });

        // Emit to client room (notify all agents for this client)
        io.to(`client:${data.clientId}`).emit('conversation:updated', {
          conversationId,
          lastMessage: data.message,
          unread: true
        });

        // Acknowledge to sender
        socket.emit('message:sent', {
          tempId: data.message,
          messageId: message.id,
          conversationId
        });

      } catch (error) {
        console.error('Error handling chat message:', error);
        socket.emit('message:error', { error: 'Failed to send message' });
      }
    });

    // Handle outgoing messages from agents
    socket.on('agent:message', async (data: {
      conversationId: number;
      message: string;
      agentId: number;
      agentName: string;
      clientId: number;
    }) => {
      try {
        // Get conversation details
        const [conversation] = await db.select()
          .from(inboxConversations)
          .where(eq(inboxConversations.id, data.conversationId))
          .limit(1);

        if (!conversation) {
          socket.emit('message:error', { error: 'Conversation not found' });
          return;
        }

        // Insert agent message
        const [message] = await db.insert(inboxMessages2).values({
          conversationId: data.conversationId,
          channelType: conversation.primaryChannelType,
          messageType: 'outgoing',
          direction: 'outbound',
          content: data.message,
          contentType: 'text',
          fromIdentifier: `agent:${data.agentId}`,
          fromName: data.agentName,
          toIdentifier: conversation.contactIdentifier,
          toName: conversation.contactName || 'Customer',
          sentById: data.agentId,
          status: 'sent',
        }).returning();

        // Update conversation
        await db.update(inboxConversations)
          .set({
            lastMessageAt: new Date(),
            lastMessagePreview: data.message.substring(0, 100),
            updatedAt: new Date(),
          })
          .where(eq(inboxConversations.id, data.conversationId));

        // Emit to conversation room (for agents)
        io.to(`conversation:${data.conversationId}`).emit('message:new', {
          ...message,
          conversationId: data.conversationId
        });

        // If it's a live chat conversation, emit to customer's session room
        if (conversation.primaryChannelType === 'livechat') {
          io.to(`session:${conversation.contactIdentifier}`).emit('agent:message', {
            id: message.id,
            message: data.message,
            agentName: data.agentName,
            timestamp: new Date().toISOString()
          });
        }

        // Acknowledge to agent
        socket.emit('message:sent', {
          messageId: message.id,
          conversationId: data.conversationId
        });

      } catch (error) {
        console.error('Error sending agent message:', error);
        socket.emit('message:error', { error: 'Failed to send message' });
      }
    });

    // Typing indicators
    socket.on('typing:start', (data: { conversationId: number; name: string }) => {
      socket.to(`conversation:${data.conversationId}`).emit('user:typing', {
        conversationId: data.conversationId,
        name: data.name
      });
    });

    socket.on('typing:stop', (data: { conversationId: number }) => {
      socket.to(`conversation:${data.conversationId}`).emit('user:stop-typing', {
        conversationId: data.conversationId
      });
    });

    // Mark messages as read
    socket.on('messages:read', async (data: { conversationId: number }) => {
      try {
        await db.update(inboxMessages2)
          .set({ 
            status: 'read', 
            readAt: new Date() 
          })
          .where(
            and(
              eq(inboxMessages2.conversationId, data.conversationId),
              eq(inboxMessages2.direction, 'inbound')
            )
          );

        // Reset unread count
        await db.update(inboxConversations)
          .set({ unreadCount: 0 })
          .where(eq(inboxConversations.id, data.conversationId));

        // Notify all participants
        io.to(`conversation:${data.conversationId}`).emit('messages:read', {
          conversationId: data.conversationId
        });
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });

    // Join live chat session room (for customers)
    socket.on('join:session', async (sessionId: string) => {
      socket.data.sessionId = sessionId;
      socket.join(`session:${sessionId}`);
      console.log(`Customer ${socket.id} joined session: ${sessionId}`);
      
      // Load message history for this session
      try {
        const [session] = await db.select()
          .from(livechatSessions)
          .where(eq(livechatSessions.sessionId, sessionId))
          .limit(1);
        
        if (session && session.conversationId) {
          // Fetch conversation messages
          const messages = await db.select()
            .from(inboxMessages2)
            .where(eq(inboxMessages2.conversationId, session.conversationId))
            .orderBy(inboxMessages2.createdAt);
          
          // Send message history to client
          socket.emit('message:history', { messages });
        }
      } catch (error) {
        console.error('Error loading message history:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('🔌 WebSocket client disconnected:', socket.id);
    });
  });

  console.log('✅ WebSocket server initialized');
  return io;
}
