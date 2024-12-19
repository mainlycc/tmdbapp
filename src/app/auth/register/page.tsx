import { RegisterForm } from "../../../components/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950 pt-36 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <RegisterForm />
      </div>
    </div>
  );
}