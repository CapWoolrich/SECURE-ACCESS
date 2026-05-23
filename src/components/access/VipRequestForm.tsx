import { useMemo, useState } from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Badge } from '../ui/Badge';
import { StatusBadge } from './StatusBadge';
import {
  buildQrPayload,
  generateFolio,
  generateShortCode,
} from '../../lib/accessCodes';
import type { AccessStatus } from '../../types/access';

interface VipFormState {
  requestingCompany: string;
  aircraftReference: string;
  destination: string;
  date: string;
  windowStart: string;
  windowEnd: string;
  maxPeople: string;
  maxVehicles: string;
  internalResponsible: string;
  escortRequired: boolean;
  comments: string;
}

const DESTINOS = [
  { value: '', label: 'Selecciona un destino' },
  { value: 'Hangar Ejecutivo Demo', label: 'Hangar Ejecutivo Demo' },
  { value: 'FBO Demo Terminal 1', label: 'FBO Demo Terminal 1' },
  { value: 'FBO Demo Terminal 2', label: 'FBO Demo Terminal 2' },
  { value: 'Plataforma Demo', label: 'Plataforma Demo' },
];

const initialState: VipFormState = {
  requestingCompany: 'Empresa Demo Aviation',
  aircraftReference: '',
  destination: '',
  date: '',
  windowStart: '',
  windowEnd: '',
  maxPeople: '4',
  maxVehicles: '2',
  internalResponsible: '',
  escortRequired: false,
  comments: '',
};

