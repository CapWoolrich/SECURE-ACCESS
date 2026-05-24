import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MAX_RECIPIENTS, isValidEmail } from '../../hooks/useNotificationEmails';

interface EmailRecipientsFieldProps {
  emails: string[];
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  onAdd: (value: string) => void;
}

export const EmailRecipientsField = ({ emails, onChange, onRemove, onAdd }: EmailRecipientsFieldProps) => {
  const filled = emails.length;
  const canAdd = filled < MAX_RECIPIENTS;

  return (
    <div className="stack-sm">
      <div className="row-between">
        <div>
          <div className="field__label">Correos destinatarios autorizados</div>
          <div className="field__hint">Hasta {MAX_RECIPIENTS} correos. Recibiran codigo corto, folio y QR cuando se emita una autorizacion.</div>
        </div>
        <Badge tone={filled === MAX_RECIPIENTS ? 'warning' : 'info'}>{filled}/{MAX_RECIPIENTS}</Badge>
      </div>

      <div className="stack-sm">
        {emails.map((email, idx) => {
          const valid = !email || isValidEmail(email);
          return (
            <div key={idx} className="row" style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Input
                  type="email"
                  placeholder="operador@empresa.com"
                  value={email}
                  onChange={(e) => onChange(idx, e.target.value)}
                  error={!valid ? 'Formato de correo invalido.' : undefined}
                />
              </div>
              <Button variant="ghost" onClick={() => onRemove(idx)}>Quitar</Button>
            </div>
          );
        })}

        {canAdd && (
          <Button variant="secondary" onClick={() => onAdd('')}>
            Anadir correo destinatario
          </Button>
        )}
        {!canAdd && (
          <div className="warn-notice">
            Limite alcanzado: solo se permiten {MAX_RECIPIENTS} correos. Elimina uno para agregar otro.
          </div>
        )}
      </div>
    </div>
  );
};
