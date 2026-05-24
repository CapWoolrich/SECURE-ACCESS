import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/access/StatusBadge';
import { RequestTypeChip } from '../../components/access/RequestTypeChip';
import { useOperatorRequests } from '../../hooks/useOperatorRequests';
import { useNotificationEmails } from '../../hooks/useNotificationEmails';

export const PortalDashboardPage = () => {
  const { requests } = useOperatorRequests();
  const { validEmails } = useNotificationEmails();

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Portal del solicitante</div>
          <h1 className="page-header__title">Mis solicitudes</h1>
          <p className="page-header__sub">
            Revisa el estado de tus autorizaciones emitidas, copia el codigo corto y reenvialo a tus
            correos destinatarios configurados.
          </p>
        </div>
        <div className="page-header__actions">
          <Link to="/portal/nueva-solicitud"><Button>Nueva solicitud</Button></Link>
          <Link to="/portal/configuracion"><Button variant="secondary">Correos destinatarios ({validEmails.length}/4)</Button></Link>
        </div>
      </div>

      <div className="grid-stats">
        <div className="stat-card stat-card--accent">
          <div className="stat-card__eyebrow">Solicitudes en sesion</div>
          <div className="stat-card__value">{requests.length}</div>
          <div className="stat-card__delta">Emitidas desde este dispositivo</div>
        </div>
        <div className="stat-card stat-card--success">
          <div className="stat-card__eyebrow">Correos destinatarios</div>
          <div className="stat-card__value">{validEmails.length}</div>
          <div className="stat-card__delta">De 4 maximos permitidos</div>
        </div>
        <div className="stat-card stat-card--warning">
          <div className="stat-card__eyebrow">Estado promedio</div>
          <div className="stat-card__value">Enviada</div>
          <div className="stat-card__delta">Pendientes de aprobacion en seguridad</div>
        </div>
      </div>

      <Card>
        <CardHeader eyebrow="Historial" title="Solicitudes recientes" />
        {requests.length === 0 ? (
          <div className="empty-state">
            Aun no has emitido solicitudes desde este portal.
            <div style={{ marginTop: 12 }}>
              <Link to="/portal/nueva-solicitud"><Button>Crear primera solicitud</Button></Link>
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Tipo</th>
                  <th>Destino</th>
                  <th>Fecha</th>
                  <th>Ventana</th>
                  <th>Codigo</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td className="text-mono">{r.folio}</td>
                    <td><RequestTypeChip type={r.type} /></td>
                    <td>{r.destination}</td>
                    <td className="text-mono">{r.date}</td>
                    <td className="text-mono">{r.windowStart} - {r.windowEnd}</td>
                    <td><span className="code-pill">{r.shortCode}</span></td>
                    <td><StatusBadge status={r.status} /></td>
                    <td>
                      <Link to={`/portal/solicitud/${r.folio}`}>
                        <Button variant="ghost" size="md">Ver QR</Button>
                      </Link>
                    </td>
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
