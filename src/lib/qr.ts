// ============================================================================
// QR generator wrapper
// ----------------------------------------------------------------------------
// Genera un Data URL listo para <img src> a partir de un payload string.
// El payload debe construirse via buildQrPayload() en accessCodes.ts para
// garantizar que no se incluya informacion sensible.
// ============================================================================

import QRCode from 'qrcode';

export const generarQrDataUrl = async (payload: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(payload, {
      margin: 1,
      width: 320,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[SecureAccess] QR generation failed', err);
    return '';
  }
};
