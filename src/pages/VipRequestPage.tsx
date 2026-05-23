import { VipRequestForm } from '../components/access/VipRequestForm';

export const VipRequestPage = () => (
  <div className="stack">
    <div className="page-header">
      <div>
        <div className="page-header__eyebrow">Solicitud VIP</div>
        <h1 className="page-header__title">Acceso VIP por evento</h1>
        <p className="page-header__sub">
          Autoriza el evento sin exponer identidades. Aplica a pasajeros, duenos, invitados y choferes.
        </p>
      </div>
    </div>
    <VipRequestForm />
  </div>
);
