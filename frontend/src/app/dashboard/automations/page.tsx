'use client';

import { motion } from 'framer-motion';
import { Zap, Plus, Play, Pause, Activity, Mail, Package, RefreshCw } from 'lucide-react';

const AUTOMATIONS = [
  { id: 1, name: 'Low Stock Reorder', desc: 'Alerts supplier when inventory drops below threshold.', status: 'active', runs: 24, lastRun: '2 hours ago', icon: Package, color: 'cyan' },
  { id: 2, name: 'Abandoned Cart Recovery', desc: 'Sends 3-part email sequence to recover lost sales.', status: 'active', runs: 156, lastRun: '15 mins ago', icon: Mail, color: 'blue' },
  { id: 3, name: 'Daily Revenue Report', desc: 'Sends summary of daily sales to Slack at 9PM.', status: 'paused', runs: 42, lastRun: '1 day ago', icon: Activity, color: 'violet' },
  { id: 4, name: 'Order Fulfillment Sync', desc: 'Syncs tracking numbers from 3PL to Shopify.', status: 'active', runs: 890, lastRun: '5 mins ago', icon: RefreshCw, color: 'emerald' },
];

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-white mb-1">Workflow Automations</h2>
          <p className="text-sm text-[var(--text-secondary)]">Manage n8n workflows connected to your store.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} /> Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AUTOMATIONS.map((automation, i) => (
          <motion.div 
            key={automation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-6 flex flex-col hover:border-[var(--${automation.color}-glow)] transition-colors group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--surface-2)] border border-[rgba(var(--${automation.color}-rgb),0.2)] group-hover:bg-[var(--${automation.color}-glow)] transition-colors`}>
                  <automation.icon className={`text-[var(--${automation.color}-bright)]`} size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-[var(--${automation.color}-bright)] transition-colors">{automation.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`flex h-2 w-2 rounded-full ${automation.status === 'active' ? 'bg-[var(--emerald)]' : 'bg-[var(--text-muted)]'}`}></span>
                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{automation.status}</span>
                  </div>
                </div>
              </div>
              <button className={`p-2 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-white transition-colors`}>
                {automation.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] mb-6 flex-grow">{automation.desc}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-[var(--amber)]" />
                <span>{automation.runs} total runs</span>
              </div>
              <span>Last run: {automation.lastRun}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
