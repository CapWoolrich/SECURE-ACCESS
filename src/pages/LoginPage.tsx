import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('operador.demo');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 350);
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <aside className="login-card__brand">
          <div className="login-mark">
            <span className="login-mark__dot">SA</span>
            <span>Secure Access</span>
          </div>
          <div>
            <h1 className="login-h1">Control privado de accesos aeroportuarios</h1>
            <p className="login-sub">
              Plataforma para operadores, seguridad y validacion en caseta. Trazabilidad completa,
              privacidad por diseno y operacion en tiempo real.
            </p>
            <ul className="login-meta-list">
              <li>Accesos VIP por evento - sin exponer identidades.</li>
              <li>Proveedores identificados con responsable y ventana.</li>
              <li>Validacion en caseta por codigo corto y QR.</li>
              <li>Bitacora auditable de cada accion.</li>
            </ul>
          </div>
          <div className="login-footer">Ambiente MVP - datos simulados</div>
        </aside>

        <section className="login-card__form">
          <div>
            <h2 className="login-form__title">Acceso interno</h2>
            <p className="login-form__sub">Seguridad, caseta y auditoria.</p>
          </div>

          <form className="login-form stack" style={{ marginTop: 24 }} onSubmit={handleSubmit}>
            <Input
              label="Usuario"
              name="user"
              placeholder="usuario.operativo"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
            />
            <Input
              label="Contrasena"
              name="pass"
              type="password"
              placeholder="********"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
            />
            <Button type="submit" size="lg" block disabled={loading}>
              {loading ? 'Validando...' : 'Iniciar sesion'}
            </Button>
            <div className="login-form__warn">
              Ambiente MVP / Demo. Autenticacion simulada. No se conecta con servicios reales.
            </div>
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.82rem' }}>
              <Link to="/portal/login" style={{ color: '#94a3b8' }}>
                Soy operador solicitante &rarr; ir al Portal del solicitante
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
