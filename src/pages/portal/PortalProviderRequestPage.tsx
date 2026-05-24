import { useNavigate } from 'react-router-dom';
import { ProviderRequestForm } from '../../components/access/ProviderRequestForm';
import { useOperatorRequests } from '../../hooks/useOperatorRequests';
import { useOperatorSession } from '../../hooks/useOperatorSession';

export const PortalProviderRequestPage = () => {
  const navigate = useNavigate();
  const { append } = useOperatorRequests();
  const { session } = useOperatorSession();

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Solicitud proveedor</div>
          <h1 className="page-header__title">Acceso identificado para proveedor</h1>
          <p className="page-header__sub">
            Requiere identificacion completa. El codigo se enviara a tus correos destinatarios
            configurados.
          </p>
        </div>
      </div>
      <ProviderRequestForm
        createdBy={session?.email ?? 'Operador Demo'}
        onSubmitted={(req) => {
          append(req);
          navigate(`/portal/solicitud/${req.folio}`);
        }}
      />
    </div>
  );
};
