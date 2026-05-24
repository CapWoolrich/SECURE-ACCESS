import { useNavigate } from 'react-router-dom';
import { RequestTypeCard } from '../../components/access/RequestTypeCard';
import { Badge } from '../../components/ui/Badge';

export const PortalNewRequestPage = () => {
  const navigate = useNavigate();
  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Nueva solicitud</div>
          <h1 className="page-header__title">Selecciona el tipo de acceso</h1>
          <p className="page-header__sub">
            Cada tipo de acceso sigue un flujo distinto. Al enviar, recibiras codigo corto y QR
            en el portal y por correo en los destinatarios autorizados.
          </p>
        </div>
      </div>

      <div className="request-type-grid">
        <RequestTypeCard
          variant="vip"
          title="Solicitud VIP"
          subtitle="Acceso por evento - sin exponer identidades"
          bullets={[
            'Empresa, aeronave y destino',
            'Fecha y ventana horaria',
            'Maximo de personas y vehiculos',
            'Responsable y escolta opcional',
            'Codigo corto + QR temporal',
          ]}
          onClick={() => navigate('/portal/solicitudes/vip')}
          footer={<Badge tone="info">Pasajeros, duenos, choferes e invitados</Badge>}
        />
        <RequestTypeCard
          variant="prv"
          title="Solicitud Proveedor"
          subtitle="Acceso identificado con responsable interno"
          bullets={[
            'Nombre, empresa y motivo',
            'Vehiculo y placa',
            'Herramientas o equipo',
            'Area destino y responsable',
            'Ventana horaria limitada',
          ]}
          onClick={() => navigate('/portal/solicitudes/proveedor')}
          footer={<Badge tone="cyan">Mantenimiento, catering, tecnicos, contratistas</Badge>}
        />
      </div>

      <div className="privacy-notice">
        <div>
          <div className="privacy-notice__title">Regla central del producto</div>
          <div className="privacy-notice__body">
            Para accesos VIP el sistema autoriza un evento, una ventana horaria, un destino y un cupo
            maximo. No se capturan nombres, placas, telefonos ni identificaciones de pasajeros o choferes.
            Para proveedores, en cambio, se requiere identificacion completa para mantener trazabilidad
            operativa.
          </div>
        </div>
      </div>
    </div>
  );
};
