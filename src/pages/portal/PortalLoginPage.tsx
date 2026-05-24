import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useOperatorSession } from '../../hooks/useOperatorSession';
import { isValidEmail } from '../../hooks/useNotificationEmails';

export const PortalLoginPage = () => {
  const { signIn } = useOperatorSession();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/portal';

  const [email, setEmail] = useState('operador@empresa-demo.com');
  const [company, setCompany] = useState('Empresa Demo Aviation');
  const [pass, setPass] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailOk = isValidEmail(email);
  const formOk = emailOk && company.trim().length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formOk) return;
    setLoading(true);
    window.setTimeout(() => {
      signIn(email.trim(), company.trim());
      setLoading(false);
      navigate(next);
    }, 350);
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <aside className="login-card__brand">
          <div className="login-mark">
            <span className="login-mark__dot">SA</span>
            <span>Portal del solicitante</span>
          </div>
          <div>
            <h1 className="login-h1">Solicita accesos a hangares y FBOs</h1>
            <p className="login-sub">
              Espacio dedicado a operadores. Genera solicitudes VIP o de proveedor,
              recibe el codigo corto y QR en el portal, y reenvialo a tus correos autorizados.
            </p>
            <ul className="login-meta-list">
              <li>Sesion privada por operador.</li>
              <li>Hasta 4 correos destinatarios para recibir QR y codigo.</li>
              <li>Sin datos personales sensibles en accesos VIP.</li>
              <li>Trazabilidad completa de cada solicitud.</li>
            </ul>
          </div>
          <div className="login-footer">Ambiente MVP - autenticacion simulada</div>
        </aside>

        <section className="login-card__form">
          <div>
            <h2 className="login-form__title">Acceso del operador</h2>
            <p className="login-form__sub">Inicia sesion para enviar una solicitud de acceso.</p>
          </div>

          <form className="login-form stack" style={{ marginTop: 24 }} onSubmit={handleSubmit}>
            <Input
              label="Correo del operador"
              type="email"
              name="email"
              placeholder="operador@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              error={touched && !emailOk ? 'Formato de correo invalido.' : undefined}
            />
            <Input
              label="Empresa / operador"
              name="company"
              placeholder="Empresa Demo Aviation"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              label="Contrasena"
              type="password"
              name="pass"
              placeholder="********"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
            />
            <Button type="submit" size="lg" block disabled={loading}>
              {loading ? 'Validando...' : 'Entrar al portal'}
            </Button>
            <div className="login-form__warn">
              Ambiente MVP / Demo. Autenticacion simulada. La contrasena no se valida.
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.78rem' }}>
              <Link to="/login" style={{ color: '#94a3b8' }}>Acceso interno (seguridad / caseta)</Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
