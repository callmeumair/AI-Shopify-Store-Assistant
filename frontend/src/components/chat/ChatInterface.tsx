'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { SuggestedPrompts } from './SuggestedPrompts';

export function ChatInterface() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const text = overrideInput || input;
    if (!text.trim() || isLoading) return;

    setInput('');
    const userMsg = { role: 'user', content: text, timestamp: new Date().toISOString() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: text }],
          conversationHistory: messages.map(m => ({
             role: m.role, 
             content: m.content
          }))
        })
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let assistantMsg = { role: 'assistant', content: '', toolCalls: [] as any[], timestamp: new Date().toISOString() };
      setMessages([...newMessages, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'content_block_delta' && data.delta?.type === 'text_delta') {
                assistantMsg.content += data.delta.text;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...assistantMsg };
                  return updated;
                });
              } else if (data.type === 'content_block_start' && data.content_block?.type === 'tool_use') {
                 // For simplified tool tracking
                 assistantMsg.toolCalls.push({
                   id: data.content_block.id,
                   name: data.content_block.name,
                   args: data.content_block.input,
                   result: null
                 });
                 setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...assistantMsg };
                  return updated;
                 });
              }
            } catch (e) {
              console.warn('Failed to parse chunk:', line);
            }
          }
        }
      }
      
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-bg-primary rounded-xl overflow-hidden border border-border shadow-2xl relative z-10">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-bg-secondary flex justify-between items-center">
        <div>
          <h2 className="text-text-primary font-semibold">AI Store Assistant</h2>
          <p className="text-xs text-text-muted">Claude 3 Opus • Connected to Shopify</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green"></span>
          </span>
          <span className="text-xs text-text-muted">Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center mt-[-10%]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple p-0.5 mb-6 shadow-lg shadow-accent-blue/20">
              <div className="w-full h-full bg-bg-secondary rounded-[14px] flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">How can I help manage your store?</h1>
            <p className="text-text-secondary text-sm mb-8">
              I can check inventory, manage orders, answer customer questions, and more.
            </p>
            <SuggestedPrompts onSelect={(p) => handleSubmit(undefined, p)} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="flex gap-4 mb-6 justify-start items-center text-text-muted text-sm">
                <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0 border border-accent-blue/50">
                  <Loader2 size={18} className="text-accent-blue animate-spin" />
                </div>
                <div className="flex gap-1 items-center bg-bg-elevated px-4 py-2 rounded-2xl border border-border">
                  <span className="typing-dot w-1.5 h-1.5 bg-text-muted rounded-full"></span>
                  <span className="typing-dot w-1.5 h-1.5 bg-text-muted rounded-full"></span>
                  <span className="typing-dot w-1.5 h-1.5 bg-text-muted rounded-full"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-bg-secondary border-t border-border">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your store..."
            className="w-full bg-bg-primary border border-border rounded-xl pl-4 pr-12 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-accent-blue text-white disabled:opacity-50 disabled:bg-bg-elevated disabled:text-text-muted transition-all hover:bg-blue-600"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
