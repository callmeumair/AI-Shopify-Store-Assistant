'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Trash2, Download, Send, Zap, ChevronDown, ChevronRight, 
  Package, ShoppingBag, BarChart3, Users, Tags, FileText, Settings, AlertTriangle, Check
} from 'lucide-react';
import { TypewriterText } from '@/components/ui/TypewriterText';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  toolCall?: {
    name: string;
    status: 'running' | 'completed';
    duration?: string;
    result?: any;
  };
};

const SUGGESTED_PROMPTS = [
  { icon: Package, text: "Which products are low on inventory?" },
  { icon: ShoppingBag, text: "Show me unfulfilled orders from today" },
  { icon: BarChart3, text: "What was our total revenue last week?" },
  { icon: Users, text: "Find the top 5 customers by lifetime value" },
  { icon: Tags, text: "Create a 15% off discount code for summer" },
  { icon: FileText, text: "Draft a reorder email for the Leather Wallet" },
  { icon: AlertTriangle, text: "Are there any cancelled orders needing refunds?" },
  { icon: Settings, text: "Update the price of the Silk Tie to $45" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleInputResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    handleInputResize();
  }, [inputValue]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI response sequence
    setTimeout(() => {
      // 1. Tool call starts
      const toolMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: toolMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCall: {
          name: text.toLowerCase().includes('inventory') ? 'get_inventory_levels' : 'query_shopify_data',
          status: 'running'
        }
      }]);

      setTimeout(() => {
        // 2. Tool call completes
        setMessages(prev => prev.map(m => m.id === toolMsgId ? {
          ...m,
          toolCall: {
            ...m.toolCall!,
            status: 'completed',
            duration: '340ms',
            result: {
              status: 200,
              data: [
                { id: 101, title: 'Air Max Runner', inventory_quantity: 2 },
                { id: 102, title: 'Leather Wallet', inventory_quantity: 1 }
              ]
            }
          }
        } : m));

        setTimeout(() => {
          // 3. Final response text
          setIsThinking(false);
          setMessages(prev => [...prev, {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: "I've checked your inventory. The **Air Max Runner** (2 left) and **Leather Wallet** (1 left) are running low. Would you like me to draft a reorder request?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 800);
      }, 1500);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTool = (id: string) => {
    const newSet = new Set(expandedTools);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedTools(newSet);
  };

  const syntaxHighlight = (json: any) => {
    const str = JSON.stringify(json, null, 2);
    return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'text-[var(--blue-bright)]'; // value string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-[var(--cyan-bright)]'; // key
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-[var(--violet-bright)]'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-[var(--text-muted)]'; // null
      } else {
        cls = 'text-[var(--emerald-bright)]'; // number
      }
      return `<span class="${cls}">${match}</span>`;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] -m-6">
      {/* Top Bar */}
      <div className="h-14 border-b border-[var(--border-subtle)] bg-[var(--surface-0)]/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h2 className="font-semibold text-white text-sm">AI Store Assistant</h2>
            <span className="text-xs text-[var(--text-muted)]">Claude claude-opus-4-8 • Connected to Shopify</span>
          </div>
          <div className="badge badge-green ml-2">Online</div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMessages([])} 
            className="p-2 text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface-2)] rounded-lg transition-colors"
            aria-label="Clear chat"
            title="Clear chat"
          >
            <Trash2 size={18} />
          </button>
          <button 
            className="p-2 text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface-2)] rounded-lg transition-colors"
            aria-label="Export chat"
            title="Export chat"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-[var(--void)]">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center mt-10"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] p-[1px] mb-6 shadow-[0_0_40px_var(--violet-glow)]">
                  <div className="w-full h-full bg-[var(--surface-1)] rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-[var(--cyan-bright)]" size={32} />
                  </div>
                </div>
                <h2 className="font-display font-bold text-3xl text-white mb-3">How can I help manage your store?</h2>
                <p className="text-[var(--text-secondary)] mb-12 max-w-md">
                  I can analyze data, manage inventory, draft emails, and execute workflows. Just ask in plain English.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(prompt.text)}
                      className="glass-card p-4 flex items-center gap-3 text-left hover:border-[var(--cyan-glow)] hover:bg-[var(--surface-2)] transition-all group"
                    >
                      <div className="p-2 rounded-lg bg-[var(--surface-3)] text-[var(--text-secondary)] group-hover:text-[var(--cyan-bright)] group-hover:bg-[var(--cyan-glow)] transition-colors">
                        <prompt.icon size={18} />
                      </div>
                      <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-white transition-colors">
                        {prompt.text}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--blue)] flex items-center justify-center shadow-[0_0_10px_var(--cyan-glow)]">
                        <Zap size={14} className="text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.toolCall ? (
                      // Tool Call Visualization
                      <div className="w-full max-w-2xl bg-[var(--surface-1)] border border-[rgba(139,92,246,0.3)] rounded-xl overflow-hidden shadow-[0_4px_20px_var(--violet-glow)]">
                        <button 
                          onClick={() => toggleTool(msg.id)}
                          className="w-full px-4 py-3 bg-[var(--violet-glow)] flex items-center justify-between hover:bg-[rgba(139,92,246,0.18)] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Zap size={16} className="text-[var(--violet-bright)]" />
                            <span className="font-mono text-sm font-semibold text-[var(--violet-bright)]">
                              {msg.toolCall.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            {msg.toolCall.status === 'running' ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-[var(--violet-bright)]">Running</span>
                                <div className="w-16 h-1.5 bg-[var(--surface-3)] rounded-full overflow-hidden relative">
                                  <div className="absolute top-0 left-0 h-full w-1/2 bg-[var(--violet)] rounded-full animate-[shimmer_1s_infinite] bg-[length:200%_100%]"></div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-[var(--emerald)]">
                                <Check size={14} />
                                <span className="text-xs font-mono">Completed in {msg.toolCall.duration}</span>
                              </div>
                            )}
                            {expandedTools.has(msg.id) ? 
                              <ChevronDown size={16} className="text-[var(--text-muted)]" /> : 
                              <ChevronRight size={16} className="text-[var(--text-muted)]" />
                            }
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedTools.has(msg.id) && msg.toolCall.result && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-[rgba(139,92,246,0.2)]"
                            >
                              <div className="p-4 bg-[#0A0F1C] overflow-x-auto text-xs font-mono whitespace-pre">
                                <div dangerouslySetInnerHTML={{ __html: syntaxHighlight(msg.toolCall.result) }} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : msg.content ? (
                      // Regular Message Bubble
                      <div className="group relative">
                        <div className={`px-5 py-3.5 ${
                          msg.role === 'user' 
                            ? 'bg-[var(--surface-2)] border border-[var(--border-strong)] rounded-2xl rounded-tr-sm text-white' 
                            : 'bg-[var(--surface-1)] border-l-2 border-l-[var(--cyan)] border-y border-r border-[var(--border-default)] rounded-xl text-[var(--text-primary)] leading-relaxed'
                        }`}>
                          {msg.role === 'assistant' && index === messages.length - 1 ? (
                            <TypewriterText text={msg.content} speed={15} />
                          ) : (
                            msg.content
                          )}
                        </div>
                        {msg.role === 'assistant' && (
                          <button className="absolute -right-8 top-2 p-1.5 text-[var(--text-muted)] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--surface-2)] rounded border border-[var(--border-subtle)]" title="Copy to clipboard">
                            <span className="text-[10px] uppercase font-bold">Copy</span>
                          </button>
                        )}
                      </div>
                    ) : null}
                    
                    <span className={`text-[10px] text-[var(--text-muted)] mt-1.5 px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
            
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex w-full justify-start"
              >
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center border border-[var(--border-subtle)]">
                    <Zap size={14} className="text-[var(--text-muted)]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface-1)] rounded-xl border border-[var(--border-default)] text-sm text-[var(--text-muted)]">
                  <span className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full" style={{ animation: 'pulse-dot 1s infinite 0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full" style={{ animation: 'pulse-dot 1s infinite 200ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full" style={{ animation: 'pulse-dot 1s infinite 400ms' }}></span>
                  </span>
                  <span>StoreSync is thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-[var(--surface-1)] border-t border-[var(--border-default)] p-4 md:p-6 pb-8 md:pb-6 relative z-10">
        <div className="max-w-4xl mx-auto relative">
          <div className="relative flex items-end shadow-lg rounded-xl bg-[var(--surface-0)] border border-[var(--border-strong)] focus-within:border-[var(--cyan)] focus-within:box-shadow-[0_0_0_3px_var(--cyan-glow)] transition-all">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask StoreSync anything..."
              className="w-full max-h-[120px] bg-transparent border-none focus:outline-none resize-none py-4 pl-5 pr-14 text-white text-sm placeholder-[var(--text-muted)]"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isThinking}
              className="absolute right-2 bottom-2 p-2 rounded-lg bg-[var(--cyan)] text-[#03050A] disabled:opacity-30 disabled:bg-[var(--surface-3)] disabled:text-[var(--text-muted)] transition-all hover:bg-[var(--cyan-bright)]"
            >
              <Send size={18} className={inputValue.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
            </button>
          </div>
          <div className="text-center mt-3">
            <p className="text-[11px] text-[var(--text-muted)]">
              StoreSync AI can make mistakes. Verify important actions in your Shopify admin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
