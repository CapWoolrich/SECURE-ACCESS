// ============================================================================
// Supabase client - modo MVP / Demo
// ----------------------------------------------------------------------------
// Mientras la repo este publica, NO conectamos Supabase real. El cliente se
// construye con placeholders si no hay variables de entorno definidas.
// La app NO debe romperse si faltan las variables.
//
// Usar isSupabaseConfigured() antes de cualquier llamada real para evitar
// pegarle a un endpoint mock.
// ============================================================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-anon-key';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim();

export const isSupabaseConfigured = (): boolean =>
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

let client: SupabaseClient;

try {
  client = createClient(
    supabaseUrl || PLACEHOLDER_URL,
    supabaseAnonKey || PLACEHOLDER_KEY,
    {
      auth: { persistSession: false },
    },
  );
} catch (err) {
  // Si createClient falla por alguna razon, exponemos un stub que no rompe la
  // app. Cualquier intento de uso lanzara error claro en consola.
  // eslint-disable-next-line no-console
  console.warn('[SecureAccess] Supabase client init failed - running in mock mode', err);
  client = {} as SupabaseClient;
}

export const supabase = client;
