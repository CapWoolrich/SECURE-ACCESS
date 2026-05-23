import type { ReactNode } from 'react';

type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'cyan';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export const Badge = ({ tone = 'neutral', children, className = '' }: BadgeProps) => (
  <span className={`badge badge--${tone} ${className}`.trim()}>{children}</span>
);
