import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  SUPABASE_PROJECT_URL,
  SUPABASE_PROJECT_ANON_KEY,
  {
    fetch: fetch.bind(globalThis),
  },
);
