'use server';

import { supabase } from '@/lib/supabase';

export async function subscribeEmail(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: 'Invalid email address' };
  }

  try {
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        return { error: 'Email already registered' };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Supabase Connection Error:', error);
    console.log('Attempted Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/^(https?:\/\/)([^.]+)(.+)$/, '$1***$3') : 'Undefined/Placeholder');
    return { error: 'Failed to subscribe. Connection error.' };
  }
}
