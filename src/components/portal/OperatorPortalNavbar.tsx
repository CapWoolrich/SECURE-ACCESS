import { NavLink, useNavigate } from 'react-router-dom';
import { useOperatorSession } from '../../hooks/useOperatorSession';

const LINKS: Array<{ to: string; label: string }> = [
  { to: '/portal', label: 'Mis solicitudes' },
  { to: '/portal/nueva-solicitud', label: 'Nueva solicitud' },
  { to: '/portal/configuracion', label: 'Correos destinatarios' },
];

const initials = (str: string) =>
  str
    .split(/[@.\s]/)
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const OperatorPortalNavbar = () => {
  const { session, signOut } = useOperatorSession();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/portal/login');
  };

  return (
    <header className="navbar navbar--portal">
      <div className="navbar__inner">
        <div className="navbar__brand">
          <div className="navbar__brand-mark">SA</div>
          <div className="navbar__title">
            <span className="navbar__title-main">Portal del solicitante</span>
            <span className="navbar__title-sub">Secure Access · solicitudes y autorizaciones</span>
          </div>
        </div>

        <nav className="navbar__links" aria-label="Navegacion del portal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/portal'}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__right">
          <span className="env-pill" title="Ambiente de demostracion">MVP DEMO</span>
          {session && (
            <div className="user-chip">
              <span className="user-chip__avatar">{initials(session.email)}</span>
              <div className="user-chip__meta">
                <span className="user-chip__name">{session.email}</span>
                <span className="user-chip__role">{session.company}</span>
              </div>
            </div>
          )}
          <button type="button" className="navbar__link" onClick={handleSignOut}>Salir</button>
        </div>
      </div>
    </header>
  );
};
