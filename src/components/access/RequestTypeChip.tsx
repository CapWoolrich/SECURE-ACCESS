import { Badge } from '../ui/Badge';
import type { AccessRequestType } from '../../types/access';

interface RequestTypeChipProps {
  type: AccessRequestType;
}

export const RequestTypeChip = ({ type }: RequestTypeChipProps) => {
  if (type === 'vip_event') return <Badge tone="info">VIP</Badge>;
  return <Badge tone="cyan">Proveedor</Badge>;
};
