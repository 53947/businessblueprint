(function() {
  'use strict';

  var config = window.bbLiveChatConfig || {
    clientId: '1',
    companyName: 'Business Blueprint',
    primaryColor: '#F97316',
    position: 'bottom-right',
    welcomeMessage: 'Hi! How can we help you today?',
    requireEmail: false,
    enableSound: true
  };

  var apiEndpoint = config.apiEndpoint || 'https://businessblueprint.io';
  var sessionId = localStorage.getItem('bb-livechat-session') || generateId();
  localStorage.setItem('bb-livechat-session', sessionId);

  var isOpen = false;
  var hasStartedChat = false;
  var messages = [];
  var visitorName = '';
  var visitorEmail = '';
  var socket = null;
  var conversationId = null;

  function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function getPositionStyles() {
    switch(config.position) {
      case 'bottom-left': return 'bottom: 24px; left: 24px;';
      case 'top-right': return 'top: 24px; right: 24px;';
      case 'top-left': return 'top: 24px; left: 24px;';
      default: return 'bottom: 24px; right: 24px;';
    }
  }

  function injectStyles() {
    var styles = `
      #bb-livechat-container * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      #bb-livechat-toggle { position: fixed; ${getPositionStyles()} width: 60px; height: 60px; border-radius: 50%; background: ${config.primaryColor}; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 999999; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
      #bb-livechat-toggle:hover { transform: scale(1.1); }
      #bb-livechat-toggle svg { width: 28px; height: 28px; fill: white; }
      #bb-livechat-widget { position: fixed; ${getPositionStyles()} width: 380px; height: 520px; background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); z-index: 999999; display: none; flex-direction: column; overflow: hidden; }
      #bb-livechat-widget.open { display: flex; }
      .bb-header { background: ${config.primaryColor}; color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
      .bb-header-title { font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
      .bb-header-status { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; }
      .bb-header-actions { display: flex; gap: 8px; }
      .bb-header-btn { background: rgba(255,255,255,0.2); border: none; color: white; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      .bb-header-btn:hover { background: rgba(255,255,255,0.3); }
      .bb-content { flex: 1; overflow-y: auto; padding: 16px; background: #f9fafb; }
      .bb-welcome { text-align: center; padding: 24px 16px; }
      .bb-welcome h3 { font-size: 18px; margin: 0 0 8px 0; color: #1f2937; }
      .bb-welcome p { font-size: 14px; color: #6b7280; margin: 0 0 20px 0; }
      .bb-input-group { margin-bottom: 12px; }
      .bb-input { width: 100%; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; }
      .bb-input:focus { border-color: ${config.primaryColor}; box-shadow: 0 0 0 3px ${config.primaryColor}22; }
      .bb-btn { width: 100%; padding: 12px; background: ${config.primaryColor}; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; }
      .bb-btn:hover { opacity: 0.9; }
      .bb-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .bb-messages { display: flex; flex-direction: column; gap: 12px; }
      .bb-message { max-width: 80%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.4; }
      .bb-message.inbound { background: ${config.primaryColor}; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
      .bb-message.outbound { background: white; color: #1f2937; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .bb-message-meta { font-size: 11px; opacity: 0.7; margin-top: 4px; }
      .bb-message-sender { font-size: 12px; font-weight: 500; margin-bottom: 4px; }
      .bb-typing { font-size: 13px; color: #6b7280; font-style: italic; padding: 8px 0; }
      .bb-footer { padding: 12px; border-top: 1px solid #e5e7eb; background: white; }
      .bb-footer form { display: flex; gap: 8px; }
      .bb-footer input { flex: 1; padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 24px; font-size: 14px; outline: none; }
      .bb-footer input:focus { border-color: ${config.primaryColor}; }
      .bb-footer button { width: 40px; height: 40px; background: ${config.primaryColor}; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      .bb-footer button:disabled { opacity: 0.5; }
      .bb-footer button svg { width: 18px; height: 18px; fill: white; }
      .bb-empty { text-align: center; color: #9ca3af; padding: 40px 20px; font-size: 14px; }
      @media (max-width: 420px) { #bb-livechat-widget { width: calc(100vw - 20px); height: calc(100vh - 100px); left: 10px; right: 10px; bottom: 80px; } }
    `;
    var styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  function createWidget() {
    var container = document.createElement('div');
    container.id = 'bb-livechat-container';
    container.innerHTML = `
      <button id="bb-livechat-toggle" aria-label="Open chat">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
      </button>
      <div id="bb-livechat-widget">
        <div class="bb-header">
          <div class="bb-header-title">
            <span class="bb-header-status"></span>
            <span id="bb-company-name"></span>
          </div>
          <div class="bb-header-actions">
            <button class="bb-header-btn" id="bb-minimize" title="Minimize">
              <svg width="14" height="2" viewBox="0 0 14 2"><rect fill="white" width="14" height="2" rx="1"/></svg>
            </button>
            <button class="bb-header-btn" id="bb-close" title="Close">
              <svg width="14" height="14" viewBox="0 0 14 14"><path fill="white" d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/></svg>
            </button>
          </div>
        </div>
        <div class="bb-content" id="bb-content"></div>
        <div class="bb-footer" id="bb-footer" style="display:none;">
          <form id="bb-message-form">
            <input type="text" id="bb-message-input" placeholder="Type a message..." autocomplete="off">
            <button type="submit" id="bb-send-btn" disabled>
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
      </div>
    `;
    document.getElementById('bb-company-name').textContent = config.companyName;
    document.body.appendChild(container);
    bindEvents();
    showWelcomeForm();
  }

  function showWelcomeForm() {
    var content = document.getElementById('bb-content');
    content.innerHTML = `
      <div class="bb-welcome">
        <h3>Welcome! 👋</h3>
        <p id="bb-welcome-message"></p>
        <div class="bb-input-group">
          <input type="text" class="bb-input" id="bb-name-input" placeholder="Your name *" required>
        </div>
        ${config.requireEmail ? `
        <div class="bb-input-group">
          <input type="email" class="bb-input" id="bb-email-input" placeholder="Your email *" required>
        </div>
        ` : `
        <div class="bb-input-group">
          <input type="email" class="bb-input" id="bb-email-input" placeholder="Your email (optional)">
        </div>
        `}
        <button class="bb-btn" id="bb-start-chat" disabled>Start Chat</button>
      </div>
    `;
    document.getElementById('bb-welcome-message').textContent = config.welcomeMessage;
    var nameInput = document.getElementById('bb-name-input');
    var emailInput = document.getElementById('bb-email-input');
    var startBtn = document.getElementById('bb-start-chat');

    function validateForm() {
      var nameValid = nameInput.value.trim().length > 0;
      var emailValid = !config.requireEmail || (emailInput.value.includes('@') && emailInput.value.includes('.'));
      startBtn.disabled = !(nameValid && emailValid);
    }

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    startBtn.addEventListener('click', function() {
      visitorName = nameInput.value.trim();
      visitorEmail = emailInput.value.trim();
      startChat();
    });
  }

  function startChat() {
    hasStartedChat = true;
    document.getElementById('bb-footer').style.display = 'block';
    showMessages();
    connectSocket();
    
    fetch(apiEndpoint + '/api/inbox/livechat/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: config.clientId,
        sessionId: sessionId,
        visitorName: visitorName,
        visitorEmail: visitorEmail,
        pageUrl: window.location.href,
        pageTitle: document.title,
        referrer: document.referrer,
        userAgent: navigator.userAgent
      })
    }).catch(function(err) { console.log('Session creation error:', err); });
  }

  function showMessages() {
    var content = document.getElementById('bb-content');
    content.innerHTML = '';
    if (messages.length === 0) {
      var emptyDiv = document.createElement('div');
      emptyDiv.className = 'bb-empty';
      emptyDiv.textContent = 'Send a message to start the conversation';
      content.appendChild(emptyDiv);
    } else {
      var container = document.createElement('div');
      container.className = 'bb-messages';
      container.id = 'bb-messages';
      messages.forEach(function(msg) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'bb-message ' + msg.direction;
        if (msg.direction === 'outbound') {
          var senderDiv = document.createElement('div');
          senderDiv.className = 'bb-message-sender';
          senderDiv.textContent = msg.fromName || '';
          messageDiv.appendChild(senderDiv);
        }
        var bodyDiv = document.createElement('div');
        bodyDiv.textContent = msg.content || '';
        messageDiv.appendChild(bodyDiv);
        var metaDiv = document.createElement('div');
        metaDiv.className = 'bb-message-meta';
        metaDiv.textContent = formatTime(msg.timestamp);
        messageDiv.appendChild(metaDiv);
        container.appendChild(messageDiv);
      });
      content.appendChild(container);
      content.scrollTop = content.scrollHeight;
    }
  }

  function connectSocket() {
    if (typeof io === 'undefined') {
      var script = document.createElement('script');
      script.src = apiEndpoint + '/socket.io/socket.io.js';
      script.onload = function() { initSocket(); };
      document.head.appendChild(script);
    } else {
      initSocket();
    }
  }

  function initSocket() {
    socket = io(apiEndpoint, {
      auth: { sessionId: sessionId, role: 'customer' },
      transports: ['websocket', 'polling']
    });

    socket.on('connect', function() {
      socket.emit('join:session', sessionId);
      updateStatus(true);
    });

    socket.on('disconnect', function() {
      updateStatus(false);
    });

    socket.on('agent:message', function(data) {
      messages.push({
        id: data.id || generateId(),
        content: data.message,
        fromName: data.agentName,
        direction: 'outbound',
        timestamp: data.timestamp
      });
      showMessages();
      if (config.enableSound) playSound();
    });

    socket.on('message:history', function(data) {
      messages = data.messages.map(function(msg) {
        return {
          id: msg.id.toString(),
          content: msg.content,
          fromName: msg.direction === 'inbound' ? visitorName : msg.fromName,
          direction: msg.direction,
          timestamp: msg.createdAt
        };
      });
      if (data.messages.length > 0 && data.messages[0].conversationId) {
        conversationId = data.messages[0].conversationId;
        socket.emit('join:conversation', conversationId);
      }
      showMessages();
    });

    socket.on('message:sent', function(data) {
      if (!conversationId) {
        conversationId = data.conversationId;
        socket.emit('join:conversation', conversationId);
      }
    });

    socket.on('user:typing', function() {
      showTyping(true);
    });

    socket.on('user:stop-typing', function() {
      showTyping(false);
    });
  }

  function sendMessage(text) {
    var msg = {
      id: generateId(),
      content: text,
      fromName: visitorName,
      direction: 'inbound',
      timestamp: new Date().toISOString()
    };
    messages.push(msg);
    showMessages();

    if (socket) {
      socket.emit('chat:message', {
        sessionId: sessionId,
        conversationId: conversationId,
        message: text,
        visitorName: visitorName,
        visitorEmail: visitorEmail,
        clientId: config.clientId
      });
    }
  }

  function showTyping(show) {
    var content = document.getElementById('bb-content');
    var existing = document.getElementById('bb-typing-indicator');
    if (show && !existing) {
      var div = document.createElement('div');
      div.id = 'bb-typing-indicator';
      div.className = 'bb-typing';
      div.textContent = 'Agent is typing...';
      content.appendChild(div);
      content.scrollTop = content.scrollHeight;
    } else if (!show && existing) {
      existing.remove();
    }
  }

  function updateStatus(connected) {
    var status = document.querySelector('.bb-header-status');
    if (status) {
      status.style.background = connected ? '#4ade80' : '#f87171';
    }
  }

  function playSound() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.1;
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  }

  function formatTime(ts) {
    var d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function bindEvents() {
    var toggle = document.getElementById('bb-livechat-toggle');
    var widget = document.getElementById('bb-livechat-widget');
    var closeBtn = document.getElementById('bb-close');
    var minimizeBtn = document.getElementById('bb-minimize');
    var form = document.getElementById('bb-message-form');
    var input = document.getElementById('bb-message-input');
    var sendBtn = document.getElementById('bb-send-btn');

    toggle.addEventListener('click', function() {
      isOpen = true;
      widget.classList.add('open');
      toggle.style.display = 'none';
    });

    closeBtn.addEventListener('click', function() {
      isOpen = false;
      widget.classList.remove('open');
      toggle.style.display = 'flex';
    });

    minimizeBtn.addEventListener('click', function() {
      isOpen = false;
      widget.classList.remove('open');
      toggle.style.display = 'flex';
    });

    input.addEventListener('input', function() {
      sendBtn.disabled = !input.value.trim();
      if (socket && conversationId) {
        socket.emit('typing:start', { conversationId: conversationId, name: visitorName });
      }
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var text = input.value.trim();
      if (text) {
        sendMessage(text);
        input.value = '';
        sendBtn.disabled = true;
        if (socket && conversationId) {
          socket.emit('typing:stop', { conversationId: conversationId });
        }
      }
    });
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        injectStyles();
        createWidget();
      });
    } else {
      injectStyles();
      createWidget();
    }
  }

  init();

  window.BBLiveChat = {
    open: function() { document.getElementById('bb-livechat-toggle').click(); },
    close: function() { document.getElementById('bb-close').click(); },
    init: init
  };
})();
