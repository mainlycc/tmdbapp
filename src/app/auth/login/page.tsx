import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-36 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <LoginForm />
      </div>
    </div>
  );
}
