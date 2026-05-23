import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { NewAccessRequestPage } from '../pages/NewAccessRequestPage';
import { VipRequestPage } from '../pages/VipRequestPage';
import { ProviderRequestPage } from '../pages/ProviderRequestPage';
import { SecurityApprovalPage } from '../pages/SecurityApprovalPage';
import { GateValidationPage } from '../pages/GateValidationPage';
import { AuditLogPage } from '../pages/AuditLogPage';
import { AppLayout } from '../components/layout/AppLayout';

const Shell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // En /login la barra superior no se muestra: el layout es full bleed.
  if (location.pathname === '/login') return <>{children}</>;
  return <AppLayout>{children}</AppLayout>;
};

export const App = () => (
  <Shell>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/nueva-solicitud" element={<NewAccessRequestPage />} />
      <Route path="/solicitudes/vip" element={<VipRequestPage />} />
      <Route path="/solicitudes/proveedor" element={<ProviderRequestPage />} />
      <Route path="/aprobaciones" element={<SecurityApprovalPage />} />
      <Route path="/puerta" element={<GateValidationPage />} />
      <Route path="/bitacora" element={<AuditLogPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Shell>
);
