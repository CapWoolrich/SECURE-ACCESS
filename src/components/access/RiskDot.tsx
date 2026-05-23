import type { RiskLevel } from '../../types/access';

interface RiskDotProps {
  level?: RiskLevel;
}

const LABEL: Record<RiskLevel, string> = {
  low: 'Riesgo bajo',
  medium: 'Riesgo medio',
  high: 'Riesgo alto',
};

export const RiskDot = ({ level }: RiskDotProps) => {
  if (!level) return null;
  return <span className={`risk-dot risk-dot--${level}`}>{LABEL[level]}</span>;
};
