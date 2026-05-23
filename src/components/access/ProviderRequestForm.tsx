import { useState } from 'react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Badge } from '../ui/Badge';
import { RiskDot } from './RiskDot';
import { StatusBadge } from './StatusBadge';
import { generateFolio, generateShortCode } from '../../lib/accessCodes';
import type { AccessStatus, RiskLevel } from '../../types/access';

interface ProviderFormState {
  fullName: string;
  company: string;
  reason: string;
  destination: string;
  date: string;
  windowStart: string;
  windowEnd: string;
  vehicleDescription: string;
  licensePlate: string;
  toolsOrEquipment: string;
  internalResponsible: string;
  escortRequired: boolean;
  riskLevel: RiskLevel;
  comments: string;
}

const DESTINOS = [
  { value: '', label: 'Selecciona un area' },
  { value: 'Hangar Ejecutivo Demo', label: 'Hangar Ejecutivo Demo' },
  { value: 'FBO Demo Terminal 1', label: 'FBO Demo Terminal 1' },
  { value: 'FBO Demo Terminal 2', label: 'FBO Demo Terminal 2' },
  { value: 'Plataforma Demo', label: 'Plataforma Demo' },
  { value: 'Almacen Demo', label: 'Almacen Demo' },
];

const RIESGOS = [
  { value: 'low', label: 'Riesgo bajo' },
  { value: 'medium', label: 'Riesgo medio' },
  { value: 'high', label: 'Riesgo alto' },
];

const initialState: ProviderFormState = {
  fullName: '',
  company: '',
  reason: '',
  destination: '',
  date: '',
  windowStart: '',
  windowEnd: '',
  vehicleDescription: '',
  licensePlate: '',
  toolsOrEquipment: '',
  internalResponsible: '',
  escortRequired: false,
  riskLevel: 'low',
  comments: '',
};

export const ProviderRequestForm = () => {
  const [form, setForm] = useState<ProviderFormState>(initialState);
  const [status, setStatus] = useState<AccessStatus>('draft');
  const [folio, setFolio] = useState<string>('');
  const [shortCode, setShortCode] = useState<string>('');

  const update = <K extends keyof ProviderFormState>(key: K, value: ProviderFormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSaveDraft = () => {
    if (!folio) setFolio(generateFolio());
    setStatus('draft');
  };

  const handleSubmit = () => {
    setFolio(folio || generateFolio());
    setShortCode(shortCode || generateShortCode('identified_provider'));
    setStatus('submitted');
  };

  return (
    <div className="split-2">
      <div className="stack">
        <Card>
          <CardHeader eyebrow="Identificacion" title="Persona y empresa" />
          <div className="grid-2">
            <Input
              label="Nombre completo"
              name="fullName"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              placeholder="Nombre del proveedor (ficticio)"
            />
            <Input
              label="Empresa"
              name="company"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="MantTec Demo"
            />
            <Input
              label="Motivo de acceso"
              name="reason"
              value={form.reason}
              onChange={(e) => update('reason', e.target.value)}
              placeholder="Mantenimiento, catering, recarga, etc."
            />
            <Input
              label="Responsable interno"
              name="internalResponsible"
              value={form.internalResponsible}
              onChange={(e) => update('internalResponsible', e.target.value)}
              placeholder="Jefe de mantenimiento, despacho, etc."
            />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Destino y ventana" title="Area, fecha y horario" />
          <div className="grid-2">
            <Select
              label="Area destino"
              name="destination"
              value={form.destination}
              onChange={(e) => update('destination', e.target.value)}
              options={DESTINOS}
            />
            <Input
              label="Fecha"
              type="date"
              name="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
            />
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
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Vehiculo y equipo" title="Detalle operativo" />
          <div className="grid-2">
            <Input
              label="Descripcion del vehiculo"
              name="vehicleDescription"
              value={form.vehicleDescription}
              onChange={(e) => update('vehicleDescription', e.target.value)}
              placeholder="Tipo, color, marca"
            />
            <Input
              label="Placa"
              name="licensePlate"
              value={form.licensePlate}
              onChange={(e) => update('licensePlate', e.target.value.toUpperCase())}
              placeholder="DEMO-001"
              className="text-mono"
            />
            <Textarea
              label="Herramientas o equipo"
              name="toolsOrEquipment"
              value={form.toolsOrEquipment}
              onChange={(e) => update('toolsOrEquipment', e.target.value)}
              placeholder="Lista resumida de herramientas / insumos."
            />
            <Select
              label="Clasificacion de riesgo"
              name="riskLevel"
              value={form.riskLevel}
              onChange={(e) => update('riskLevel', e.target.value as RiskLevel)}
              options={RIESGOS}
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
          <CardHeader eyebrow="Notas" title="Comentarios operativos" />
          <Textarea
            name="comments"
            value={form.comments}
            onChange={(e) => update('comments', e.target.value)}
            placeholder="Notas internas para seguridad."
          />
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
              <Badge tone="cyan">Proveedor</Badge>
              <StatusBadge status={status} />
            </span>}
            subtitle="Vista previa de la solicitud"
          />
          <dl className="dl">
            <dt>Folio</dt>
            <dd className="text-mono">{folio || 'Se genera al enviar'}</dd>
            <dt>Codigo</dt>
            <dd>{shortCode ? <span className="code-pill">{shortCode}</span> : <span className="text-subtle">--</span>}</dd>
            <dt>Persona</dt>
            <dd>{form.fullName || '--'}</dd>
            <dt>Empresa</dt>
            <dd>{form.company || '--'}</dd>
            <dt>Motivo</dt>
            <dd>{form.reason || '--'}</dd>
            <dt>Destino</dt>
            <dd>{form.destination || '--'}</dd>
            <dt>Fecha</dt>
            <dd className="text-mono">{form.date || '--'}</dd>
            <dt>Ventana</dt>
            <dd className="text-mono">{form.windowStart || '--'} - {form.windowEnd || '--'}</dd>
            <dt>Vehiculo</dt>
            <dd>{form.vehicleDescription || '--'}</dd>
            <dt>Placa</dt>
            <dd className="text-mono">{form.licensePlate || '--'}</dd>
            <dt>Responsable</dt>
            <dd>{form.internalResponsible || '--'}</dd>
            <dt>Escolta</dt>
            <dd>{form.escortRequired ? 'Requerida' : 'No requerida'}</dd>
            <dt>Riesgo</dt>
            <dd><RiskDot level={form.riskLevel} /></dd>
          </dl>
        </Card>
      </aside>
    </div>
  );
};
