import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/access/StatusBadge';
import { RequestTypeChip } from '../../components/access/RequestTypeChip';
import { QrPreview } from '../../components/portal/QrPreview';
import { useOperatorRequests } from '../../hooks/useOperatorRequests';
import { useNotificationEmails } from '../../hooks/useNotificationEmails';
import { buildQrPayload } from '../../lib/accessCodes';

export const PortalRequestSuccessPage = () => {
  const { folio } = useParams<{ folio: string }>();
  const { findByFolio } = useOperatorRequests();
  const { validEmails } = useNotificationEmails();
  const navigate = useNavigate();

  const request = folio ? findByFolio(folio) : null;

  if (!request) {
    return (
      <div className="stack">
        <Card>
          <CardHeader eyebrow="Solicitud" title="No encontrada" subtitle={`Folio ${folio ?? ''}`} />
          <div className="empty-state">
            No encontramos esta solicitud en tu sesion actual. Si recargaste la pagina o iniciaste sesion
            en otro dispositivo, vuelve a crearla.
          </div>
          <div className="row-end" style={{ marginTop: 16 }}>
            <Button onClick={() => navigate('/portal/nueva-solicitud')}>Crear solicitud</Button>
          </div>
        </Card>
      </div>
    );
  }

  const payload = buildQrPayload(request.folio, request.shortCode, request.type);

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Solicitud enviada</div>
          <h1 className="page-header__title">Tu autorizacion fue generada</h1>
          <p className="page-header__sub">
            Codigo corto y QR listos. El QR no incluye datos personales: solo identifica el evento y la
            ventana de acceso.
          </p>
        </div>
        <div className="page-header__actions">
          <Link to="/portal"><Button variant="secondary">Volver al portal</Button></Link>
          <Link to="/portal/nueva-solicitud"><Button>Otra solicitud</Button></Link>
        </div>
      </div>

      <div className="split-2">
        <Card>
          <CardHeader
            eyebrow={request.folio}
            title={<span className="row" style={{ gap: 8 }}>
              <RequestTypeChip type={request.type} />
              <StatusBadge status={request.status} />
            </span>}
            subtitle={request.destination}
          />
          <div className="row" style={{ alignItems: 'flex-start', gap: 24 }}>
            <QrPreview payload={payload} />
            <div className="stack-sm" style={{ flex: 1, minWidth: 220 }}>
              <div>
                <div className="card__eyebrow">Codigo corto</div>
                <div className="code-pill" style={{ fontSize: '1.1rem', padding: '8px 14px' }}>{request.shortCode}</div>
              </div>
              <dl className="dl">
                <dt>Folio</dt><dd className="text-mono">{request.folio}</dd>
                <dt>Fecha</dt><dd className="text-mono">{request.date}</dd>
                <dt>Ventana</dt><dd className="text-mono">{request.windowStart} - {request.windowEnd}</dd>
                <dt>Destino</dt><dd>{request.destination}</dd>
                <dt>Responsable</dt><dd>{request.internalResponsible || '--'}</dd>
                <dt>Escolta</dt><dd>{request.escortRequired ? 'Requerida' : 'No requerida'}</dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Notificacion" title="Envio a correos destinatarios" />
          {validEmails.length === 0 ? (
            <div className="stack-sm">
              <div className="warn-notice">
                No tienes correos destinatarios configurados. Configura hasta 4 para recibir QR y codigo
                automaticamente en cada solicitud.
              </div>
              <div className="row-end">
                <Link to="/portal/configuracion"><Button>Configurar correos</Button></Link>
              </div>
            </div>
          ) : (
            <div className="stack-sm">
              <div className="privacy-notice">
                <div>
                  <div className="privacy-notice__title">Notificacion simulada</div>
                  <div className="privacy-notice__body">
                    En modo MVP la app no envia correos reales. Cuando se conecte el servicio de correo,
                    estos destinatarios recibiran codigo corto, folio y QR sin datos personales.
                  </div>
                </div>
              </div>
              <ul className="recipient-list">
                {validEmails.map((email) => (
                  <li key={email}>
                    <span className="recipient-list__dot" />
                    <span className="text-mono">{email}</span>
                    <Badge tone="success">Enviado</Badge>
                  </li>
                ))}
              </ul>
              <div className="text-subtle" style={{ fontSize: '0.75rem' }}>
                Conteo: {validEmails.length}/4 destinatarios. Editable en Correos destinatarios.
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
