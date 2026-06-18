'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Minus, MessageSquare, ArrowRight } from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';

const stats = [
  { label: 'Total Revenue', value: 24891, prefix: '$', change: '+18.2%', trend: 'up', color: 'cyan', icon: DollarSign },
  { label: 'Orders Today', value: 47, change: '+8 from yesterday', trend: 'up', color: 'blue', icon: ShoppingBag },
  { label: 'Active Products', value: 183, change: '12 drafts', trend: 'neutral', color: 'violet', icon: Package },
  { label: 'Low Stock Alerts', value: 3, change: 'Needs attention', trend: 'down', color: 'amber', icon: AlertTriangle },
];

const recentOrders = [
  { id: '#1042', customer: 'Emma Thompson', total: '$142.50', status: 'pending', date: '2 mins ago' },
  { id: '#1041', customer: 'James Wilson', total: '$89.99', status: 'fulfilled', date: '45 mins ago' },
  { id: '#1040', customer: 'Sarah Davis', total: '$210.00', status: 'fulfilled', date: '2 hours ago' },
  { id: '#1039', customer: 'Michael Brown', total: '$45.00', status: 'cancelled', date: '5 hours ago' },
  { id: '#1038', customer: 'Jessica Miller', total: '$325.00', status: 'fulfilled', date: '1 day ago' },
];

const inventoryAlerts = [
  { name: 'Air Max Runner', stock: 2, threshold: 5, severity: 'red' },
  { name: 'Leather Wallet', stock: 1, threshold: 3, severity: 'red' },
  { name: 'Cotton T-Shirt (M)', stock: 4, threshold: 10, severity: 'amber' },
];

const chatPrompts = [
  "Which products are low on inventory?",
  "Show me yesterday's revenue",
  "Create a 15% off discount code"
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className={`glass-card stat-card stat-card-${stat.color} p-5`}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-label text-[var(--text-muted)]">{stat.label}</span>
              <stat.icon size={16} className={`text-[var(--text-muted)]`} />
            </div>
            <div className="font-display font-bold text-3xl text-white mb-2">
              <CountUp end={stat.value} prefix={stat.prefix} />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium">
              {stat.trend === 'up' && <ArrowUpRight size={14} className="text-[var(--emerald)]" />}
              {stat.trend === 'down' && <ArrowDownRight size={14} className="text-[var(--red)]" />}
              {stat.trend === 'neutral' && <Minus size={14} className="text-[var(--text-muted)]" />}
              <span className={stat.trend === 'up' ? 'text-[var(--emerald)]' : stat.trend === 'down' ? 'text-[var(--red)]' : 'text-[var(--text-muted)]'}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column: Recent Orders (60% -> col-span-3) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 glass-card flex flex-col overflow-hidden"
        >
          <div className="p-5 border-b border-[var(--border-default)] flex justify-between items-center">
            <h3 className="font-semibold text-white">Recent Orders</h3>
            <Link href="/dashboard/orders" className="text-sm font-medium text-[var(--cyan)] hover:text-[var(--cyan-bright)] transition-colors">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-label text-[var(--text-muted)] bg-[rgba(255,255,255,0.02)]">
                <tr>
                  <th className="px-5 py-3 font-semibold rounded-tl-lg">Order</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {recentOrders.map((order, i) => (
                  <tr key={order.id} className="hover:bg-[var(--surface-2)] transition-colors group cursor-pointer">
                    <td className="px-5 py-3 font-mono text-[var(--cyan)]">{order.id}</td>
                    <td className="px-5 py-3 text-white">{order.customer}</td>
                    <td className="px-5 py-3 font-mono">{order.total}</td>
                    <td className="px-5 py-3">
                      {order.status === 'pending' && <span className="badge badge-amber">Pending</span>}
                      {order.status === 'fulfilled' && <span className="badge badge-green">Fulfilled</span>}
                      {order.status === 'cancelled' && <span className="badge badge-gray">Cancelled</span>}
                    </td>
                    <td className="px-5 py-3 text-right text-[var(--text-muted)]">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Column (40% -> col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Chat Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card flex flex-col border-[var(--cyan-glow)] hover:border-[var(--cyan-glow)]"
          >
            <div className="p-4 border-b border-[var(--border-default)] flex items-center gap-2">
              <MessageSquare size={16} className="text-[var(--cyan)]" />
              <h3 className="font-semibold text-white">Ask the AI</h3>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[var(--emerald)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)]" style={{ animation: 'pulse-dot 2s infinite' }}></span>
                Online
              </span>
            </div>
            <div className="p-4 space-y-3">
              {chatPrompts.map((prompt, i) => (
                <Link key={i} href="/dashboard/chat" className="block w-full text-left p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--cyan-glow)] hover:bg-[var(--surface-3)] transition-all text-sm text-[var(--text-secondary)] hover:text-white group">
                  "{prompt}"
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/dashboard/chat" className="text-sm font-medium text-[var(--cyan)] hover:text-[var(--cyan-bright)] transition-colors flex items-center gap-1 w-max">
                  Open full assistant <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Inventory Alerts */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card flex flex-col"
          >
            <div className="p-4 border-b border-[var(--border-default)] flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <AlertTriangle size={16} className="text-[var(--amber)]" />
                Low Stock
              </h3>
              <span className="badge badge-amber">{inventoryAlerts.length} Alerts</span>
            </div>
            <div className="divide-y divide-[var(--border-subtle)]">
              {inventoryAlerts.map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-[var(--surface-2)] transition-colors">
                  <div>
                    <p className="font-medium text-sm text-white mb-1">{item.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">Threshold: {item.threshold}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-mono font-bold text-lg ${item.severity === 'red' ? 'text-[var(--red)]' : 'text-[var(--amber)]'}`}>
                        {item.stock}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Left</p>
                    </div>
                    <button className="btn-ghost text-xs py-1.5 px-3">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
