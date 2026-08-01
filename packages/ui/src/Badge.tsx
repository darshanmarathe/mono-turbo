import type { PropsWithChildren } from 'react';
import './Badge.css';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends PropsWithChildren {
  tone?: BadgeTone;
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  const className = tone === 'neutral' ? 'badge' : `badge badge--${tone}`;
  return <span className={className}>{children}</span>;
}
