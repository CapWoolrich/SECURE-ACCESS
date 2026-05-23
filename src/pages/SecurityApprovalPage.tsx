import { useMemo, useState } from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/access/StatusBadge';
import { RequestTypeChip } from '../components/access/RequestTypeChip';
import { RiskDot } from '../components/access/RiskDot';
import { MOCK_REQUESTS } from '../data/mockAccessRequests';
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

export const SecurityApprovalPage = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [decisions, setDecisions] = useState<Record<string, AccessStatus>>({});

  const visible = useMemo(() => {
    return MOCK_REQUESTS.filter((r) => {
      const effective = decisions[r.id] ?? r.status;
      const okStatus = statusFilter === 'all' || effective === statusFilter;
      const okType = typeFilter === 'all' || r.type === typeFilter;
      return okStatus && okType;
    });
  }, [statusFilter, typeFilter, decisions]);

  const setDecision = (id: string, status: AccessStatus) =>
    setDecisions((prev) => ({ ...prev, [id]: status }));

  const counts = useMemo(() => {
    const submitted = MOCK_REQUESTS.filter((r) => (decisions[r.id] ?? r.status) === 'submitted').length;
    const correction = MOCK_REQUESTS.filter((r) => (decisions[r.id] ?? r.status) === 'needs_correction').length;
    const approved = MOCK_REQUESTS.filter((r) => (decisions[r.id] ?? r.status) === 'approved').length;
    const rejected = MOCK_REQUESTS.filter((r) => (decisions[r.id] ?? r.status) === 'rejected').length;
    return { submitted, correction, approved, rejected };
  }, [decisions]);

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Seguridad</div>
          <h1 className="page-header__title">Panel de aprobaciones</h1>
          <p className="page-header__sub">
            Revisa, aprueba, solicita correccion o rechaza solicitudes de acceso. Todas las acciones
            quedan registradas en bitacora.
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
          <div className="stat-card__eyebrow">Aprobadas hoy</div>
          <div className="stat-card__value">{counts.approved}</div>
          <div className="stat-card__delta">Con codigo emitido</div>
        </div>
        <div className="stat-card stat-card--danger">
          <div className="stat-card__eyebrow">Rechazadas</div>
          <div className="stat-card__value">{counts.rejected}</div>
          <div className="stat-card__delta">Acumulado del dia</div>
        </div>
      </div>

      <Card>
        <CardHeader eyebrow="Filtros" title="Bandeja de solicitudes" />
        <div className="stack-sm">
          <div className="row">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`filter-chip ${statusFilter === f.value ? 'is-active' : ''}`}
                onClick={() => setStatusFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="row">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`filter-chip ${typeFilter === f.value ? 'is-active' : ''}`}
                onClick={() => setTypeFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          {visible.length === 0 ? (
            <div className="empty-state">Sin solicitudes con esos filtros.</div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Tipo</th>
                    <th>Destino</th>
                    <th>Ventana</th>
                    <th>Cupo</th>
                    <th>Riesgo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => {
                    const effective = decisions[r.id] ?? r.status;
                    return (
                      <tr key={r.id}>
                        <td className="text-mono">{r.folio}</td>
                        <td><RequestTypeChip type={r.type} /></td>
                        <td>{r.destination}</td>
                        <td className="text-mono">{r.date} · {r.windowStart}-{r.windowEnd}</td>
                        <td>{personasOVehiculos(r)}</td>
                        <td><RiskDot level={r.riskLevel} /></td>
                        <td><StatusBadge status={effective} /></td>
                        <td>
                          <div className="row" style={{ gap: 6 }}>
                            <Button size="md" variant="success" onClick={() => setDecision(r.id, 'approved')}>Aprobar</Button>
                            <Button size="md" variant="warning" onClick={() => setDecision(r.id, 'needs_correction')}>Corregir</Button>
                            <Button size="md" variant="danger" onClick={() => setDecision(r.id, 'rejected')}>Rechazar</Button>
                            <Button size="md" variant="ghost" onClick={() => setDecision(r.id, 'revoked')}>Revocar</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
