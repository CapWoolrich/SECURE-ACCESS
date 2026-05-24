import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/access/StatusBadge';
import { RequestTypeChip } from '../components/access/RequestTypeChip';
import { RiskDot } from '../components/access/RiskDot';
import { useEvents, useRequests, updateRequestStatus } from '../lib/accessStore';

const todayIso = () => new Date().toISOString().slice(0, 10);

export const DashboardPage = () => {
  const requests = useRequests();
  const events = useEvents();

  const today = todayIso();
  const requestsToday = requests.filter((r) => r.date === today || r.createdAt.startsWith(today)).length;
  const pending = requests.filter((r) => r.status === 'submitted' || r.status === 'needs_correction');
  const active = requests.filter((r) => r.status === 'active');
  const approved = requests.filter((r) => r.status === 'approved');
  const incidents = events.filter((e) => e.eventType === 'incident_flagged').length;
  const gateValidationsToday = events.filter(
    (e) => (e.eventType === 'access_validated' || e.eventType === 'entry_logged') && e.timestamp.startsWith(today),
  ).length;

  const stats = [
    { label: 'Solicitudes hoy', value: requestsToday, accent: 'accent', delta: 'Creadas o programadas para hoy' },
    { label: 'Pendientes aprobacion', value: pending.length, accent: 'warning', delta: 'En cola de seguridad' },
    { label: 'Accesos activos', value: active.length, accent: 'success', delta: 'En ventana vigente' },
    { label: 'Validaciones caseta', value: gateValidationsToday, accent: 'accent', delta: 'Registros del dia' },
    { label: 'Incidentes', value: incidents, accent: 'danger', delta: 'Reportes acumulados' },
  ] as const;

  const recent = [...requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const recentValidations = events
    .filter((e) => e.eventType === 'access_validated' || e.eventType === 'entry_logged')
    .slice(-4)
    .reverse();

  const quickApprove = (folio: string) =>
    updateRequestStatus(folio, 'approved', 'request_approved', 'security_operator', 'Seguridad Demo');
  const quickActivate = (folio: string) =>
    updateRequestStatus(folio, 'active', 'access_validated', 'security_operator', 'Seguridad Demo');

  const isEmpty = requests.length === 0 && events.length === 0;

  return (
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
          <Link to="/portal/login"><Button variant="secondary">Portal solicitante</Button></Link>
          <Link to="/nueva-solicitud"><Button>Nueva solicitud</Button></Link>
        </div>
      </div>

      {isEmpty && (
        <div className="privacy-notice">
          <div>
            <div className="privacy-notice__title">Sin solicitudes todavia</div>
            <div className="privacy-notice__body">
              Comienza generando una solicitud desde el <Link to="/portal/login">Portal del solicitante</Link>{' '}
              o desde <Link to="/nueva-solicitud">Nueva solicitud</Link>. Una vez creada aparecera aqui en
              tiempo real, podras aprobarla con un click, validarla en <Link to="/puerta">Puerta</Link>{' '}
              y revisar el rastro completo en <Link to="/bitacora">Bitacora</Link>.
            </div>
          </div>
        </div>
      )}

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
            eyebrow="Pendientes"
            title="En cola de aprobacion"
            actions={<Link to="/aprobaciones"><Button variant="ghost" size="md">Panel completo</Button></Link>}
          />
          {pending.length === 0 ? (
            <div className="empty-state">Sin solicitudes pendientes.</div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Folio</th><th>Tipo</th><th>Destino</th><th>Ventana</th><th>Estado</th><th>Aprobar</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((r) => (
                    <tr key={r.id}>
                      <td className="text-mono">{r.folio}</td>
                      <td><RequestTypeChip type={r.type} /></td>
                      <td>{r.destination || '--'}</td>
                      <td className="text-mono">{r.windowStart} - {r.windowEnd}</td>
                      <td><StatusBadge status={r.status} /></td>
                      <td>
                        <Button size="md" variant="success" onClick={() => quickApprove(r.folio)}>Aprobar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <CardHeader
            eyebrow="Aprobadas"
            title="Listas para activarse"
            actions={<Link to="/puerta"><Button variant="ghost" size="md">Ir a caseta</Button></Link>}
          />
          {approved.length === 0 ? (
            <div className="empty-state">Sin solicitudes aprobadas en este momento.</div>
          ) : (
            <div className="stack-sm">
              {approved.map((r) => (
                <div key={r.id} className="row-between" style={{ paddingBottom: 10, borderBottom: '1px dashed var(--color-border)' }}>
                  <div className="stack-xs">
                    <strong className="text-mono">{r.folio}</strong>
                    <span className="text-subtle" style={{ fontSize: '0.78rem' }}>{r.destination} · {r.windowStart}-{r.windowEnd}</span>
                  </div>
                  <div className="row">
                    <span className="code-pill">{r.shortCode}</span>
                    <Button size="md" variant="success" onClick={() => quickActivate(r.folio)}>Marcar activa</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="split-2">
        <Card>
          <CardHeader
            eyebrow="En curso"
            title="Accesos activos de hoy"
            actions={<Link to="/puerta"><Button variant="ghost" size="md">Ir a caseta</Button></Link>}
          />
          {active.length === 0 ? (
            <div className="empty-state">Sin accesos activos en este momento.</div>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Folio</th><th>Tipo</th><th>Destino</th><th>Ventana</th><th>Codigo</th><th>Riesgo</th>
                  </tr>
                </thead>
                <tbody>
                  {active.map((r) => (
                    <tr key={r.id}>
                      <td className="text-mono">{r.folio}</td>
                      <td><RequestTypeChip type={r.type} /></td>
                      <td>{r.destination || '--'}</td>
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
          {recentValidations.length === 0 ? (
            <div className="empty-state">Sin validaciones registradas todavia.</div>
          ) : (
            <div className="stack-sm">
              {recentValidations.map((e) => (
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
          )}
        </Card>
      </div>

      <Card>
        <CardHeader eyebrow="Historial" title="Solicitudes recientes" />
        {recent.length === 0 ? (
          <div className="empty-state">Sin solicitudes registradas todavia.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Folio</th><th>Tipo</th><th>Destino</th><th>Fecha</th><th>Ventana</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id}>
                    <td className="text-mono">{r.folio}</td>
                    <td><RequestTypeChip type={r.type} /></td>
                    <td>{r.destination || '--'}</td>
                    <td className="text-mono">{r.date || '--'}</td>
                    <td className="text-mono">{r.windowStart} - {r.windowEnd}</td>
                    <td><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
