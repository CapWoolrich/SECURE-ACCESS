import { Card, CardHeader } from '../ui/Card';
import { StatusBadge } from './StatusBadge';
import { RequestTypeChip } from './RequestTypeChip';
import { RiskDot } from './RiskDot';
import type { AccessRequest } from '../../types/access';

interface AccessSummaryCardProps {
  request: AccessRequest;
  showCode?: boolean;
}

export const AccessSummaryCard = ({ request, showCode = true }: AccessSummaryCardProps) => {
  const isVip = request.type === 'vip_event';
  return (
    <Card>
      <CardHeader
        eyebrow={request.folio}
        title={
          <span className="row" style={{ gap: 8 }}>
            <RequestTypeChip type={request.type} />
            <StatusBadge status={request.status} />
          </span>
        }
        subtitle={request.destination}
        actions={showCode && <span className="code-pill">{request.shortCode}</span>}
      />
      <dl className="dl">
        <dt>Fecha</dt><dd>{request.date}</dd>
        <dt>Ventana</dt><dd>{request.windowStart} - {request.windowEnd}</dd>
        {isVip && <>
          <dt>Empresa</dt><dd>{request.requestingCompany}</dd>
          <dt>Aeronave</dt><dd>{request.aircraftReference}</dd>
          <dt>Cupo personas</dt><dd>{request.maxPeople}</dd>
          <dt>Cupo vehiculos</dt><dd>{request.maxVehicles}</dd>
        </>}
        {!isVip && <>
          <dt>Empresa</dt><dd>{request.company}</dd>
          <dt>Motivo</dt><dd>{request.reason}</dd>
          <dt>Vehiculo</dt><dd>{request.vehicleDescription}</dd>
          <dt>Placa</dt><dd className="text-mono">{request.licensePlate}</dd>
        </>}
        <dt>Responsable</dt><dd>{request.internalResponsible}</dd>
        <dt>Escolta</dt><dd>{request.escortRequired ? 'Si' : 'No'}</dd>
      </dl>
      {request.riskLevel && (
        <div style={{ marginTop: 12 }}>
          <RiskDot level={request.riskLevel} />
        </div>
      )}
    </Card>
  );
};
