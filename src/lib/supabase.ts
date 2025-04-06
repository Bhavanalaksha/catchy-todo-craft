
import { createClient } from '@supabase/supabase-js';

// Use the correct Supabase URL and key that are defined in the integrations folder
const supabaseUrl = "https://kxibdwzpvjbxtkhqecgj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4aWJkd3pwdmpieHRraHFlY2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjYzODAsImV4cCI6MjA1OTUwMjM4MH0.QZPr0dLUVoOEJ9n_MDFwVh2mDnR96QwlHtiVJfcNpEI";

// For consistent usage across the application, import the supabase client from here
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
