import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'secure-access.operator-session.v1';

export interface OperatorSession {
  email: string;
  company: string;
  signedInAt: string;
}

const readSession = (): OperatorSession | null => {
  try {
    const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OperatorSession;
    if (!parsed || typeof parsed.email !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeSession = (session: OperatorSession | null) => {
  if (typeof window === 'undefined') return;
  if (session) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  else window.sessionStorage.removeItem(STORAGE_KEY);
};

export const useOperatorSession = () => {
  const [session, setSession] = useState<OperatorSession | null>(() => readSession());

  useEffect(() => {
    writeSession(session);
  }, [session]);

  const signIn = useCallback((email: string, company: string) => {
    setSession({ email, company, signedInAt: new Date().toISOString() });
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
  }, []);

  return { session, signIn, signOut, isAuthenticated: Boolean(session) };
};
