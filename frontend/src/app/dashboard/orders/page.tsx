'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, ShoppingBag, Download } from 'lucide-react';

const DUMMY_ORDERS = [
  { id: '#1042', customer: 'Emma Thompson', email: 'emma@example.com', total: '$142.50', status: 'pending', date: '2 mins ago' },
  { id: '#1041', customer: 'James Wilson', email: 'james.w@example.com', total: '$89.99', status: 'fulfilled', date: '45 mins ago' },
  { id: '#1040', customer: 'Sarah Davis', email: 'sarah@example.com', total: '$210.00', status: 'fulfilled', date: '2 hours ago' },
  { id: '#1039', customer: 'Michael Brown', email: 'mike.b@example.com', total: '$45.00', status: 'cancelled', date: '5 hours ago' },
  { id: '#1038', customer: 'Jessica Miller', email: 'jess@example.com', total: '$325.00', status: 'fulfilled', date: '1 day ago' },
  { id: '#1037', customer: 'David Garcia', email: 'david@example.com', total: '$115.00', status: 'pending', date: '1 day ago' },
  { id: '#1036', customer: 'Emily Clark', email: 'emily@example.com', total: '$275.50', status: 'fulfilled', date: '2 days ago' },
];

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Unfulfilled', 'Paid', 'Open'];

  const filteredOrders = DUMMY_ORDERS.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'All') return matchesSearch;
    if (activeTab === 'Unfulfilled') return matchesSearch && order.status === 'pending';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === tab ? 'text-white' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="order-tab"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[var(--cyan)]"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost">
            <Download size={16} /> Export
          </button>
          <button className="btn-primary">
            Create Order
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button className="btn-ghost sm:w-auto w-full justify-center">
          <Filter size={16} /> Filter
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-label text-[var(--text-muted)] bg-[rgba(255,255,255,0.02)] border-b border-[var(--border-default)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[var(--surface-2)] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <span className="font-mono text-[var(--cyan)] font-medium">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{order.customer}</span>
                        <span className="text-xs text-[var(--text-muted)]">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{order.date}</td>
                    <td className="px-6 py-4">
                      {order.status === 'pending' && <span className="badge badge-amber">Unfulfilled</span>}
                      {order.status === 'fulfilled' && <span className="badge badge-green">Fulfilled</span>}
                      {order.status === 'cancelled' && <span className="badge badge-gray">Cancelled</span>}
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-white">{order.total}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-[var(--text-muted)] hover:text-white rounded transition-colors opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center border border-[var(--border-subtle)] mb-4">
              <ShoppingBag className="text-[var(--text-muted)]" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No orders found</h3>
            <p className="text-[var(--text-secondary)] max-w-sm">
              {searchTerm ? `No orders match your search "${searchTerm}".` : `No ${activeTab.toLowerCase()} orders found.`}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
