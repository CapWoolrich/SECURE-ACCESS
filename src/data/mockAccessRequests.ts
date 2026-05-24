// ============================================================================
// Datos de demo - vacios por defecto
// ----------------------------------------------------------------------------
// El MVP comienza sin solicitudes ni eventos para que el flujo end-to-end
// pueda probarse desde cero: el operador crea solicitudes en el portal,
// seguridad las aprueba en /aprobaciones, caseta las valida en /puerta y
// todo queda registrado en /bitacora. La fuente de verdad esta en
// src/lib/accessStore.ts (persistida en localStorage).
// ============================================================================

import type { AccessRequest, AuditEvent, ProviderAccessRequest, VipEventAccessRequest } from '../types/access';

export const MOCK_OPERATOR = {
  name: 'Operador Demo',
  role: 'operator_admin' as const,
  company: 'Empresa Demo Aviation',
};

export const MOCK_VIP_REQUESTS: VipEventAccessRequest[] = [];
export const MOCK_PROVIDER_REQUESTS: ProviderAccessRequest[] = [];
export const MOCK_REQUESTS: AccessRequest[] = [];
export const MOCK_AUDIT_EVENTS: AuditEvent[] = [];
