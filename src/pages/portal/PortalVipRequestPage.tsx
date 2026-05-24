import { useNavigate } from 'react-router-dom';
import { VipRequestForm } from '../../components/access/VipRequestForm';
import { useOperatorRequests } from '../../hooks/useOperatorRequests';
import { useOperatorSession } from '../../hooks/useOperatorSession';

export const PortalVipRequestPage = () => {
  const navigate = useNavigate();
  const { append } = useOperatorRequests();
  const { session } = useOperatorSession();

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Solicitud VIP</div>
          <h1 className="page-header__title">Acceso VIP por evento</h1>
          <p className="page-header__sub">
            Autoriza el evento sin exponer identidades. El codigo se enviara a tus correos destinatarios
            configurados.
          </p>
        </div>
      </div>
      <VipRequestForm
        createdBy={session?.email ?? 'Operador Demo'}
        defaultCompany={session?.company}
        onSubmitted={(req) => {
          append(req);
          navigate(`/portal/solicitud/${req.folio}`);
        }}
      />
    </div>
  );
};
