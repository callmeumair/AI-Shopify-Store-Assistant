'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPinOff } from 'lucide-react';
import { GlowOrb } from '@/components/ui/GlowOrb';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--void)] text-white relative overflow-hidden px-6 text-center">
      <GlowOrb color="violet" size={600} x="50%" y="50%" opacity={0.15} />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="font-mono font-bold text-[120px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-[var(--violet-bright)] to-transparent opacity-20 select-none absolute -top-16">
          404
        </div>
        
        <div className="w-20 h-20 rounded-full bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] flex items-center justify-center mb-6 relative z-10 shadow-[0_0_30px_var(--violet-glow)]">
          <MapPinOff className="text-[var(--violet-bright)]" size={36} />
        </div>
        
        <h1 className="font-display font-bold text-3xl mb-3 text-white relative z-10">Coordinates not found</h1>
        <p className="text-[var(--text-secondary)] mb-10 max-w-sm relative z-10">
          The sector you are looking for does not exist in the current navigation map.
        </p>
        
        <Link href="/dashboard" className="btn-primary relative z-10">
          <ArrowLeft size={16} className="mr-2" /> Return to Base
        </Link>
      </motion.div>
    </div>
  );
}
