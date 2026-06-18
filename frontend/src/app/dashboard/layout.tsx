'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, MessageSquare, Package, ShoppingBag, 
  Users, Zap, Settings, Menu, Bell 
} from 'lucide-react';
import { GlowOrb } from '@/components/ui/GlowOrb';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'AI Assistant', href: '/dashboard/chat', icon: MessageSquare, badge: 'AI' },
  { label: 'Products', href: '/dashboard/products', icon: Package },
  { label: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { label: 'Customers', href: '/dashboard/customers', icon: Users },
  { label: 'Automations', href: '/dashboard/automations', icon: Zap },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Overview';
    const currentItem = NAV_ITEMS.find(item => item.href === pathname);
    return currentItem ? currentItem.label : 'Dashboard';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--void)] text-[var(--text-primary)]">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-[240px] border-r border-[var(--border-subtle)] bg-[var(--surface-0)] z-20">
        <div className="p-6">
          <Link href="/" className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1 mb-2">
            StoreSync
            <span className="w-2 h-2 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]"></span>
          </Link>
          <div className="badge badge-cyan text-[10px] px-2 py-0.5">AI Powered</div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <motion.div
                  whileHover={{ x: 2 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 relative ${
                    isActive 
                      ? 'bg-[var(--surface-3)] text-white' 
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[var(--cyan)] rounded-r-full"
                    />
                  )}
                  <item.icon size={18} className={isActive ? 'text-[var(--cyan)]' : ''} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto badge badge-cyan text-[9px] py-0 px-1.5 before:hidden">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--border-subtle)] mt-auto">
          <Link href="/dashboard/settings" className="block">
            <motion.div 
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-white group"
            >
              <Settings size={18} />
              <span className="font-medium text-sm">Settings</span>
            </motion.div>
          </Link>

          <div className="mt-4 flex items-center gap-3 px-3 py-2 group cursor-pointer hover:bg-[var(--surface-2)] rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--blue)] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_var(--cyan-glow)]">
              U
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium text-white truncate">User Admin</div>
              <div className="text-xs text-[var(--text-muted)] truncate">Admin Access</div>
            </div>
            <Settings size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative min-w-0 overflow-hidden bg-[var(--surface-0)] z-10">
        <GlowOrb color="blue" size={500} x="calc(100% - 250px)" y="-250px" opacity={0.08} />
        
        {/* Top Header */}
        <header className="h-16 border-b border-[var(--border-subtle)] bg-[var(--surface-0)]/50 backdrop-blur-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-[var(--text-secondary)] hover:text-white">
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-[var(--text-secondary)] hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--red)] border-2 border-[var(--surface-0)]"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 relative z-10">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
