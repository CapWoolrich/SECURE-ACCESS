import { Badge } from '../ui/Badge';
import type { AccessStatus } from '../../types/access';

const STATUS_LABEL: Record<AccessStatus, string> = {
  draft: 'Borrador',
  submitted: 'Enviada',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  needs_correction: 'Requiere correccion',
  active: 'Activa',
  used: 'Usada',
  expired: 'Expirada',
  cancelled: 'Cancelada',
  revoked: 'Revocada',
  incident: 'Incidente',
};

type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'cyan';

const STATUS_TONE: Record<AccessStatus, Tone> = {
  draft: 'neutral',
  submitted: 'info',
  approved: 'success',
  rejected: 'danger',
  needs_correction: 'warning',
  active: 'cyan',
  used: 'neutral',
  expired: 'neutral',
  cancelled: 'neutral',
  revoked: 'danger',
  incident: 'danger',
};

interface StatusBadgeProps {
  status: AccessStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
);

export const statusLabel = (status: AccessStatus): string => STATUS_LABEL[status];
