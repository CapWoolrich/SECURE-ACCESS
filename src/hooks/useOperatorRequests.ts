import { useCallback, useEffect, useState } from 'react';
import type { AccessRequest } from '../types/access';

const STORAGE_KEY = 'secure-access.operator-requests.v1';

const readAll = (): AccessRequest[] => {
  try {
    const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as AccessRequest[];
  } catch {
    return [];
  }
};

const writeAll = (rows: AccessRequest[]) => {
  if (typeof window === 'undefined') return;
  try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rows)); } catch { /* no-op */ }
};

export const useOperatorRequests = () => {
  const [requests, setRequests] = useState<AccessRequest[]>(() => readAll());

  useEffect(() => { writeAll(requests); }, [requests]);

  const append = useCallback((req: AccessRequest) => {
    setRequests((prev) => {
      // Evitar duplicados por id
      if (prev.some((r) => r.id === req.id)) return prev;
      return [req, ...prev];
    });
  }, []);

  const findByFolio = useCallback(
    (folio: string) => requests.find((r) => r.folio === folio) ?? null,
    [requests],
  );

  return { requests, append, findByFolio };
};
