import type { PropsWithChildren } from 'react';
import './Alert.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends PropsWithChildren {
  tone?: AlertTone;
}

export function Alert({ tone = 'info', children }: AlertProps) {
  const className = tone === 'info' ? 'alert' : `alert alert--${tone}`;
  return (
    <div className={className} role="alert">
      {children}
    </div>
  );
}
