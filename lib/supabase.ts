
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// If keys are missing, this client will fail on requests, but won't crash the app on build/start.
export const supabase = createClient(supabaseUrl, supabaseKey);
