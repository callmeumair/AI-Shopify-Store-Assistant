'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;
}

export function TypewriterText({ text, speed = 40, startDelay = 0, showCursor = true }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    let i = 0;
    
    setDisplayed('');
    setDone(false);

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) { 
          clearInterval(interval); 
          setDone(true); 
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  
  return (
    <span>
      {displayed}
      {showCursor && !done && (
        <span style={{ animation: 'typing-cursor 0.8s infinite', borderRight: '2px solid var(--cyan)', marginLeft: '1px' }}>&nbsp;</span>
      )}
    </span>
  );
}
