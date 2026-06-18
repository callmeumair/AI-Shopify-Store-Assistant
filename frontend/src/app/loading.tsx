'use client';

import { motion } from 'framer-motion';
import { GlowOrb } from '@/components/ui/GlowOrb';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--void)] text-white relative overflow-hidden">
      <GlowOrb color="cyan" size={400} x="50%" y="50%" opacity={0.15} />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] flex items-center justify-center mb-6 relative shadow-[0_0_30px_var(--cyan-glow)]"
        >
          <span className="w-4 h-4 rounded-full bg-[var(--cyan)]" style={{ animation: 'pulse-dot 1.5s infinite' }}></span>
        </motion.div>
        <h2 className="font-display font-semibold text-xl tracking-tight mb-2">Initializing...</h2>
        <div className="w-48 h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--cyan)] w-1/2 rounded-full animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]"></div>
        </div>
      </div>
    </div>
  );
}
