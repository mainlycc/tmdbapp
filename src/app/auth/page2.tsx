'use client';

import { useSupabase } from '@/components/SupabaseProvider';

export default function Home() {
  const { supabase, session } = useSupabase();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123',
    });
    if (error) {
      console.error('Login error:', error);
    } else {
      console.log('Logged in!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-36 pb-12">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Zaloguj się</h1>
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-8">
          <button 
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
          >
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
