// ============================================================================
// Secure Access - Store compartido de solicitudes y eventos de bitacora
// ----------------------------------------------------------------------------
// Fuente unica de verdad entre el portal del solicitante y el sistema interno
// (dashboard, aprobaciones, caseta, bitacora). Persiste en localStorage para
// que la experiencia funcione end-to-end sin backend.
//
// Cuando se conecte Supabase, este modulo es el reemplazable: la UI ya consume
// hooks de aqui.
// ============================================================================

import { useSyncExternalStore } from 'react';
import type {
  AccessRequest,
  AccessStatus,
  AuditEvent,
  AuditEventType,
  UserRole,
} from '../types/access';

const STORAGE_KEY = 'secure-access.store.v1';

interface StoreState {
  requests: AccessRequest[];
  events: AuditEvent[];
}

const EMPTY: StoreState = { requests: [], events: [] };

const readFromStorage = (): StoreState => {
  try {
    if (typeof window === 'undefined') return EMPTY;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as StoreState;
    return {
      requests: Array.isArray(parsed.requests) ? parsed.requests : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
    };
  } catch {
    return EMPTY;
  }
};

const writeToStorage = (next: StoreState) => {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // no-op
  }
};

let state: StoreState = readFromStorage();
const listeners = new Set<() => void>();

const emit = () => {
  writeToStorage(state);
  listeners.forEach((l) => l());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => state;

// Sincroniza entre pestanas del mismo origen
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      state = readFromStorage();
      listeners.forEach((l) => l());
    }
  });
}

const nextId = (kind: string) =>
  `${kind}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export const appendRequest = (request: AccessRequest): void => {
  if (state.requests.some((r) => r.id === request.id || r.folio === request.folio)) return;
  const createdEvent: AuditEvent = {
    id: nextId('aud'),
    timestamp: request.createdAt,
    actorRole: 'operator_admin',
    actorLabel: request.createdBy,
    eventType: 'request_created',
    folio: request.folio,
    requestType: request.type,
    status: 'draft',
  };
  const submittedEvent: AuditEvent = {
    id: nextId('aud'),
    timestamp: request.createdAt,
    actorRole: 'operator_admin',
    actorLabel: request.createdBy,
    eventType: 'request_submitted',
    folio: request.folio,
    requestType: request.type,
    status: 'submitted',
  };
  state = {
    requests: [request, ...state.requests],
    events: [...state.events, createdEvent, submittedEvent],
  };
  emit();
};

export const updateRequestStatus = (
  folio: string,
  nextStatus: AccessStatus,
  eventType: AuditEventType,
  actorRole: UserRole,
  actorLabel: string,
  comment?: string,
): void => {
  let target: AccessRequest | undefined;
  const updated = state.requests.map((r) => {
    if (r.folio !== folio) return r;
    target = { ...r, status: nextStatus, comments: comment ?? r.comments };
    return target;
  });
  if (!target) return;
  const evt: AuditEvent = {
    id: nextId('aud'),
    timestamp: new Date().toISOString(),
    actorRole,
    actorLabel,
    eventType,
    folio,
    requestType: target.type,
    status: nextStatus,
    comment,
  };
  state = { requests: updated, events: [...state.events, evt] };
  emit();
};

export const logGateEvent = (
  folio: string,
  eventType: AuditEventType,
  actorLabel: string,
  options: { nextStatus?: AccessStatus; comment?: string } = {},
): void => {
  const target = state.requests.find((r) => r.folio === folio);
  if (!target) return;
  let updatedRequests = state.requests;
  let finalStatus: AccessStatus = options.nextStatus ?? target.status;
  if (options.nextStatus && options.nextStatus !== target.status) {
    updatedRequests = state.requests.map((r) =>
      r.folio === folio ? { ...r, status: options.nextStatus as AccessStatus } : r,
    );
    finalStatus = options.nextStatus;
  }
  const evt: AuditEvent = {
    id: nextId('aud'),
    timestamp: new Date().toISOString(),
    actorRole: 'gate_guard',
    actorLabel,
    eventType,
    folio,
    requestType: target.type,
    status: finalStatus,
    comment: options.comment,
  };
  state = { requests: updatedRequests, events: [...state.events, evt] };
  emit();
};

export const resetStore = (): void => {
  state = EMPTY;
  emit();
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export const useAccessStore = (): StoreState =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

export const useRequests = (): AccessRequest[] => useAccessStore().requests;
export const useEvents = (): AuditEvent[] => useAccessStore().events;
