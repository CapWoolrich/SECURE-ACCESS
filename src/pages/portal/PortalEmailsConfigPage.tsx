import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmailRecipientsField } from '../../components/portal/EmailRecipientsField';
import { useNotificationEmails, MAX_RECIPIENTS } from '../../hooks/useNotificationEmails';
import { Link } from 'react-router-dom';

export const PortalEmailsConfigPage = () => {
  const { emails, validEmails, setAt, remove, add, replaceAll } = useNotificationEmails();

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Configuracion</div>
          <h1 className="page-header__title">Correos destinatarios</h1>
          <p className="page-header__sub">
            Define hasta {MAX_RECIPIENTS} correos que recibiran codigo corto, folio y QR de cada
            autorizacion que generes desde el portal. Los correos no se publican ni se comparten.
          </p>
        </div>
        <div className="page-header__actions">
          <Link to="/portal"><Button variant="secondary">Volver</Button></Link>
        </div>
      </div>

      <div className="split-2">
        <Card>
          <CardHeader
            eyebrow="Lista activa"
            title="Hasta 4 destinatarios"
            actions={<Badge tone={validEmails.length === MAX_RECIPIENTS ? 'warning' : 'info'}>{validEmails.length}/{MAX_RECIPIENTS} validos</Badge>}
          />
          <EmailRecipientsField
            emails={emails}
            onChange={setAt}
            onRemove={remove}
            onAdd={add}
          />
          <hr className="hr-soft" />
          <div className="row-end">
            <Button variant="ghost" onClick={() => replaceAll([])}>Vaciar lista</Button>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Politica" title="Buenas practicas" />
          <ul className="stack-xs" style={{ listStyle: 'none', padding: 0 }}>
            <li className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
              <span className="dot-bullet" />
              <span>Usa correos institucionales del operador, no correos personales.</span>
            </li>
            <li className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
              <span className="dot-bullet" />
              <span>Limita la lista a las personas que realmente necesitan recibir el codigo.</span>
            </li>
            <li className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
              <span className="dot-bullet" />
              <span>Si rota personal, actualiza la lista. El QR es temporal pero el habito importa.</span>
            </li>
            <li className="row" style={{ alignItems: 'flex-start', gap: 8 }}>
              <span className="dot-bullet" />
              <span>El QR no contiene nombres, placas ni telefonos: solo identifica el evento.</span>
            </li>
          </ul>
          <hr className="hr-soft" />
          <div className="privacy-notice">
            <div>
              <div className="privacy-notice__title">Almacenamiento</div>
              <div className="privacy-notice__body">
                Mientras la repo este publica, los correos se guardan localmente en tu navegador y nunca
                se envian a un servidor. Al integrar Supabase se moveran a la base de datos del operador
                con RLS por rol.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
