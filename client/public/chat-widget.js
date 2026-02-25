(function() {
  'use strict';

  var config = window.bbChatConfig || {
    clientId: null,
    companyName: 'Support',
    primaryColor: '#0000FF',
    position: 'bottom-right',
    welcomeMessage: 'Hi! How can we help you today?',
    requireEmail: false,
    requireName: true,
    enableSound: true
  };

  if (!config.clientId) {
    console.error('/ chat Widget: clientId is required');
    return;
  }

  var apiEndpoint = config.apiEndpoint || (window.location.hostname === 'localhost' 
    ? window.location.origin 
    : 'https://businessblueprint.io');
  var sessionId = localStorage.getItem('bb-chat-session');
  var isOpen = false;
  var hasStartedChat = false;
  var messages = [];
  var visitorName = '';
  var visitorEmail = '';
  var socket = null;
  var conversationId = null;
  var widgetSettings = null;

  function generateId() {
    return 'sess_' + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return Math.floor(Math.random() * 16).toString(16);
    });
  }

  function loadSettings() {
    fetch(apiEndpoint + '/api/chat/widget/settings/' + config.clientId)
      .then(function(res) { return res.json(); })
      .then(function(data) {
        widgetSettings = data;
        config.companyName = data.companyName || config.companyName;
        config.primaryColor = data.primaryColor || config.primaryColor;
        config.position = data.position || config.position;
        config.welcomeMessage = data.welcomeMessage || config.welcomeMessage;
        config.requireEmail = data.requireEmail !== undefined ? data.requireEmail : config.requireEmail;
        config.requireName = data.requireName !== undefined ? data.requireName : config.requireName;
        config.enableSound = data.enableSound !== undefined ? data.enableSound : config.enableSound;
        initWidget();
      })
      .catch(function(err) {
        console.error('/ chat Widget: Failed to load settings', err);
        initWidget();
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

  function getWindowPosition() {
    switch(config.position) {
      case 'bottom-left': return 'bottom: 94px; left: 24px;';
      case 'top-right': return 'top: 94px; right: 24px;';
      case 'top-left': return 'top: 94px; left: 24px;';
      default: return 'bottom: 94px; right: 24px;';
    }
  }

  function injectStyles() {
    var styles = `
      #bb-chat-container * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; }
      #bb-chat-toggle { position: fixed; ${getPositionStyles()} width: 60px; height: 60px; border-radius: 50%; background: ${config.primaryColor}; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 999999; display: flex; align-items: center; justify-content: center; transition: transform 0.2s, box-shadow 0.2s; }
      #bb-chat-toggle:hover { transform: scale(1.05); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
      #bb-chat-toggle svg { width: 28px; height: 28px; fill: white; }
      #bb-chat-toggle .bb-unread-badge { position: absolute; top: -4px; right: -4px; background: #ef4444; color: white; font-size: 12px; font-weight: 600; min-width: 20px; height: 20px; border-radius: 10px; display: none; align-items: center; justify-content: center; }
      #bb-chat-widget { position: fixed; ${getWindowPosition()} width: 380px; max-height: 520px; background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); z-index: 999999; display: none; flex-direction: column; overflow: hidden; }
      #bb-chat-widget.open { display: flex; animation: bb-slide-in 0.3s ease; }
      @keyframes bb-slide-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .bb-chat-header { background: ${config.primaryColor}; color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
      .bb-chat-header-title { font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
      .bb-chat-header-status { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; }
      .bb-chat-header-actions { display: flex; gap: 8px; }
      .bb-chat-header-btn { background: rgba(255,255,255,0.2); border: none; color: white; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
      .bb-chat-header-btn:hover { background: rgba(255,255,255,0.3); }
      .bb-chat-content { flex: 1; overflow-y: auto; padding: 16px; background: #f9fafb; min-height: 300px; max-height: 360px; }
      .bb-chat-welcome { text-align: center; padding: 24px 16px; }
      .bb-chat-welcome h3 { font-size: 18px; margin: 0 0 8px 0; color: #1f2937; }
      .bb-chat-welcome p { font-size: 14px; color: #6b7280; margin: 0 0 20px 0; }
      .bb-chat-input-group { margin-bottom: 12px; }
      .bb-chat-input { width: 100%; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
      .bb-chat-input:focus { border-color: ${config.primaryColor}; box-shadow: 0 0 0 3px ${config.primaryColor}22; }
      .bb-chat-btn { width: 100%; padding: 12px; background: ${config.primaryColor}; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: opacity 0.2s; }
      .bb-chat-btn:hover { opacity: 0.9; }
      .bb-chat-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .bb-chat-messages { display: flex; flex-direction: column; gap: 12px; }
      .bb-chat-message { max-width: 80%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.4; }
      .bb-chat-message.inbound { background: ${config.primaryColor}; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
      .bb-chat-message.outbound { background: white; color: #1f2937; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .bb-chat-message-meta { font-size: 11px; opacity: 0.7; margin-top: 4px; }
      .bb-chat-message-sender { font-size: 12px; font-weight: 500; margin-bottom: 4px; opacity: 0.9; }
      .bb-chat-typing { font-size: 13px; color: #6b7280; font-style: italic; padding: 8px 0; }
      .bb-chat-footer { padding: 12px; border-top: 1px solid #e5e7eb; background: white; }
      .bb-chat-footer form { display: flex; gap: 8px; }
      .bb-chat-footer input { flex: 1; padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 24px; font-size: 14px; outline: none; transition: border-color 0.2s; }
      .bb-chat-footer input:focus { border-color: ${config.primaryColor}; }
      .bb-chat-footer button { width: 40px; height: 40px; background: ${config.primaryColor}; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: opacity 0.2s; }
      .bb-chat-footer button:hover { opacity: 0.9; }
      .bb-chat-footer button:disabled { opacity: 0.4; cursor: not-allowed; }
      .bb-chat-footer button svg { width: 18px; height: 18px; fill: white; }
      .bb-chat-empty { text-align: center; color: #9ca3af; padding: 40px 20px; font-size: 14px; }
      .bb-chat-powered { text-align: center; padding: 8px; font-size: 11px; color: #9ca3af; background: #f9fafb; border-top: 1px solid #e5e7eb; }
      .bb-chat-powered a { color: #6b7280; text-decoration: none; }
      .bb-chat-powered a:hover { text-decoration: underline; }
      @media (max-width: 420px) { 
        #bb-chat-widget { width: calc(100vw - 20px); max-height: calc(100vh - 120px); left: 10px; right: 10px; bottom: 80px !important; } 
      }
    `;
    var styleEl = document.createElement('style');
    styleEl.id = 'bb-chat-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  function createWidget() {
    var container = document.createElement('div');
    container.id = 'bb-chat-container';
    container.innerHTML = `
      <button id="bb-chat-toggle" aria-label="Open chat">
        <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
        <span class="bb-unread-badge">0</span>
      </button>
      <div id="bb-chat-widget">
        <div class="bb-chat-header">
          <div class="bb-chat-header-title">
            <span class="bb-chat-header-status"></span>
            <span id="bb-chat-company-name"></span>
          </div>
          <div class="bb-chat-header-actions">
            <button class="bb-chat-header-btn" id="bb-chat-minimize" title="Minimize">
              <svg width="14" height="2" viewBox="0 0 14 2"><rect fill="white" width="14" height="2" rx="1"/></svg>
            </button>
            <button class="bb-chat-header-btn" id="bb-chat-close" title="Close">
              <svg width="14" height="14" viewBox="0 0 14 14"><path fill="white" d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"/></svg>
            </button>
          </div>
        </div>
        <div class="bb-chat-content" id="bb-chat-content"></div>
        <div class="bb-chat-footer" id="bb-chat-footer" style="display:none;">
          <form id="bb-chat-form">
            <input type="text" id="bb-chat-input" placeholder="Type a message..." autocomplete="off">
            <button type="submit" id="bb-chat-send" disabled>
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
        <div class="bb-chat-powered">
          Powered by <a href="https://businessblueprint.io/chat" target="_blank">/ chat</a>
        </div>
      </div>
    `;
    document.body.appendChild(container);
    document.getElementById('bb-chat-company-name').textContent = config.companyName;
    bindEvents();
    
    if (sessionId) {
      resumeSession();
    } else {
      showWelcomeForm();
    }
  }

  function showWelcomeForm() {
    var content = document.getElementById('bb-chat-content');
    var nameRequired = config.requireName !== false;
    
    content.innerHTML = `
      <div class="bb-chat-welcome">
        <h3>Welcome! 👋</h3>
        <p id="bb-chat-welcome-message"></p>
        ${nameRequired ? `
        <div class="bb-chat-input-group">
          <input type="text" class="bb-chat-input" id="bb-chat-name" placeholder="Your name${nameRequired ? ' *' : ''}" ${nameRequired ? 'required' : ''}>
        </div>
        ` : ''}
        <div class="bb-chat-input-group">
          <input type="email" class="bb-chat-input" id="bb-chat-email" placeholder="Your email${config.requireEmail ? ' *' : ' (optional)'}">
        </div>
        <button class="bb-chat-btn" id="bb-chat-start" ${nameRequired ? 'disabled' : ''}>Start Chat</button>
      </div>
    `;
    document.getElementById('bb-chat-welcome-message').textContent = config.welcomeMessage;
    
    var nameInput = document.getElementById('bb-chat-name');
    var emailInput = document.getElementById('bb-chat-email');
    var startBtn = document.getElementById('bb-chat-start');

    function validateForm() {
      var nameValid = !nameRequired || (nameInput && nameInput.value.trim().length > 0);
      var emailValid = !config.requireEmail || (emailInput.value.includes('@') && emailInput.value.includes('.'));
      startBtn.disabled = !(nameValid && emailValid);
    }

    if (nameInput) nameInput.addEventListener('input', validateForm);
    if (emailInput) emailInput.addEventListener('input', validateForm);
    
    startBtn.addEventListener('click', function() {
      visitorName = nameInput ? nameInput.value.trim() : 'Visitor';
      visitorEmail = emailInput ? emailInput.value.trim() : '';
      startChat();
    });
  }

  function resumeSession() {
    fetch(apiEndpoint + '/api/chat/widget/messages/' + sessionId)
      .then(function(res) { 
        if (!res.ok) throw new Error('Session not found');
        return res.json(); 
      })
      .then(function(data) {
        messages = data.messages.map(function(m) {
          return {
            id: m.id.toString(),
            content: m.content,
            fromName: m.fromName,
            direction: m.direction,
            timestamp: m.createdAt
          };
        });
        hasStartedChat = true;
        document.getElementById('bb-chat-footer').style.display = 'block';
        showMessages();
        connectSocket();
      })
      .catch(function() {
        sessionId = null;
        localStorage.removeItem('bb-chat-session');
        showWelcomeForm();
      });
  }

  function startChat() {
    sessionId = generateId();
    localStorage.setItem('bb-chat-session', sessionId);
    
    fetch(apiEndpoint + '/api/chat/widget/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: parseInt(config.clientId),
        sessionId: sessionId,
        visitorName: visitorName,
        visitorEmail: visitorEmail || undefined,
        pageUrl: window.location.href,
        pageTitle: document.title,
        referrer: document.referrer,
        userAgent: navigator.userAgent
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      conversationId = data.conversationId;
      hasStartedChat = true;
      document.getElementById('bb-chat-footer').style.display = 'block';
      showMessages();
      connectSocket();
      trackEvent('conversation_started');
    })
    .catch(function(err) {
      console.error('/ chat: Failed to start session', err);
    });
  }

  function showMessages() {
    var content = document.getElementById('bb-chat-content');
    if (messages.length === 0) {
      content.innerHTML = '<div class="bb-chat-empty">Send a message to start the conversation</div>';
    } else {
      content.innerHTML = '<div class="bb-chat-messages" id="bb-chat-messages">' + 
        messages.map(function(msg) {
          return '<div class="bb-chat-message ' + escapeHtml(msg.direction) + '">' +
            (msg.direction === 'outbound' ? '<div class="bb-chat-message-sender">' + escapeHtml(msg.fromName || 'Support') + '</div>' : '') +
            '<div>' + escapeHtml(msg.content) + '</div>' +
            '<div class="bb-chat-message-meta">' + formatTime(msg.timestamp) + '</div>' +
          '</div>';
        }).join('') + 
      '</div>';
      content.scrollTop = content.scrollHeight;
    }
  }

  function connectSocket() {
    if (typeof io === 'undefined') {
      var script = document.createElement('script');
      script.src = apiEndpoint + '/socket.io/socket.io.js';
      script.onload = function() { initSocket(); };
      script.onerror = function() { console.warn('/ chat: WebSocket unavailable, using polling'); };
      document.head.appendChild(script);
    } else {
      initSocket();
    }
  }

  function initSocket() {
    try {
      socket = io(apiEndpoint, {
        auth: { sessionId: sessionId, role: 'visitor' },
        transports: ['websocket', 'polling']
      });

      socket.on('connect', function() {
        socket.emit('join:session', sessionId);
        updateStatus(true);
      });

      socket.on('disconnect', function() {
        updateStatus(false);
      });

      socket.on('chat:message', function(data) {
        if (data.direction === 'outbound') {
          messages.push({
            id: data.id || generateId(),
            content: data.content,
            fromName: data.fromName,
            direction: 'outbound',
            timestamp: data.timestamp || new Date().toISOString()
          });
          showMessages();
          if (config.enableSound && !isOpen) playSound();
          if (!isOpen) showUnreadBadge();
        }
      });

      socket.on('agent:typing', function() {
        showTyping(true);
      });

      socket.on('agent:stop-typing', function() {
        showTyping(false);
      });
    } catch(e) {
      console.warn('/ chat: Socket connection failed', e);
    }
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

    fetch(apiEndpoint + '/api/chat/widget/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId,
        content: text,
        messageType: 'text'
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (socket && socket.connected) {
        socket.emit('chat:message', {
          sessionId: sessionId,
          conversationId: conversationId,
          content: text,
          visitorName: visitorName
        });
      }
    })
    .catch(function(err) {
      console.error('/ chat: Failed to send message', err);
    });
  }

  function showTyping(show) {
    var content = document.getElementById('bb-chat-content');
    var existing = document.getElementById('bb-chat-typing');
    if (show && !existing) {
      var div = document.createElement('div');
      div.id = 'bb-chat-typing';
      div.className = 'bb-chat-typing';
      div.textContent = 'Agent is typing...';
      content.appendChild(div);
      content.scrollTop = content.scrollHeight;
    } else if (!show && existing) {
      existing.remove();
    }
  }

  function updateStatus(connected) {
    var status = document.querySelector('.bb-chat-header-status');
    if (status) {
      status.style.background = connected ? '#4ade80' : '#f87171';
    }
  }

  function showUnreadBadge() {
    var badge = document.querySelector('.bb-unread-badge');
    if (badge) {
      var count = parseInt(badge.textContent) || 0;
      badge.textContent = count + 1;
      badge.style.display = 'flex';
    }
  }

  function hideUnreadBadge() {
    var badge = document.querySelector('.bb-unread-badge');
    if (badge) {
      badge.textContent = '0';
      badge.style.display = 'none';
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
    if (!ts) return '';
    var d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function trackEvent(eventType, data) {
    fetch(apiEndpoint + '/api/chat/widget/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: parseInt(config.clientId),
        eventType: eventType,
        eventData: data || {}
      })
    }).catch(function() {});
  }

  function bindEvents() {
    var toggle = document.getElementById('bb-chat-toggle');
    var widget = document.getElementById('bb-chat-widget');
    var closeBtn = document.getElementById('bb-chat-close');
    var minimizeBtn = document.getElementById('bb-chat-minimize');
    var form = document.getElementById('bb-chat-form');
    var input = document.getElementById('bb-chat-input');
    var sendBtn = document.getElementById('bb-chat-send');

    toggle.addEventListener('click', function() {
      isOpen = true;
      widget.classList.add('open');
      toggle.style.display = 'none';
      hideUnreadBadge();
      trackEvent('widget_opened');
      if (hasStartedChat) {
        setTimeout(function() {
          var content = document.getElementById('bb-chat-content');
          if (content) content.scrollTop = content.scrollHeight;
        }, 100);
      }
    });

    closeBtn.addEventListener('click', function() {
      isOpen = false;
      widget.classList.remove('open');
      toggle.style.display = 'flex';
      trackEvent('widget_closed');
    });

    minimizeBtn.addEventListener('click', function() {
      isOpen = false;
      widget.classList.remove('open');
      toggle.style.display = 'flex';
    });

    input.addEventListener('input', function() {
      sendBtn.disabled = !input.value.trim();
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var text = input.value.trim();
      if (text) {
        sendMessage(text);
        input.value = '';
        sendBtn.disabled = true;
      }
    });
  }

  function initWidget() {
    injectStyles();
    createWidget();
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadSettings);
    } else {
      loadSettings();
    }
  }

  init();

  window.BBChat = {
    open: function() { 
      var toggle = document.getElementById('bb-chat-toggle');
      if (toggle) toggle.click();
    },
    close: function() { 
      var close = document.getElementById('bb-chat-close');
      if (close) close.click();
    },
    sendMessage: function(text) {
      if (hasStartedChat && text) {
        sendMessage(text);
      }
    }
  };
})();
