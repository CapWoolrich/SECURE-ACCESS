import { useMemo, useState } from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { StatusBadge } from '../components/access/StatusBadge';
import { RequestTypeChip } from '../components/access/RequestTypeChip';
import { useEvents } from '../lib/accessStore';
import type { AuditEventType } from '../types/access';

type EventFilter = 'all' | AuditEventType;

const EVENT_LABEL: Record<AuditEventType, string> = {
  request_created: 'Solicitud creada',
  request_submitted: 'Solicitud enviada',
  request_approved: 'Solicitud aprobada',
  request_rejected: 'Solicitud rechazada',
  correction_requested: 'Correccion solicitada',
  code_generated: 'Codigo generado',
  access_validated: 'Acceso validado',
  entry_logged: 'Entrada registrada',
  exit_logged: 'Salida registrada',
  incident_flagged: 'Incidente marcado',
  access_revoked: 'Acceso revocado',
};

const EVENT_TONE: Record<AuditEventType, 'success' | 'warning' | 'danger' | 'default'> = {
  request_created: 'default',
  request_submitted: 'default',
  request_approved: 'success',
  request_rejected: 'danger',
  correction_requested: 'warning',
  code_generated: 'default',
  access_validated: 'success',
  entry_logged: 'success',
  exit_logged: 'default',
  incident_flagged: 'danger',
  access_revoked: 'danger',
};

const FILTERS: Array<{ value: EventFilter; label: string }> = [
  { value: 'all', label: 'Todos los eventos' },
  { value: 'request_created', label: 'Creadas' },
  { value: 'request_submitted', label: 'Enviadas' },
  { value: 'request_approved', label: 'Aprobadas' },
  { value: 'request_rejected', label: 'Rechazadas' },
  { value: 'correction_requested', label: 'Correcciones' },
  { value: 'access_validated', label: 'Validaciones' },
  { value: 'entry_logged', label: 'Entradas' },
  { value: 'exit_logged', label: 'Salidas' },
  { value: 'incident_flagged', label: 'Incidentes' },
  { value: 'access_revoked', label: 'Revocaciones' },
];

const formatDateTime = (iso: string) => iso.replace('T', ' · ').slice(0, 16);

export const AuditLogPage = () => {
  const allEvents = useEvents();
  const [filter, setFilter] = useState<EventFilter>('all');
  const [search, setSearch] = useState('');

  const events = useMemo(() => {
    return allEvents
      .filter((e) => filter === 'all' || e.eventType === filter)
      .filter((e) => {
        if (!search.trim()) return true;
        const q = search.trim().toLowerCase();
        return (
          e.folio.toLowerCase().includes(q) ||
          (e.comment ?? '').toLowerCase().includes(q) ||
          e.actorLabel.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [filter, search, allEvents]);

  return (
    <div className="stack">
      <div className="page-header">
        <div>
          <div className="page-header__eyebrow">Auditoria</div>
          <h1 className="page-header__title">Bitacora operativa</h1>
          <p className="page-header__sub">
            Registro cronologico de cada accion: solicitud, aprobacion, validacion, entrada, salida e
            incidente. Trazabilidad por folio, usuario y rol.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader eyebrow="Filtros" title="Eventos registrados" subtitle="Vista cronologica" />
        <div className="stack-sm">
          <div className="row">
            {FILTERS.map((f) => (
              <button key={f.value} type="button"
                className={`filter-chip ${filter === f.value ? 'is-active' : ''}`}
                onClick={() => setFilter(f.value)}>{f.label}</button>
            ))}
          </div>
          <Input placeholder="Buscar por folio, usuario o comentario..." value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div style={{ marginTop: 20 }}>
          {allEvents.length === 0 ? (
            <div className="empty-state">
              Sin eventos registrados. Crea una solicitud para que aparezca el primer evento.
            </div>
          ) : events.length === 0 ? (
            <div className="empty-state">Sin eventos para los filtros seleccionados.</div>
          ) : (
            <div className="timeline">
              {events.map((e) => {
                const tone = EVENT_TONE[e.eventType];
                const bulletClass =
                  tone === 'success' ? 'timeline__bullet--success' :
                  tone === 'warning' ? 'timeline__bullet--warning' :
                  tone === 'danger' ? 'timeline__bullet--danger' : '';
                return (
                  <div key={e.id} className="timeline__item">
                    <div className="timeline__time">{formatDateTime(e.timestamp)}</div>
                    <div className={`timeline__bullet ${bulletClass}`} />
                    <div className="timeline__content">
                      <div className="row" style={{ gap: 8 }}>
                        <span className="timeline__headline">{EVENT_LABEL[e.eventType]}</span>
                        <RequestTypeChip type={e.requestType} />
                        <StatusBadge status={e.status} />
                      </div>
                      <div className="timeline__meta">
                        <span className="text-mono">{e.folio}</span> · {e.actorLabel} ({e.actorRole})
                      </div>
                      {e.comment && <div className="timeline__comment">{e.comment}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
