import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'flat' | 'inverted';
  paddedLg?: boolean;
}

export const Card = ({ children, className = '', variant = 'default', paddedLg = false }: CardProps) => {
  const variantClass =
    variant === 'flat' ? 'card--flat' : variant === 'inverted' ? 'card--inverted' : '';
  const padClass = paddedLg ? 'card--padded-lg' : '';
  return <div className={`card ${variantClass} ${padClass} ${className}`.trim()}>{children}</div>;
};

interface CardHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
}

export const CardHeader = ({ title, subtitle, eyebrow, actions }: CardHeaderProps) => (
  <div className="card__header">
    <div>
      {eyebrow && <div className="card__eyebrow">{eyebrow}</div>}
      {title && <div className="card__title">{title}</div>}
      {subtitle && <div className="card__subtitle">{subtitle}</div>}
    </div>
    {actions && <div className="row">{actions}</div>}
  </div>
);
