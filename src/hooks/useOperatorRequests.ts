import { useCallback } from 'react';
import type { AccessRequest } from '../types/access';
import { appendRequest, useRequests } from '../lib/accessStore';

export const useOperatorRequests = () => {
  const requests = useRequests();
  const append = useCallback((req: AccessRequest) => appendRequest(req), []);
  const findByFolio = useCallback(
    (folio: string) => requests.find((r) => r.folio === folio) ?? null,
    [requests],
  );
  return { requests, append, findByFolio };
};
