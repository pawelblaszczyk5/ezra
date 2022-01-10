import { createClient } from '@supabase/supabase-js';

declare const SUPABASE_PROJECT_URL: string;

declare const SUPABASE_PROJECT_ANON_KEY: string;

export const supabaseClient = createClient(
  SUPABASE_PROJECT_URL,
  SUPABASE_PROJECT_ANON_KEY,
  {
    fetch: fetch.bind(globalThis),
  },
);
