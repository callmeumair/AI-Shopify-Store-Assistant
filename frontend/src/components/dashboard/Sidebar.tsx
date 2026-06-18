'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Zap, 
  Settings,
  Store
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { icon: MessageSquare, label: 'AI Assistant', href: '/dashboard/chat', badge: 'AI' },
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Package, label: 'Products', href: '/dashboard/products' },
  { icon: ShoppingBag, label: 'Orders', href: '/dashboard/orders' },
  { icon: Users, label: 'Customers', href: '/dashboard/customers' },
  { icon: Zap, label: 'Automations', href: '/dashboard/automations' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-bg-secondary border-r border-border flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white shadow-lg shadow-accent-blue/20">
          <Store size={20} />
        </div>
        <div>
          <h1 className="font-bold text-text-primary text-lg leading-tight">StoreSync</h1>
          <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">AI Powered</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={clsx(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group overflow-hidden",
                isActive ? "text-white bg-bg-elevated" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-accent-blue rounded-r-full"
                />
              )}
              
              <item.icon size={18} className={clsx("relative z-10 transition-colors", isActive ? "text-accent-blue" : "text-text-muted group-hover:text-text-secondary")} />
              <span className="text-sm font-medium relative z-10">{item.label}</span>
              
              {item.badge && (
                <span className="ml-auto bg-accent-blue/10 text-accent-blue border border-accent-blue/20 text-[10px] font-bold px-2 py-0.5 rounded-full relative z-10">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-bg-elevated rounded-xl p-4 border border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-text-primary font-medium truncate">User Admin</p>
            <p className="text-xs text-text-muted truncate">Admin Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
