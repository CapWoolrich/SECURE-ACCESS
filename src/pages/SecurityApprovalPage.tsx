import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/access/StatusBadge';
import { RequestTypeChip } from '../components/access/RequestTypeChip';
import { RiskDot } from '../components/access/RiskDot';
import { useRequests, updateRequestStatus } from '../lib/accessStore';
import type { AccessRequest, AccessStatus, AccessRequestType } from '../types/access';

type StatusFilter = 'all' | AccessStatus;
type TypeFilter = 'all' | AccessRequestType;

const STATUS_FILTERS: Array<{ value: StatusFilter; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'submitted', label: 'Enviadas' },
  { value: 'needs_correction', label: 'Requieren correccion' },
  { value: 'approved', label: 'Aprobadas' },
  { value: 'active', label: 'Activas' },
  { value: 'rejected', label: 'Rechazadas' },
  { value: 'revoked', label: 'Revocadas' },
];

const TYPE_FILTERS: Array<{ value: TypeFilter; label: string }> = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'vip_event', label: 'VIP' },
  { value: 'identified_provider', label: 'Proveedor' },
];

const personasOVehiculos = (r: AccessRequest): string => {
  if (r.type === 'vip_event') return `${r.maxPeople} pax / ${r.maxVehicles} veh`;
  return '1 persona';
};

const SECURITY_ACTOR = { role: 'security_operator' as const, label: 'Seguridad Demo' };

export const SecurityApprovalPage = () => {
  const requests = useRequests();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const visible = useMemo(() => {
    return requests.filter((r) => {
      const okStatus = statusFilter === 'all' || r.status === statusFilter;
      const okType = typeFilter === 'all' || r.type === typeFilter;
      return okStatus && okType;
    });
  }, [statusFilter, typeFilter, requests]);

  const counts = useMemo(() => ({
    submitted: requests.filter((r) => r.status === 'submitted').length,
    correction: requests.filter((r) => r.status === 'needs_correction').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  }), [requests]);

  const approve = (folio: string) =>
    updateRequestStatus(folio, 'approved', 'request_approved', SECURITY_ACTOR.role, SECURITY_ACTOR.label);
  const requestCorrection = (folio: string) =>
    updateRequestStatus(folio, 'needs_correction', 'correction_requested', SECURITY_ACTOR.role, SECURITY_ACTOR.label);
  const reject = (folio: string) =>
    updateRequestStatus(folio, 'rejected', 'request_rejected', SECURITY_ACTOR.role, SECURITY_ACTOR.label);
  const revoke = (folio: string) =>
    updateRequestStatus(folio, 'revoked', 'access_revoked', SECURITY_ACTOR.role, SECURITY_ACTOR.label);
  const activate = (folio: string) =>
    updateRequestStatus(folio, 'active', 'access_validated', SECURITY_ACTOR.role, SECURITY_ACTOR.label);

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Seguridad</div>
          <h1 className="page-header__title">Panel de aprobaciones</h1>
          <p className="page-header__sub">
            Revisa, aprueba, solicita correccion o rechaza solicitudes. Todas las acciones quedan
            registradas en bitacora.
          </p>
        </div>
      </div>

      <div className="grid-stats">
        <div className="stat-card stat-card--warning">
          <div className="stat-card__eyebrow">Enviadas</div>
          <div className="stat-card__value">{counts.submitted}</div>
          <div className="stat-card__delta">Esperando decision</div>
        </div>
        <div className="stat-card stat-card--warning">
          <div className="stat-card__eyebrow">Requieren correccion</div>
          <div className="stat-card__value">{counts.correction}</div>
          <div className="stat-card__delta">Devueltas al operador</div>
        </div>
        <div className="stat-card stat-card--success">
          <div className="stat-card__eyebrow">Aprobadas</div>
          <div className="stat-card__value">{counts.approved}</div>
          <div className="stat-card__delta">Con codigo emitido</div>
        </div>
        <div className="stat-card stat-card--danger">
          <div className="stat-card__eyebrow">Rechazadas</div>
          <div className="stat-card__value">{counts.rejected}</div>
          <div className="stat-card__delta">Acumulado</div>
        </div>
      </div>

      <Card>
        <CardHeader eyebrow="Filtros" title="Bandeja de solicitudes" />
        <div className="stack-sm">
          <div className="row">
            {STATUS_FILTERS.map((f) => (
              <button key={f.value} type="button"
                className={`filter-chip ${statusFilter === f.value ? 'is-active' : ''}`}
                onClick={() => setStatusFilter(f.value)}>{f.label}</button>
            ))}
          </div>
          <div className="row">
            {TYPE_FILTERS.map((f) => (
              <button key={f.value} type="button"
                className={`filter-chip ${typeFilter === f.value ? 'is-active' : ''}`}
                onClick={() => setTypeFilter(f.value)}>{f.label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          {requests.length === 0 ? (
            <div className="empty-state">
              Sin solicitudes registradas.{' '}
              <Link to="/portal/login">Crea una desde el portal del solicitante</Link>{' '}
              o desde <Link to="/nueva-solicitud">Nueva solicitud</Link>.
            </div>
          ) : visible.length === 0 ? (
            <div className="empty-state">Sin solicitudes con esos filtros.</div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Folio</th><th>Tipo</th><th>Destino</th><th>Ventana</th>
                    <th>Cupo</th><th>Riesgo</th><th>Estado</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => (
                    <tr key={r.id}>
                      <td className="text-mono">{r.folio}</td>
                      <td><RequestTypeChip type={r.type} /></td>
                      <td>{r.destination || '--'}</td>
                      <td className="text-mono">{r.date} · {r.windowStart}-{r.windowEnd}</td>
                      <td>{personasOVehiculos(r)}</td>
                      <td><RiskDot level={r.riskLevel} /></td>
                      <td><StatusBadge status={r.status} /></td>
                      <td>
                        <div className="row" style={{ gap: 6 }}>
                          {r.status !== 'approved' && r.status !== 'active' && (
                            <Button size="md" variant="success" onClick={() => approve(r.folio)}>Aprobar</Button>
                          )}
                          {r.status === 'approved' && (
                            <Button size="md" variant="success" onClick={() => activate(r.folio)}>Activar</Button>
                          )}
                          <Button size="md" variant="warning" onClick={() => requestCorrection(r.folio)}>Corregir</Button>
                          <Button size="md" variant="danger" onClick={() => reject(r.folio)}>Rechazar</Button>
                          <Button size="md" variant="ghost" onClick={() => revoke(r.folio)}>Revocar</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
