'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Store, Zap, Package, ShoppingBag, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const features = [
    { icon: Bot, title: 'Natural Language Control', desc: 'Manage your entire store just by chatting. No more clicking through menus.' },
    { icon: Store, title: 'RAG Customer Support', desc: 'AI automatically answers customer questions based on your policies and FAQs.' },
    { icon: Package, title: 'Inventory Automation', desc: 'Get alerts and auto-reorder when stock runs low.' },
    { icon: ShoppingBag, title: 'Order Management', desc: 'Fulfill orders and update statuses conversationally.' },
    { icon: Zap, title: 'n8n Workflows', desc: 'Connect abandoned carts and notifications via powerful automations.' },
    { icon: BarChart3, title: 'Real-time Analytics', desc: 'Get insights and ask questions about your revenue and top products.' }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary overflow-hidden relative">
      {/* Animated Mesh Background (Simplified via CSS) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-blue/30 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-purple/20 blur-[120px] mix-blend-screen" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white shadow-lg shadow-accent-blue/20">
            <Store size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">StoreSync AI</span>
        </div>
        <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-bg-elevated border border-border text-sm font-medium hover:bg-border transition-colors">
          Dashboard
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm mb-8 font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
          </span>
          Powered by Claude 3 Opus
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
        >
          Your Shopify Store, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">
            Managed by AI
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-text-secondary mb-10 max-w-2xl"
        >
          An autonomous AI agent that manages your Shopify store via natural language. Read and write data, automate workflows, and support customers instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/dashboard/chat" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-text-primary text-bg-primary font-semibold text-lg hover:bg-white transition-colors shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            Try the Dashboard
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-elevated/50 border border-border p-8 rounded-2xl hover:bg-bg-elevated hover:border-border-glow transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-bg-primary border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon size={24} className="text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
