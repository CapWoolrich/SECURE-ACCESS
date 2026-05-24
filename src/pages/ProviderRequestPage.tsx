import { useNavigate } from 'react-router-dom';
import { ProviderRequestForm } from '../components/access/ProviderRequestForm';
import { appendRequest } from '../lib/accessStore';

export const ProviderRequestPage = () => {
  const navigate = useNavigate();
  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Solicitud proveedor</div>
          <h1 className="page-header__title">Acceso identificado para proveedor</h1>
          <p className="page-header__sub">
            Requiere identificacion completa, motivo, vehiculo, placa y responsable interno.
            Aplica a mantenimiento, catering, limpieza, contratistas, tecnicos y visitas operativas.
          </p>
        </div>
      </div>
      <ProviderRequestForm
        createdBy="Operador Demo"
        onSubmitted={(req) => {
          appendRequest(req);
          navigate('/aprobaciones');
        }}
      />
    </div>
  );
};
