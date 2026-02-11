"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111714] p-4">
      <div className="w-full max-w-[440px] p-8 md:p-12 bg-white rounded-[32px] shadow-2xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-12 h-12 bg-[#36E27B] rounded-full flex items-center justify-center mb-6">
            <span className="text-[#393939] font-bold text-xl">T</span>
          </div>
          <h1 className="text-[32px] font-bold text-[#2D2D2D] leading-tight mb-2">
            Bienvenido a Task pro
          </h1>
          <p className="text-[#666666] text-base">
            Gestiona tus tareas con estilo
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#2D2D2D] ml-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              className="w-full bg-[#F8F9FA] border-none p-4 rounded-2xl text-[#2D2D2D] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#36E27B]/20 transition-all text-sm"
              placeholder="nombre@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#2D2D2D] ml-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full bg-[#F8F9FA] border-none p-4 rounded-2xl text-[#2D2D2D] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#36E27B]/20 transition-all text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-[56px]! text-base font-bold rounded-2xl! shadow-lg shadow-[#36E27B]/5 mt-2"
            >
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
