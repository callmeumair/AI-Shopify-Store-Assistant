'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Brain, BarChart3, Package, Zap, ShoppingBag, 
  ArrowRight, GitMerge, Plug, Terminal
} from 'lucide-react';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: MessageSquare, color: 'cyan', title: 'Natural Language Control', desc: 'Manage your entire store just by chatting. Add products, update inventory, check orders.' },
    { icon: Brain, color: 'violet', title: 'RAG Customer Support', desc: 'Answers customer questions from your policies and FAQs with source citations.' },
    { icon: BarChart3, color: 'blue', title: 'Real-time Analytics', desc: 'Ask questions about revenue, top products, and growth in plain English.' },
    { icon: Package, color: 'emerald', title: 'Inventory Automation', desc: 'Automatic alerts and reorder workflows when stock falls below your threshold.' },
    { icon: Zap, color: 'amber', title: 'n8n Workflows', desc: 'Abandoned cart recovery, fulfillment notifications, daily reports — fully automated.' },
    { icon: ShoppingBag, color: 'blue', title: 'Order Management', desc: 'Fulfill, cancel, and track orders. Create fulfillments with tracking via chat.' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none" 
           style={{ background: 'var(--gradient-hero)', mixBlendMode: 'screen' }} />
      <GlowOrb color="cyan" size={600} x="-10%" y="20%" opacity={0.1} />
      <GlowOrb color="violet" size={500} x="80%" y="60%" opacity={0.1} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#03050A]/80 backdrop-blur-md border-b border-[rgba(148,163,184,0.1)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1">
              StoreSync
              <span className="w-2 h-2 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]"></span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          </div>

          <div className="flex items-center">
            <Link href="/dashboard" className="btn-primary text-sm py-2 px-4">
              Try Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-20">
        {/* Section 2: Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-24 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="badge badge-cyan">
              Powered by Claude claude-opus-4-8
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-hero text-white mb-6 max-w-4xl mx-auto font-display"
          >
            Your Shopify Store,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] to-[var(--blue)]">
              Managed by AI
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10"
          >
            The autonomous AI agent that manages your Shopify store via natural language. 
            Stop clicking through menus. Just ask, and it&apos;s done.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="/dashboard" className="btn-primary text-base py-3 px-8 w-full sm:w-auto">
              Open Dashboard
            </Link>
            <a href="https://github.com/callmeumair/AI-Shopify-Store-Assistant" target="_blank" rel="noopener noreferrer" className="btn-ghost text-base py-3 px-8 w-full sm:w-auto">
              <GitMerge size={20} /> View on GitHub
            </a>
          </motion.div>

          {/* Terminal Demo */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Floating stats */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
              className="absolute -top-6 -left-12 glass-card py-2 px-4 text-xs font-medium text-[var(--cyan-bright)] border-[var(--cyan-glow)] hidden md:block"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              &lt; 1s response
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
              className="absolute -top-10 -right-8 glass-card py-2 px-4 text-xs font-medium text-[var(--violet-bright)] border-[var(--violet-glow)] hidden md:block"
              style={{ animation: 'float 7s ease-in-out infinite reverse' }}
            >
              2,847 orders managed
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4 }}
              className="absolute -bottom-6 -left-8 glass-card py-2 px-4 text-xs font-medium text-[var(--emerald-bright)] border-[var(--emerald-glow)] hidden md:block"
              style={{ animation: 'float 5s ease-in-out infinite' }}
            >
              99.9% uptime
            </motion.div>

            <div className="glass-card text-left text-sm rounded-xl overflow-hidden shadow-2xl border border-[var(--border-strong)]">
              <div className="bg-[var(--surface-2)] border-b border-[var(--border-default)] px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
                  <Terminal size={14} /> StoreSync AI • Claude claude-opus-4-8 • Connected
                </div>
              </div>
              <div className="p-6 font-mono space-y-4 h-[240px] bg-[#0A0F1C]">
                <div className="text-[var(--text-secondary)]">
                  <span className="text-[var(--blue-bright)] mr-2">User:</span>
                  <TypewriterText text="Which products are low on inventory?" speed={30} startDelay={1000} showCursor={false} />
                </div>
                
                <div className="pl-4 border-l-2 border-[var(--border-default)] py-1 space-y-3">
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
                    className="flex items-center gap-2 text-xs text-[var(--text-muted)]"
                  >
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[var(--cyan)] rounded-full" style={{ animation: 'pulse-dot 1s infinite 0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--cyan)] rounded-full" style={{ animation: 'pulse-dot 1s infinite 200ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--cyan)] rounded-full" style={{ animation: 'pulse-dot 1s infinite 400ms' }}></span>
                    </span>
                    Thinking...
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 4 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[var(--violet-glow)] border border-[rgba(139,92,246,0.3)] rounded-md px-3 py-1.5 text-xs text-[var(--violet-bright)] inline-flex items-center gap-2">
                      <Zap size={12} /> <span>get_inventory_levels</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}
                    className="text-[var(--text-primary)]"
                  >
                    <span className="text-[var(--cyan-bright)] mr-2">StoreSync:</span>
                    <TypewriterText text="Found 3 products below threshold: Air Max Runner (2 left), Leather Wallet (1 left), Silk Tie (0 left)." speed={20} startDelay={5500} showCursor={true} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Feature Grid */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-label mb-2">Capabilities</h2>
              <h3 className="text-title font-display text-white">Everything you need to run your store</h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`glass-card p-6 h-full flex flex-col hover:shadow-lg transition-all group`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-[var(--${feature.color}-glow)] border border-[rgba(var(--${feature.color}-rgb),0.2)]`}>
                    <feature.icon className={`text-[var(--${feature.color}-bright)]`} size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-grow">{feature.desc}</p>
                  <div className="mt-6 h-px w-full bg-[var(--border-default)] relative overflow-hidden">
                    <div className={`absolute top-0 left-0 h-full w-0 bg-[var(--${feature.color})] group-hover:w-full transition-all duration-500 ease-out`}></div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Section 4: How it Works */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-label mb-2">How it works</h2>
              <h3 className="text-title font-display text-white">From thought to execution in seconds</h3>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-[var(--border-strong)] z-0">
              <motion.div 
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent"
                animate={{ left: ['-30%', '100%'] }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
              />
            </div>

            {[
              { num: '01', icon: Plug, color: 'cyan', title: 'Connect your store', desc: 'Securely link your Shopify account with one click.' },
              { num: '02', icon: MessageSquare, color: 'blue', title: 'Ask in plain English', desc: 'Tell the AI what you want to do, exactly how you would tell a human.' },
              { num: '03', icon: Zap, color: 'violet', title: 'Watch it execute', desc: 'The AI uses powerful tools to securely execute your request on Shopify.' }
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 150} className="flex-1 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-24 h-24 rounded-full bg-[var(--surface-1)] border border-[var(--border-default)] flex items-center justify-center mb-6 relative overflow-hidden shadow-[0_0_30px_var(--${step.color}-glow)]`}>
                    <div className="absolute top-2 left-2 text-xs font-mono text-[var(--text-muted)]">{step.num}</div>
                    <step.icon className={`text-[var(--${step.color})]`} size={32} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                  <p className="text-[var(--text-secondary)]">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Section 5: CTA Banner */}
        <section className="max-w-5xl mx-auto px-6 py-24 relative z-10">
          <ScrollReveal>
            <div className="glass-card p-12 text-center relative overflow-hidden border-[var(--cyan-glow)]">
              <GlowOrb color="cyan" size={400} x="50%" y="50%" opacity={0.15} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--surface-0)]/80"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to automate your store?</h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl mx-auto">
                  Join store owners managing smarter with AI. Connect your Shopify store and experience the future of commerce operations.
                </p>
                <Link href="/dashboard" className="btn-primary text-lg py-4 px-10 shadow-[0_0_40px_var(--cyan-glow)]" style={{ animation: 'glow-pulse 2s infinite' }}>
                  Open Dashboard <ArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Section 6: Footer */}
      <footer className="border-t border-[var(--border-default)] bg-[var(--surface-0)] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className="font-display font-bold text-lg text-white flex items-center justify-center md:justify-start gap-1">
                StoreSync <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]"></span>
              </span>
              <p className="text-sm text-[var(--text-muted)]">Built with Claude claude-opus-4-8 & Next.js</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://github.com/callmeumair/AI-Shopify-Store-Assistant" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-white transition-colors">
                <GitMerge size={20} />
              </a>
              <a href="https://umerpatel.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors">
                Portfolio
              </a>
            </div>
          </div>
          
          <div className="text-center border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} StoreSync AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
