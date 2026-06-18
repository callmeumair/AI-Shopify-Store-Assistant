'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.animation = `fadeInUp 0.5s ease forwards`;
          el.style.opacity = '1';
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    
    el.style.opacity = '0';
    observer.observe(el);
    
    return () => observer.disconnect();
  }, [delay]);
  
  return <div ref={ref} className={className}>{children}</div>;
}
