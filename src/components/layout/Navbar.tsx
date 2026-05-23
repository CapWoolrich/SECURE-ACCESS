import { NavLink } from 'react-router-dom';
import { MOCK_OPERATOR } from '../../data/mockAccessRequests';

const LINKS: Array<{ to: string; label: string }> = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/nueva-solicitud', label: 'Nueva solicitud' },
  { to: '/aprobaciones', label: 'Aprobaciones' },
  { to: '/puerta', label: 'Puerta' },
  { to: '/bitacora', label: 'Bitacora' },
];

const ROLE_LABEL: Record<string, string> = {
  super_admin: 'Super Admin',
  security_admin: 'Sec. Admin',
  security_operator: 'Sec. Operator',
  gate_guard: 'Caseta',
  operator_admin: 'Operador',
  operator_user: 'Operador',
  auditor: 'Auditor',
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const Navbar = () => (
  <header className="navbar">
    <div className="navbar__inner">
      <div className="navbar__brand">
        <div className="navbar__brand-mark">SA</div>
        <div className="navbar__title">
          <span className="navbar__title-main">Secure Access</span>
          <span className="navbar__title-sub">Control privado de accesos</span>
        </div>
      </div>

      <nav className="navbar__links" aria-label="Navegacion principal">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__right">
        <span className="env-pill" title="Ambiente de demostracion">MVP DEMO</span>
        <div className="user-chip" aria-label="Sesion actual">
          <span className="user-chip__avatar">{initials(MOCK_OPERATOR.name)}</span>
          <div className="user-chip__meta">
            <span className="user-chip__name">{MOCK_OPERATOR.name}</span>
            <span className="user-chip__role">{ROLE_LABEL[MOCK_OPERATOR.role]}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);
