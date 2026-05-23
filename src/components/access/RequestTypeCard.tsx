import type { ReactNode } from 'react';

interface RequestTypeCardProps {
  variant: 'vip' | 'prv';
  title: string;
  subtitle: string;
  bullets: string[];
  onClick: () => void;
  footer?: ReactNode;
}

const ICON_LABEL: Record<RequestTypeCardProps['variant'], string> = {
  vip: 'VIP',
  prv: 'PRV',
};

export const RequestTypeCard = ({ variant, title, subtitle, bullets, onClick, footer }: RequestTypeCardProps) => (
  <button type="button" className="request-type-card" onClick={onClick}>
    <div className={`request-type-card__icon request-type-card__icon--${variant}`}>{ICON_LABEL[variant]}</div>
    <div className="stack-xs">
      <div className="request-type-card__title">{title}</div>
      <div className="request-type-card__sub">{subtitle}</div>
    </div>
    <ul className="request-type-card__bullets">
      {bullets.map((b) => <li key={b}>{b}</li>)}
    </ul>
    {footer}
  </button>
);
