import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/access/StatusBadge';
import { RequestTypeChip } from '../components/access/RequestTypeChip';
import { RiskDot } from '../components/access/RiskDot';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_REQUESTS,
  MOCK_AUDIT_EVENTS,
} from '../data/mockAccessRequests';

const stats = [
  { label: 'Solicitudes hoy', value: MOCK_DASHBOARD_STATS.requestsToday, accent: 'accent', delta: 'Acumulado del dia operativo' },
  { label: 'Pendientes aprobacion', value: MOCK_DASHBOARD_STATS.pendingApprovals, accent: 'warning', delta: 'En cola de seguridad' },
  { label: 'Accesos activos', value: MOCK_DASHBOARD_STATS.activeAccesses, accent: 'success', delta: 'Con ventana vigente' },
  { label: 'Validaciones caseta', value: MOCK_DASHBOARD_STATS.gateValidationsToday, accent: 'accent', delta: 'Entradas registradas hoy' },
  { label: 'Incidentes', value: MOCK_DASHBOARD_STATS.incidents, accent: 'danger', delta: 'Reportes abiertos' },
] as const;

const ACTIVE = MOCK_REQUESTS.filter((r) => r.status === 'active');
const PENDING = MOCK_REQUESTS.filter((r) => r.status === 'submitted' || r.status === 'needs_correction');
const RECENT = [...MOCK_REQUESTS].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
const RECENT_VALIDATIONS = MOCK_AUDIT_EVENTS
  .filter((e) => e.eventType === 'access_validated' || e.eventType === 'entry_logged')
  .slice(-4)
  .reverse();

export const DashboardPage = () => (
  <div className="stack">
    <div className="page-header">
      <div>
        <div className="page-header__eyebrow">Operations Control Center</div>
        <h1 className="page-header__title">Dashboard operativo</h1>
        <p className="page-header__sub">
          Vision en tiempo real de solicitudes, aprobaciones, accesos activos y validacion en caseta.
        </p>
      </div>
      <div className="page-header__actions">
        <Link to="/nueva-solicitud"><Button>Nueva solicitud</Button></Link>
        <Link to="/aprobaciones"><Button variant="secondary">Ir a aprobaciones</Button></Link>
      </div>
    </div>

    <div className="grid-stats">
      {stats.map((s) => (
        <div key={s.label} className={`stat-card stat-card--${s.accent}`}>
          <div className="stat-card__eyebrow">{s.label}</div>
          <div className="stat-card__value">{s.value}</div>
          <div className="stat-card__delta">{s.delta}</div>
        </div>
      ))}
    </div>

    <div className="split-2">
      <Card>
        <CardHeader
          eyebrow="En curso"
          title="Accesos activos de hoy"
          actions={<Link to="/puerta"><Button variant="ghost" size="md">Ir a caseta</Button></Link>}
        />
        {ACTIVE.length === 0 ? (
          <div className="empty-state">Sin accesos activos en este momento.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Tipo</th>
                  <th>Destino</th>
                  <th>Ventana</th>
                  <th>Codigo</th>
                  <th>Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVE.map((r) => (
                  <tr key={r.id}>
                    <td className="text-mono">{r.folio}</td>
                    <td><RequestTypeChip type={r.type} /></td>
                    <td>{r.destination}</td>
                    <td className="text-mono">{r.windowStart} - {r.windowEnd}</td>
                    <td><span className="code-pill">{r.shortCode}</span></td>
                    <td><RiskDot level={r.riskLevel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader eyebrow="Validaciones" title="Caseta - actividad reciente" />
        <div className="stack-sm">
          {RECENT_VALIDATIONS.length === 0 && <div className="empty-state">Sin validaciones recientes.</div>}
          {RECENT_VALIDATIONS.map((e) => (
            <div key={e.id} className="row-between" style={{ paddingBottom: 10, borderBottom: '1px dashed var(--color-border)' }}>
              <div className="stack-xs">
                <strong className="text-mono">{e.folio}</strong>
                <span className="text-subtle" style={{ fontSize: '0.78rem' }}>{e.actorLabel}</span>
              </div>
              <div className="stack-xs" style={{ alignItems: 'flex-end' }}>
                <span className="text-mono" style={{ fontSize: '0.78rem' }}>{e.timestamp.slice(11, 16)}</span>
                <StatusBadge status={e.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    <div className="split-2">
      <Card>
        <CardHeader
          eyebrow="Pendientes"
          title="En cola de aprobacion"
          actions={<Link to="/aprobaciones"><Button variant="ghost" size="md">Ver todas</Button></Link>}
        />
        {PENDING.length === 0 ? (
          <div className="empty-state">Sin solicitudes pendientes.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Tipo</th>
                  <th>Destino</th>
                  <th>Ventana</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {PENDING.map((r) => (
                  <tr key={r.id}>
                    <td className="text-mono">{r.folio}</td>
                    <td><RequestTypeChip type={r.type} /></td>
                    <td>{r.destination}</td>
                    <td className="text-mono">{r.windowStart} - {r.windowEnd}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card>
        <CardHeader eyebrow="Estado operacional" title="Riesgo y prioridad" />
        <div className="stack-sm">
          <div className="row-between">
            <span className="text-muted">Nivel operativo</span>
            <span className="risk-dot risk-dot--low">Normal</span>
          </div>
          <div className="row-between">
            <span className="text-muted">Validaciones / hora</span>
            <strong className="text-mono">4.2</strong>
          </div>
          <div className="row-between">
            <span className="text-muted">Tiempo medio de aprobacion</span>
            <strong className="text-mono">06:18 min</strong>
          </div>
          <div className="row-between">
            <span className="text-muted">Incidentes abiertos</span>
            <strong className="text-mono">{MOCK_DASHBOARD_STATS.incidents}</strong>
          </div>
          <hr className="hr-soft" />
          <div className="warn-notice">
            Vehiculo no escoltado intentando ingresar al Hangar Ejecutivo Demo - revisar bitacora SA-2026-0001.
          </div>
        </div>
      </Card>
    </div>

    <Card>
      <CardHeader eyebrow="Historial" title="Solicitudes recientes" />
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Tipo</th>
              <th>Destino</th>
              <th>Fecha</th>
              <th>Ventana</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {RECENT.map((r) => (
              <tr key={r.id}>
                <td className="text-mono">{r.folio}</td>
                <td><RequestTypeChip type={r.type} /></td>
                <td>{r.destination}</td>
                <td className="text-mono">{r.date}</td>
                <td className="text-mono">{r.windowStart} - {r.windowEnd}</td>
                <td><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);
