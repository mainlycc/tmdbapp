'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSupabase } from "@/components/SupabaseProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from 'next/image';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Błąd logowania: " + error.message);
      } else {
        toast.success("Zalogowano pomyślnie!");
        router.push('/profile/settings'); // Przekierowanie po zalogowaniu
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      toast.error("Błąd logowania przez Google");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden bg-zinc-900/50 backdrop-blur-sm text-white">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8" aria-label="Login Form">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Witaj ponownie</h1>
                <p className="text-zinc-400">
                  Zaloguj się do swojego konta
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="twoj@email.com"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Hasło</Label>
                  <a
                    href="#"
                    className="text-sm text-zinc-400 hover:text-white"
                  >
                    Zapomniałeś?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Twoje hasło"
                  required
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Logowanie..." : "Zaloguj się"}
              </Button>
              
              <div className="relative text-center text-sm my-4">
                <span className="relative z-10 bg-zinc-900 px-2 text-zinc-400">
                  Lub kontynuuj przez
                </span>
                <hr className="absolute inset-0 top-1/2 border-t border-zinc-700" />
              </div>
              
              <Button 
                type="button"
                variant="outline" 
                onClick={handleGoogleLogin}
                className="w-full border-zinc-700 text-white hover:bg-zinc-800"
              >
                Google
              </Button>
              
              <div className="text-center text-sm text-zinc-400">
                Nie masz konta?{" "}
                <a href="/auth/register" className="text-white hover:underline">
                  Zarejestruj się
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
