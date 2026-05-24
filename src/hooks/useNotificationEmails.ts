import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'secure-access.notification-emails.v1';
export const MAX_RECIPIENTS = 4;

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => EMAIL_RX.test(email.trim());

const safeRead = (): string[] => {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === 'string').slice(0, MAX_RECIPIENTS);
  } catch {
    return [];
  }
};

const safeWrite = (emails: string[]) => {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(emails.slice(0, MAX_RECIPIENTS)));
  } catch {
    // no-op
  }
};

export const useNotificationEmails = () => {
  const [emails, setEmails] = useState<string[]>(() => safeRead());

  useEffect(() => {
    safeWrite(emails);
  }, [emails]);

  const setAt = useCallback((index: number, value: string) => {
    setEmails((prev) => {
      const next = [...prev];
      while (next.length <= index) next.push('');
      next[index] = value;
      return next.slice(0, MAX_RECIPIENTS);
    });
  }, []);

  const remove = useCallback((index: number) => {
    setEmails((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const add = useCallback((value: string) => {
    setEmails((prev) => {
      if (prev.length >= MAX_RECIPIENTS) return prev;
      return [...prev, value];
    });
  }, []);

  const replaceAll = useCallback((next: string[]) => {
    setEmails(next.slice(0, MAX_RECIPIENTS));
  }, []);

  const validEmails = emails.filter((e) => isValidEmail(e));

  return { emails, validEmails, setAt, remove, add, replaceAll };
};
