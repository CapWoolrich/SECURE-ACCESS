// ============================================================================
// Generador placeholder de folios, codigos cortos y payloads de QR
// ----------------------------------------------------------------------------
// El QR NO debe contener datos sensibles. Solamente folio, codigo y tipo.
// Estos generadores son determinasticos solo por estructura, no por seguridad
// criptografica - se reemplazaran por logica de backend al integrar Supabase.
// ============================================================================

import type { AccessRequestType, AccessQrPayload } from '../types/access';

// Alfabeto sin caracteres ambiguos (0/O, 1/I, etc.)
const SAFE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const randomDigits = (length: number): string =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

const randomFromAlphabet = (length: number): string =>
  Array.from({ length }, () =>
    SAFE_ALPHABET[Math.floor(Math.random() * SAFE_ALPHABET.length)],
  ).join('');

/**
 * Folio operativo de la solicitud.
 * Formato: SA-YYYY-NNNN
 */
export const generateFolio = (year: number = new Date().getFullYear()): string => {
  const sequence = randomDigits(4);
  return `SA-${year}-${sequence}`;
};

/**
 * Codigo corto operativo para usar en caseta cuando no hay QR.
 * Formato VIP-XXXX o PRV-XXXX (4 digitos para legibilidad operativa).
 */
export const generateShortCode = (type: AccessRequestType): string => {
  const prefix = type === 'vip_event' ? 'VIP' : 'PRV';
  return `${prefix}-${randomDigits(4)}`;
};

/**
 * Codigo generico alfanumerico (uso interno - no expuesto al usuario final).
 */
export const generateGenericCode = (length = 6): string => randomFromAlphabet(length);

/**
 * Construye el payload minimo del QR.
 * IMPORTANTE: este payload no debe incluir nombres, placas, telefonos,
 * identificaciones ni informacion sensible. Solo identifica el evento.
 */
export const buildQrPayload = (
  folio: string,
  code: string,
  type: AccessRequestType,
): AccessQrPayload => ({ folio, code, type });

export const serializeQrPayload = (payload: AccessQrPayload): string =>
  JSON.stringify(payload);