export const VipRequestForm = () => {
  const [form, setForm] = useState<VipFormState>(initialState);
  const [status, setStatus] = useState<AccessStatus>('draft');
  const [folio, setFolio] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');

  const update = <K extends keyof VipFormState>(key: K, value: VipFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const qrPayload = useMemo(() => {
    if (!folio || !shortCode) return null;
    return buildQrPayload(folio, shortCode, 'vip_event');
  }, [folio, shortCode]);

  const handleSaveDraft = () => {
    if (!folio) setFolio(generateFolio());
    setStatus('draft');
  };

  const handleSubmit = () => {
    const newFolio = folio || generateFolio();
    const newCode = shortCode || generateShortCode('vip_event');
    setFolio(newFolio);
    setShortCode(newCode);
    setStatus('submitted');
  };

  return (
    <div className="split-2">
      <div className="stack">
        <div className="privacy-notice">
          <div>
            <div className="privacy-notice__title">Privacidad operativa - acceso VIP</div>
            <div className="privacy-notice__body">
              Para accesos VIP no se solicitan nombres, placas, telefonos ni identificaciones.
              El sistema autoriza un evento, una ventana horaria, un destino y un cupo maximo.
            </div>
          </div>
        </div>

        <Card>
          <CardHeader eyebrow="Datos operativos" title="Empresa, aeronave y destino" />
          <div className="grid-2">
            <Input
              label="Empresa solicitante"
              name="requestingCompany"
              value={form.requestingCompany}
              onChange={(e) => update('requestingCompany', e.target.value)}
              placeholder="Empresa Demo Aviation"
            />
            <Input
              label="Aeronave / referencia operativa"
              name="aircraftReference"
              value={form.aircraftReference}
              onChange={(e) => update('aircraftReference', e.target.value)}
              placeholder="REF-DEMO-01"
              hint="Referencia operativa interna, no matricula real."
            />
            <Select
              label="Destino"
              name="destination"
              value={form.destination}
              onChange={(e) => update('destination', e.target.value)}
              options={DESTINOS}
            />
            <Input
              label="Fecha del evento"
              type="date"
              name="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
            />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Control de acceso" title="Ventana, cupo y escolta" />
          <div className="grid-2">
            <Input
              label="Hora de inicio"
              type="time"
              name="windowStart"
              value={form.windowStart}
              onChange={(e) => update('windowStart', e.target.value)}
            />
            <Input
              label="Hora de fin"
              type="time"
              name="windowEnd"
              value={form.windowEnd}
              onChange={(e) => update('windowEnd', e.target.value)}
            />
            <Input
              label="Maximo de personas"
              type="number"
              min={1}
              name="maxPeople"
              value={form.maxPeople}
              onChange={(e) => update('maxPeople', e.target.value)}
            />
            <Input
              label="Maximo de vehiculos"
              type="number"
              min={0}
              name="maxVehicles"
              value={form.maxVehicles}
              onChange={(e) => update('maxVehicles', e.target.value)}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <Switch
              name="escortRequired"
              checked={form.escortRequired}
              onChange={(e) => update('escortRequired', e.target.checked)}
              label="Escolta requerida"
            />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Responsable interno" title="Asignacion operativa" />
          <div className="stack-sm">
            <Input
              label="Responsable interno"
              name="internalResponsible"
              value={form.internalResponsible}
              onChange={(e) => update('internalResponsible', e.target.value)}
              placeholder="Coordinador de plataforma, despacho, etc."
            />
            <Textarea
              label="Comentarios operativos internos"
              name="comments"
              value={form.comments}
              onChange={(e) => update('comments', e.target.value)}
              placeholder="Notas para seguridad. Visible solo internamente."
            />
          </div>
        </Card>

        <div className="row-end">
          <Button variant="ghost" onClick={handleSaveDraft}>Guardar borrador</Button>
          <Button variant="primary" onClick={handleSubmit}>Enviar solicitud</Button>
        </div>
      </div>

      <aside className="summary-panel">
        <Card>
          <CardHeader
            eyebrow="Resumen del acceso"
            title={<span className="row" style={{ gap: 8 }}>
              <Badge tone="info">VIP</Badge>
              <StatusBadge status={status} />
            </span>}
            subtitle="Vista previa de la solicitud"
          />
          <dl className="dl">
            <dt>Folio</dt>
            <dd className="text-mono">{folio || 'Se genera al enviar'}</dd>
            <dt>Codigo corto</dt>
            <dd>{shortCode ? <span className="code-pill">{shortCode}</span> : <span className="text-subtle">--</span>}</dd>
            <dt>Empresa</dt>
            <dd>{form.requestingCompany || '--'}</dd>
            <dt>Aeronave</dt>
            <dd>{form.aircraftReference || '--'}</dd>
            <dt>Destino</dt>
            <dd>{form.destination || '--'}</dd>
            <dt>Fecha</dt>
            <dd className="text-mono">{form.date || '--'}</dd>
            <dt>Ventana</dt>
            <dd className="text-mono">{form.windowStart || '--'} - {form.windowEnd || '--'}</dd>
            <dt>Cupo personas</dt>
            <dd>{form.maxPeople || '--'}</dd>
            <dt>Cupo vehiculos</dt>
            <dd>{form.maxVehicles || '--'}</dd>
            <dt>Escolta</dt>
            <dd>{form.escortRequired ? 'Requerida' : 'No requerida'}</dd>
            <dt>Responsable</dt>
            <dd>{form.internalResponsible || '--'}</dd>
          </dl>
          {qrPayload && (
            <>
              <hr className="hr-soft" />
              <div className="stack-xs">
                <div className="card__eyebrow">QR Payload</div>
                <pre className="text-mono" style={{ background: 'var(--color-bg-inverted)', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: 11, overflow: 'auto' }}>
{JSON.stringify(qrPayload, null, 2)}
                </pre>
                <span className="text-subtle" style={{ fontSize: '0.72rem' }}>
                  Sin nombres, placas ni identificaciones.
                </span>
              </div>
            </>
          )}
        </Card>

        <Card variant="inverted">
          <div className="card__eyebrow" style={{ color: '#94a3b8' }}>Recuerda</div>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: 8 }}>
            El QR y el codigo corto se entregan al solicitante cuando seguridad aprueba.
            No se debe compartir por canales informales.
          </p>
        </Card>
      </aside>
    </div>
  );
};
