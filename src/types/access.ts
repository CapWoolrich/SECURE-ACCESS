// ============================================================================
// Secure Access - Tipos del dominio
// ----------------------------------------------------------------------------
// Tipos compartidos para solicitudes de acceso, estados, roles y eventos
// de auditoria. No contienen datos reales: solamente estructuras.
// ============================================================================

export type AccessRequestType = 'vip_event' | 'identified_provider';

export type AccessStatus =
  | 'draft'
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'needs_correction'
  | 'active'
  | 'used'
  | 'expired'
  | 'cancelled'
  | 'revoked'
  | 'incident';

export type UserRole =
  | 'super_admin'
  | 'security_admin'
  | 'security_operator'
  | 'gate_guard'
  | 'operator_admin'
  | 'operator_user'
  | 'auditor';

export type RiskLevel = 'low' | 'medium' | 'high';

// ---------------------------------------------------------------------------
// Datos comunes a toda solicitud
// ---------------------------------------------------------------------------
export interface AccessRequestBase {
  id: string;
  folio: string;
  shortCode: string;
  type: AccessRequestType;
  status: AccessStatus;
  createdAt: string;
  createdBy: string;
  destination: string;
  date: string;
  windowStart: string;
  windowEnd: string;
  internalResponsible: string;
  escortRequired: boolean;
  comments?: string;
  riskLevel?: RiskLevel;
}

// ---------------------------------------------------------------------------
// VIP por evento
// Regla: NO se capturan nombres, placas, telefonos ni identificaciones.
// Se autoriza el evento, la ventana, el destino y el cupo maximo.
// ---------------------------------------------------------------------------
export interface VipEventAccessRequest extends AccessRequestBase {
  type: 'vip_event';
  requestingCompany: string;
  aircraftReference: string;
  maxPeople: number;
  maxVehicles: number;
}

// ---------------------------------------------------------------------------
// Proveedor identificado
// Regla: requiere identificacion completa de la persona, vehiculo y motivo.
// ---------------------------------------------------------------------------
export interface ProviderAccessRequest extends AccessRequestBase {
  type: 'identified_provider';
  fullName: string;
  company: string;
  reason: string;
  vehicleDescription: string;
  licensePlate: string;
  toolsOrEquipment: string;
}

export type AccessRequest = VipEventAccessRequest | ProviderAccessRequest;

// ---------------------------------------------------------------------------
// Eventos de bitacora / auditoria
// ---------------------------------------------------------------------------
export type AuditEventType =
  | 'request_created'
  | 'request_submitted'
  | 'request_approved'
  | 'request_rejected'
  | 'correction_requested'
  | 'code_generated'
  | 'access_validated'
  | 'entry_logged'
  | 'exit_logged'
  | 'incident_flagged'
  | 'access_revoked';

export interface AuditEvent {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorLabel: string;
  eventType: AuditEventType;
  folio: string;
  requestType: AccessRequestType;
  comment?: string;
  status: AccessStatus;
}

// ---------------------------------------------------------------------------
// Payload del QR. NO debe contener datos sensibles.
// ---------------------------------------------------------------------------
export interface AccessQrPayload {
  folio: string;
  code: string;
  type: AccessRequestType;
}
