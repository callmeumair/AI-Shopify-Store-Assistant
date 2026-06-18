'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, Users, Download } from 'lucide-react';

const DUMMY_CUSTOMERS = [
  { id: 'CUST-001', name: 'Emma Thompson', email: 'emma@example.com', location: 'New York, US', orders: 12, spent: '$1,425.50' },
  { id: 'CUST-002', name: 'James Wilson', email: 'james.w@example.com', location: 'London, UK', orders: 3, spent: '$289.99' },
  { id: 'CUST-003', name: 'Sarah Davis', email: 'sarah@example.com', location: 'Toronto, CA', orders: 8, spent: '$910.00' },
  { id: 'CUST-004', name: 'Michael Brown', email: 'mike.b@example.com', location: 'Sydney, AU', orders: 1, spent: '$45.00' },
  { id: 'CUST-005', name: 'Jessica Miller', email: 'jess@example.com', location: 'Chicago, US', orders: 5, spent: '$625.00' },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = DUMMY_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost">
            <Filter size={16} /> Filter
          </button>
          <button className="btn-ghost">
            <Download size={16} /> Export
          </button>
          <button className="btn-primary">
            Add Customer
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        {filteredCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-label text-[var(--text-muted)] bg-[rgba(255,255,255,0.02)] border-b border-[var(--border-default)]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                  <th className="px-6 py-4 font-semibold">Orders</th>
                  <th className="px-6 py-4 font-semibold">Amount Spent</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-[var(--surface-2)] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-xs font-bold text-white">
                          {customer.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-white group-hover:text-[var(--cyan)] transition-colors">{customer.name}</span>
                          <span className="text-xs text-[var(--text-muted)]">{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{customer.location}</td>
                    <td className="px-6 py-4 font-mono text-[var(--text-secondary)]">{customer.orders}</td>
                    <td className="px-6 py-4 font-mono font-medium text-white">{customer.spent}</td>
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
              <Users className="text-[var(--text-muted)]" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No customers found</h3>
            <p className="text-[var(--text-secondary)] max-w-sm">
              {searchTerm ? `No customers match your search "${searchTerm}".` : 'Get started by adding your first customer.'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
