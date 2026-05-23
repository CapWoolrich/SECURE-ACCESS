import { GateValidationPanel } from '../components/gate/GateValidationPanel';

export const GateValidationPage = () => (
  <div className="stack">
    <div className="page-header">
      <div>
        <div className="page-header__eyebrow">Caseta</div>
        <h1 className="page-header__title">Validacion de acceso en puerta</h1>
        <p className="page-header__sub">
          Pantalla optimizada para tablet. Ingresa el codigo corto o escanea el QR del solicitante para
          autorizar entradas, salidas y reportar incidentes.
        </p>
      </div>
    </div>
    <GateValidationPanel />
  </div>
);
