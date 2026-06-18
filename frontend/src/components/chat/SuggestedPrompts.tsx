'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Show me today's orders and revenue",
  "Which products are low on inventory?",
  "Create a new product called...",
  "What's our return policy?",
  "Show abandoned carts from this week",
  "List my top 5 selling products",
  "Update inventory for [product]",
  "Find orders from customer [name]",
];

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
      {SUGGESTED_PROMPTS.map((prompt, idx) => (
        <motion.button
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          onClick={() => onSelect(prompt)}
          className="flex items-center justify-between p-4 rounded-xl border border-border bg-bg-elevated/50 hover:bg-bg-elevated hover:border-border-glow transition-all group text-left"
        >
          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
            {prompt}
          </span>
          <ArrowUpRight size={16} className="text-text-muted group-hover:text-accent-blue transition-colors opacity-0 group-hover:opacity-100" />
        </motion.button>
      ))}
    </div>
  );
}
