'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, Package, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { format } from 'date-fns';

export default function DashboardOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 rounded-xl bg-bg-secondary skeleton-shimmer" />)}
        </div>
        <div className="h-80 rounded-xl bg-bg-secondary skeleton-shimmer" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 rounded-xl bg-bg-secondary skeleton-shimmer" />
          <div className="h-96 rounded-xl bg-bg-secondary skeleton-shimmer" />
        </div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-8 text-text-muted">Failed to load data. Please ensure the MCP server is running.</div>;
  }

  const statCards = [
    { title: 'Total Revenue (30d)', value: `$${data.stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
    { title: 'Orders Today', value: data.stats.ordersToday, icon: ShoppingBag, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
    { title: 'Active Products', value: data.stats.activeProducts, icon: Package, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
    { title: 'Low Stock Alerts', value: data.stats.lowStockAlerts, icon: AlertTriangle, color: 'text-accent-amber', bg: 'bg-accent-amber/10' },
  ];

  return (
    <div className="p-8 space-y-6 h-screen overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard Overview</h1>
        <div className="text-sm text-text-muted">Updated just now</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-bg-secondary border border-border p-5 rounded-xl shadow-lg relative overflow-hidden group hover:border-border-glow transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">{stat.title}</p>
                <h3 className="text-text-primary text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-bg-secondary border border-border p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-text-primary font-semibold mb-6">Revenue Overview</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.revenueChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
              <XAxis dataKey="date" stroke="#3D5278" tick={{ fill: '#8B9EC7', fontSize: 12 }} tickMargin={10} axisLine={false} />
              <YAxis stroke="#3D5278" tick={{ fill: '#8B9EC7', fontSize: 12 }} tickFormatter={(val) => `$${val}`} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#161B27', borderColor: '#1E2D45', borderRadius: '8px' }}
                itemStyle={{ color: '#F0F6FF' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3B82F6', stroke: '#0D1117', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-bg-secondary border border-border rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="text-text-primary font-semibold">Recent Orders</h3>
            <button className="text-accent-blue text-sm hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-elevated border-b border-border">
                  <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Order</th>
                  <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.length > 0 ? data.recentOrders.map((order: any, idx: number) => (
                  <tr key={idx} className="border-b border-border hover:bg-bg-elevated/50 transition-colors">
                    <td className="p-4 font-medium text-text-primary">{order.name}</td>
                    <td className="p-4 text-sm text-text-secondary">
                      {format(new Date(order.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="p-4">
                      <span className={clsx(
                        "px-2 py-1 text-xs font-medium rounded-full",
                        order.financial_status === 'paid' ? "bg-accent-green/10 text-accent-green border border-accent-green/20" : "bg-accent-amber/10 text-accent-amber border border-accent-amber/20"
                      )}>
                        {order.financial_status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium text-text-primary">${order.total_price}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="p-4 text-center text-text-muted">No recent orders</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-bg-secondary border border-border rounded-xl shadow-lg flex flex-col"
        >
          <div className="p-5 border-b border-border">
            <h3 className="text-text-primary font-semibold flex items-center gap-2">
              <AlertTriangle size={18} className="text-accent-amber" />
              Low Stock Alerts
            </h3>
          </div>
          <div className="p-5 flex-1 overflow-y-auto">
            {data.lowStockAlerts.length > 0 ? (
              <div className="space-y-4">
                {data.lowStockAlerts.map((alert: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center bg-bg-elevated p-3 rounded-lg border border-border">
                    <div className="truncate pr-4 text-sm text-text-primary">{alert.title}</div>
                    <div className="flex-shrink-0 text-accent-red font-bold text-sm bg-accent-red/10 px-2 py-1 rounded">
                      {alert.quantity} left
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-text-muted">
                <Package size={32} className="mb-2 opacity-50" />
                <p className="text-sm">Inventory is looking good!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
