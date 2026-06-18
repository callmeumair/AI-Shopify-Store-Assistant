'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { GlowOrb } from '@/components/ui/GlowOrb';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('System Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--void)] text-white relative overflow-hidden px-6 text-center">
      <GlowOrb color="red" size={500} x="50%" y="50%" opacity={0.15} />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 max-w-md w-full glass-card p-8 border-[var(--red-glow)]"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] flex items-center justify-center mb-6">
          <AlertTriangle className="text-[var(--red)]" size={32} />
        </div>
        <h1 className="font-display font-bold text-2xl mb-2 text-white">System Error</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          A critical exception occurred while processing your request. The system has logged the event.
        </p>
        
        <button 
          onClick={reset}
          className="w-full btn-primary bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-white border border-[var(--border-strong)] flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} /> Reboot System
        </button>
      </motion.div>
    </div>
  );
}
