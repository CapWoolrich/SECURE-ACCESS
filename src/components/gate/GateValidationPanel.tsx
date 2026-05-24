import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatusBadge } from '../access/StatusBadge';
import { RequestTypeChip } from '../access/RequestTypeChip';
import { useRequests, logGateEvent } from '../../lib/accessStore';
import type { AccessRequest } from '../../types/access';

type LookupResult =
  | { kind: 'idle' }
  | { kind: 'found'; request: AccessRequest }
  | { kind: 'denied'; reason: string };

interface UsageState {
  entries: number;
  exits: number;
  incident: boolean;
}

const GUARD = 'Caseta Demo';

export const GateValidationPanel = () => {
  const requests = useRequests();
  const [code, setCode] = useState('');
  const [result, setResult] = useState<LookupResult>({ kind: 'idle' });
  const [usage, setUsage] = useState<Record<string, UsageState>>({});

  const activeList = useMemo(
    () => requests.filter((r) => r.status === 'active' || r.status === 'approved'),
    [requests],
  );

  const handleValidate = () => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setResult({ kind: 'denied', reason: 'Ingresa un codigo corto o escanea un QR.' });
      return;
    }
    const match = requests.find((r) => r.shortCode.toUpperCase() === clean);
    if (!match) {
      setResult({ kind: 'denied', reason: 'Codigo no encontrado en accesos vigentes.' });
      return;
    }
    if (!['approved', 'active'].includes(match.status)) {
      setResult({ kind: 'denied', reason: `Acceso no valido: estado ${match.status}.` });
      return;
    }
    if (match.status === 'approved') {
      logGateEvent(match.folio, 'access_validated', GUARD, { nextStatus: 'active' });
    } else {
      logGateEvent(match.folio, 'access_validated', GUARD);
    }
    setResult({ kind: 'found', request: { ...match, status: 'active' } });
  };

  const trackUsage = (req: AccessRequest, key: keyof UsageState) => {
    setUsage((prev) => {
      const current: UsageState = prev[req.id] ?? { entries: 0, exits: 0, incident: false };
      if (key === 'incident') return { ...prev, [req.id]: { ...current, incident: true } };
      return { ...prev, [req.id]: { ...current, [key]: current[key] + 1 } };
    });
    if (key === 'entries') {
      logGateEvent(req.folio, 'entry_logged', GUARD);
    } else if (key === 'exits') {
      logGateEvent(req.folio, 'exit_logged', GUARD);
    } else {
      logGateEvent(req.folio, 'incident_flagged', GUARD, {
        nextStatus: 'incident',
        comment: 'Incidente marcado desde caseta',
      });
    }
  };

  const renderResult = () => {
    if (result.kind === 'idle') {
      return (
        <Card>
          <CardHeader eyebrow="Validacion" title="Sin lectura activa" subtitle="Ingresa el codigo o escanea el QR del solicitante." />
          <div className="empty-state">
            Ningun acceso validado todavia.
            {requests.length === 0 && (
              <div style={{ marginTop: 12 }}>
                No hay solicitudes cargadas.{' '}
                <Link to="/portal/login">Genera una en el portal del solicitante</Link> y aprobala
                en <Link to="/aprobaciones">/aprobaciones</Link> antes de validarla aqui.
              </div>
            )}
          </div>
        </Card>
      );
    }
    if (result.kind === 'denied') {
      return (
        <div className="gate-result gate-result--deny">
          <div className="gate-result__headline">
            <span className="gate-result__indicator" />
            Acceso DENEGADO
          </div>
          <p className="text-muted">{result.reason}</p>
        </div>
      );
    }
    const r = result.request;
    const u = usage[r.id] ?? { entries: 0, exits: 0, incident: false };
    return (
      <div className="gate-result gate-result--ok stack">
        <div className="gate-result__headline">
          <span className="gate-result__indicator" />
          Acceso AUTORIZADO
        </div>
        <div className="row" style={{ gap: 8 }}>
          <span className="code-pill">{r.shortCode}</span>
          <RequestTypeChip type={r.type} />
          <StatusBadge status={r.status} />
          {r.escortRequired && <Badge tone="warning">Escolta requerida</Badge>}
          {u.incident && <Badge tone="danger">Incidente marcado</Badge>}
        </div>
        <dl className="dl">
          <dt>Folio</dt><dd className="text-mono">{r.folio}</dd>
          <dt>Destino</dt><dd>{r.destination}</dd>
          <dt>Ventana</dt><dd className="text-mono">{r.date} · {r.windowStart} - {r.windowEnd}</dd>
          {r.type === 'vip_event' && <>
            <dt>Cupo autorizado</dt><dd>{r.maxPeople} personas / {r.maxVehicles} vehiculos</dd>
            <dt>Cupo usado</dt><dd>{u.entries} entradas / {u.exits} salidas</dd>
          </>}
          {r.type === 'identified_provider' && <>
            <dt>Empresa</dt><dd>{r.company}</dd>
            <dt>Motivo</dt><dd>{r.reason}</dd>
          </>}
          <dt>Responsable</dt><dd>{r.internalResponsible}</dd>
        </dl>
        <div className="row" style={{ gap: 10 }}>
          <Button size="xl" variant="success" onClick={() => trackUsage(r, 'entries')}>Registrar entrada</Button>
          <Button size="xl" variant="secondary" onClick={() => trackUsage(r, 'exits')}>Registrar salida</Button>
          <Button size="xl" variant="danger" onClick={() => trackUsage(r, 'incident')}>Reportar incidente</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="gate-shell">
      <div className="stack">
        <Card>
          <CardHeader eyebrow="Validacion en caseta" title="Codigo corto o QR" subtitle="Acepta codigos VIP-XXXX y PRV-XXXX." />
          <div className="stack-sm">
            <input
              className="gate-input"
              placeholder="VIP-0000"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
              autoFocus
            />
            <div className="row">
              <Button size="xl" block onClick={handleValidate}>Validar acceso</Button>
            </div>
            <div className="gate-qr-placeholder">
              <div className="gate-qr-placeholder__icon">[ QR ]</div>
              Escaner QR pendiente de integracion. En esta vista se usa codigo corto manual.
            </div>
          </div>
        </Card>

        {renderResult()}
      </div>

      <Card>
        <CardHeader eyebrow="Accesos vigentes" title="Lista operativa de caseta" subtitle="Aprobados y activos" />
        {activeList.length === 0 ? (
          <div className="empty-state">Sin accesos vigentes.</div>
        ) : (
          <div className="stack-sm">
            {activeList.map((r) => (
              <div key={r.id} className="row-between" style={{ padding: '10px 0', borderBottom: '1px dashed var(--color-border)' }}>
                <div className="stack-xs">
                  <strong className="text-mono">{r.shortCode}</strong>
                  <span className="text-subtle" style={{ fontSize: '0.78rem' }}>{r.folio} · {r.destination}</span>
                </div>
                <div className="stack-xs" style={{ alignItems: 'flex-end' }}>
                  <span className="text-mono" style={{ fontSize: '0.78rem' }}>{r.windowStart} - {r.windowEnd}</span>
                  <StatusBadge status={r.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
