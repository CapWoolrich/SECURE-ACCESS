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

import { OperatorPortalLayout } from '../components/portal/OperatorPortalLayout';
import { PortalLoginPage } from '../pages/portal/PortalLoginPage';
import { PortalDashboardPage } from '../pages/portal/PortalDashboardPage';
import { PortalNewRequestPage } from '../pages/portal/PortalNewRequestPage';
import { PortalVipRequestPage } from '../pages/portal/PortalVipRequestPage';
import { PortalProviderRequestPage } from '../pages/portal/PortalProviderRequestPage';
import { PortalRequestSuccessPage } from '../pages/portal/PortalRequestSuccessPage';
import { PortalEmailsConfigPage } from '../pages/portal/PortalEmailsConfigPage';

const InternalShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  if (location.pathname === '/login') return <>{children}</>;
  return <AppLayout>{children}</AppLayout>;
};

const Portal = ({ children }: { children: React.ReactNode }) => (
  <OperatorPortalLayout>{children}</OperatorPortalLayout>
);

export const App = () => (
  <Routes>
    {/* Portal del solicitante (sitio satelite) */}
    <Route path="/portal/login" element={<PortalLoginPage />} />
    <Route path="/portal" element={<Portal><PortalDashboardPage /></Portal>} />
    <Route path="/portal/nueva-solicitud" element={<Portal><PortalNewRequestPage /></Portal>} />
    <Route path="/portal/solicitudes/vip" element={<Portal><PortalVipRequestPage /></Portal>} />
    <Route path="/portal/solicitudes/proveedor" element={<Portal><PortalProviderRequestPage /></Portal>} />
    <Route path="/portal/solicitud/:folio" element={<Portal><PortalRequestSuccessPage /></Portal>} />
    <Route path="/portal/configuracion" element={<Portal><PortalEmailsConfigPage /></Portal>} />

    {/* Sistema interno (seguridad / caseta) */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/login" element={<InternalShell><LoginPage /></InternalShell>} />
    <Route path="/dashboard" element={<InternalShell><DashboardPage /></InternalShell>} />
    <Route path="/nueva-solicitud" element={<InternalShell><NewAccessRequestPage /></InternalShell>} />
    <Route path="/solicitudes/vip" element={<InternalShell><VipRequestPage /></InternalShell>} />
    <Route path="/solicitudes/proveedor" element={<InternalShell><ProviderRequestPage /></InternalShell>} />
    <Route path="/aprobaciones" element={<InternalShell><SecurityApprovalPage /></InternalShell>} />
    <Route path="/puerta" element={<InternalShell><GateValidationPage /></InternalShell>} />
    <Route path="/bitacora" element={<InternalShell><AuditLogPage /></InternalShell>} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);
