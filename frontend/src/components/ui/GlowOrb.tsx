interface GlowOrbProps {
  color: 'cyan' | 'blue' | 'violet' | 'red' | 'amber' | 'emerald';
  size?: number;
  x?: string | number;
  y?: string | number;
  opacity?: number;
}

export function GlowOrb({ color, size = 400, x, y, opacity = 0.15 }: GlowOrbProps) {
  const colors = {
    cyan: '#06B6D4',
    blue: '#3B82F6',
    violet: '#8B5CF6',
    red: '#EF4444',
    amber: '#F59E0B',
    emerald: '#10B981',
  };
  
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: '50%',
      background: colors[color],
      filter: `blur(${size * 0.3}px)`,
      opacity,
      pointerEvents: 'none',
      animation: 'glow-pulse 4s ease-in-out infinite',
    }} />
  );
}
