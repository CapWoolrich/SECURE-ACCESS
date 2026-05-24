import { useEffect, useState } from 'react';
import { serializeQrPayload } from '../../lib/accessCodes';
import { generarQrDataUrl } from '../../lib/qr';
import type { AccessQrPayload } from '../../types/access';

interface QrPreviewProps {
  payload: AccessQrPayload;
  size?: number;
}

export const QrPreview = ({ payload, size = 220 }: QrPreviewProps) => {
  const [src, setSrc] = useState<string>('');
  useEffect(() => {
    let alive = true;
    generarQrDataUrl(serializeQrPayload(payload)).then((url) => {
      if (alive) setSrc(url);
    });
    return () => { alive = false; };
  }, [payload]);

  return (
    <div className="qr-frame" style={{ width: size + 24, padding: 12 }}>
      {src ? (
        <img src={src} alt={`QR ${payload.folio}`} width={size} height={size} style={{ display: 'block' }} />
      ) : (
        <div className="qr-placeholder" style={{ width: size, height: size }}>Generando QR...</div>
      )}
      <div className="text-mono qr-frame__caption">{payload.code} · {payload.folio}</div>
    </div>
  );
};
