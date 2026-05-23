import QRCode from 'qrcode';

export const generarQrDataUrl = async (payload: string): Promise<string> => {
  return QRCode.toDataURL(payload, {
    margin: 1,
    width: 320,
    color: {
      dark: '#0F172A',
      light: '#FFFFFF',
    },
  });
};
