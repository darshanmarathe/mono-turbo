import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  const classes = variant === 'primary' ? 'btn' : `btn btn--${variant}`;
  return (
    <button type="button" className={[classes, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </button>
  );
}
