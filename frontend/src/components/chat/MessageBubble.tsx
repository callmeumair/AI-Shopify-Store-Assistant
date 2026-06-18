'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check, Wrench, ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { format } from 'date-fns';

export function MessageBubble({ message }: { message: any }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState<Record<string, boolean>>({});

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTool = (toolId: string) => {
    setToolsExpanded(prev => ({ ...prev, [toolId]: !prev[toolId] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx('flex gap-4 mb-6', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0 border border-accent-blue/50">
          <Bot size={18} className="text-accent-blue" />
        </div>
      )}

      <div className={clsx('max-w-[80%] flex flex-col', isUser ? 'items-end' : 'items-start')}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-text-muted font-medium">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          {message.timestamp && (
            <span className="text-[10px] text-text-muted">
              {format(new Date(message.timestamp), 'HH:mm')}
            </span>
          )}
        </div>

        <div className={clsx(
          'p-4 rounded-2xl relative group',
          isUser 
            ? 'bg-accent-blue text-white rounded-tr-sm' 
            : 'bg-bg-elevated border border-border text-text-primary rounded-tl-sm'
        )}>
          {/* Main content */}
          {message.content && (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.content}
            </div>
          )}

          {/* Tool Calls */}
          {message.toolCalls && message.toolCalls.map((tool: any, idx: number) => (
            <div key={idx} className="mt-3 bg-bg-primary rounded-lg border border-border overflow-hidden text-sm">
              <button 
                onClick={() => toggleTool(tool.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-bg-secondary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Wrench size={14} className="text-accent-cyan" />
                  <span className="font-medium text-text-secondary text-xs">
                    Calling: <span className="text-accent-cyan">{tool.name}</span>
                  </span>
                </div>
                {toolsExpanded[tool.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              
              {toolsExpanded[tool.id] && (
                <div className="p-3 border-t border-border bg-[#05080f]">
                  <div className="mb-2">
                    <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Input</span>
                    <pre className="text-xs text-accent-green monospace mt-1 overflow-x-auto p-2 bg-black/50 rounded">
                      {JSON.stringify(tool.args, null, 2)}
                    </pre>
                  </div>
                  {tool.result && (
                    <div>
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Result</span>
                      <pre className="text-xs text-text-secondary monospace mt-1 overflow-x-auto p-2 bg-black/50 rounded max-h-40">
                        {JSON.stringify(tool.result, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Copy Button */}
          {!isUser && (
            <button 
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bg-primary"
            >
              {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} className="text-text-muted hover:text-text-primary transition-colors" />}
            </button>
          )}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center shrink-0 border border-border">
          <User size={18} className="text-text-secondary" />
        </div>
      )}
    </motion.div>
  );
}
