'use client';

import { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function CountUp({ end, prefix = '', suffix = '', decimals = 0, duration = 1200 }: CountUpProps) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  
  useEffect(() => {
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setValue(eased * end);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);
  
  return <>{prefix}{value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</>;
}
