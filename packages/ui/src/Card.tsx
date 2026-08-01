import type { PropsWithChildren } from 'react';
import './Card.css';

export interface CardProps extends PropsWithChildren {
  title?: string;
}

export function Card({ title, children }: CardProps) {
  return (
    <section className="card">
      {title ? <h3 className="card__title">{title}</h3> : null}
      <div className="card__body">{children}</div>
    </section>
  );
}
