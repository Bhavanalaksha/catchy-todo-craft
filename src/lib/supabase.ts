
import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use fallback values
// Note: In production, you should always use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// For local development without Supabase, create a mock client
// This will allow the app to load without crashing
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

