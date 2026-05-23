import { NavLink, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { NewAccessRequestPage } from '../pages/NewAccessRequestPage';
import { SecurityApprovalPage } from '../pages/SecurityApprovalPage';
import { GateValidationPage } from '../pages/GateValidationPage';
import { AuditLogPage } from '../pages/AuditLogPage';

const links = [
  ['/', 'Login'],
  ['/dashboard', 'Dashboard'],
  ['/nueva-solicitud', 'Nueva solicitud'],
  ['/aprobaciones', 'Aprobaciones'],
  ['/puerta', 'Puerta'],
  ['/bitacora', 'Bitácora'],
] as const;

export const App = () => (
  <div className="layout">
    <nav className="topbar">
      <span className="brand">Secure Access PWA</span>
      <div className="row">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
    <main className="container">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/nueva-solicitud" element={<NewAccessRequestPage />} />
        <Route path="/aprobaciones" element={<SecurityApprovalPage />} />
        <Route path="/puerta" element={<GateValidationPage />} />
        <Route path="/bitacora" element={<AuditLogPage />} />
      </Routes>
    </main>
  </div>
);
