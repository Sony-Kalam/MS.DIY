import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Smile, Bot, User, RefreshCw, AlertCircle } from 'lucide-react';

export const N8N_WEBHOOK_URL = 'https://sony-kalam.app.n8n.cloud/webhook/7296a08f-5bc0-4d3f-ae61-cfc1be145086/chat';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface N8nChatProps {
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const N8nChat: React.FC<N8nChatProps> = ({ isOpenExternal, onCloseExternal }) => {
  const [n8nLoaded, setN8nLoaded] = useState(false);
  const [isFallbackOpen, setIsFallbackOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hi there! 👋 Welcome to MS.DIY! Ask me anything about our cute stationery, DIY kits, or custom photo printing!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `ms-diy-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize official n8n chat widget via CDN
  useEffect(() => {
    let isMounted = true;

    const initN8nChat = async () => {
      try {
        // Try importing official n8n ESM bundle
        // @ts-ignore
        const n8nModule = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        
        if (isMounted && n8nModule && typeof n8nModule.createChat === 'function') {
          // Avoid duplicate initialization
          if (!document.querySelector('.n8n-chat') && !document.querySelector('.n8n-chat-widget')) {
            n8nModule.createChat({
              webhookUrl: N8N_WEBHOOK_URL,
              mode: 'window',
              showWelcomeScreen: false,
              defaultLanguage: 'en',
              initialMessages: [
                'Hi there! 👋 Welcome to MS.DIY! How can I help you today with stationery, DIY craft kits, or custom photo printing?'
              ],
              i18n: {
                en: {
                  title: 'MS.DIY Assistant ✨',
                  subtitle: 'Cute Stationery & Custom Photo Support',
                  footer: '',
                  getStarted: 'New Conversation',
                  inputPlaceholder: 'Ask a question...',
                  closeButtonTooltip: 'Close chat',
                },
              },
            });
          }
          setN8nLoaded(true);
        }
      } catch (err) {
        console.warn('n8n CDN widget not available, using built-in interactive fallback:', err);
        if (isMounted) {
          setN8nLoaded(false);
        }
      }
    };

    initN8nChat();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle external open trigger (e.g. from navbar or footer)
  useEffect(() => {
    if (isOpenExternal) {
      // If official n8n chat is loaded, try clicking its toggle button
      const n8nToggle = document.querySelector('.n8n-chat-toggle') as HTMLElement | null;
      if (n8nToggle) {
        n8nToggle.click();
        if (onCloseExternal) onCloseExternal();
      } else {
        setIsFallbackOpen(true);
      }
    }
  }, [isOpenExternal, onCloseExternal]);

  useEffect(() => {
    if (isFallbackOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isFallbackOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // POST to n8n chat webhook
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: userText,
          message: userText,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      let replyText = 'Thanks for your message! Our MS.DIY team is here to help.';
      if (typeof data === 'string') {
        replyText = data;
      } else if (Array.isArray(data) && data[0]?.output) {
        replyText = data[0].output;
      } else if (data?.output) {
        replyText = data.output;
      } else if (data?.text) {
        replyText = data.text;
      } else if (data?.message) {
        replyText = data.message;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error('Error communicating with n8n webhook:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-err-${Date.now()}`,
          sender: 'bot',
          text: "I received your question! Note: If the n8n workflow is currently in draft or inactive mode, responses will resume once activated. Feel free to explore our cute catalog or custom photo studio in the meantime! ✨",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // If official n8n chat loaded, let it display its own floating button.
  // But if it's not loaded or user opens fallback, show our friendly fallback!
  return (
    <>
      {/* If n8n widget didn't load from CDN, display our fallback floating trigger */}
      {!n8nLoaded && !isFallbackOpen && (
        <button
          onClick={() => setIsFallbackOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-[#E07A5F] hover:bg-[#CC684F] text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center group cursor-pointer border-2 border-white"
          aria-label="Open MS.DIY Chat Assistant"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-bold text-xs pl-0 group-hover:pl-2">
            Chat With Us ✨
          </span>
        </button>
      )}

      {/* Fallback Chat Window Modal/Drawer */}
      {isFallbackOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[380px] h-[550px] bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#F7D6C8] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-[#E07A5F] to-[#CC684F] text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-lg">
                ✨
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm leading-tight flex items-center gap-1">
                  <span>MS.DIY Assistant</span>
                  <span className="text-xs">💬</span>
                </h3>
                <div className="text-[11px] text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Powered by n8n Webhook</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsFallbackOpen(false);
                if (onCloseExternal) onCloseExternal();
              }}
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Helpful Prompts */}
          <div className="px-3 py-2 bg-[#FFF5EE] border-b border-[#F7D6C8] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
            <span className="text-[#E07A5F] font-bold shrink-0">Ask:</span>
            {[
              'How to upload photo?',
              'Shipping times?',
              'Kid safe materials?',
              'Promo codes?',
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setInputMessage(prompt);
                }}
                className="px-2.5 py-1 bg-white border border-[#F7D6C8] text-[#4A4E69] rounded-full hover:bg-[#FFEAE0] hover:text-[#E07A5F] transition-colors shrink-0 cursor-pointer font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFFDF9]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#FFF0EB] text-[#E07A5F] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-[#F7D6C8]">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E07A5F] text-white rounded-br-xs shadow-xs font-medium'
                      : 'bg-white text-[#2B2D42] rounded-bl-xs border border-[#F7D6C8] shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-white/70 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#E07A5F] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-xs text-slate-500 bg-[#FFF5EE] p-2.5 rounded-2xl w-fit border border-[#F7D6C8]">
                <div className="w-4 h-4 border-2 border-[#E07A5F] border-t-transparent rounded-full animate-spin" />
                <span>MS.DIY Assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-[#F7D6C8] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about stationery, custom photo..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#E07A5F] text-[#2B2D42]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-[#E07A5F] hover:bg-[#CC684F] text-white rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
