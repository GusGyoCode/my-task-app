"use client";
import { useAuth } from '@/hooks/useAuth';
import { useTaskStore } from '@/store/useTaskStore';
import { LogOut, User, Menu } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { userEmail, logout, checkAuth } = useAuth();
  const toggleSidebar = useTaskStore((state) => state.toggleSidebar);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <nav className="w-full mx-auto px-4 md:px-10 h-[80px] flex justify-between md:justify-end items-center gap-6">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-white hover:bg-[#29382F] rounded-lg transition-colors cursor-pointer"
      >
        <Menu size={24} />
      </button>

      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="rounded-full border-2 border-transparent hover:border-[#36E27B] transition-colors cursor-pointer"
        >
          <Image src="/Avatar.png" alt="Avatar" width={56} height={56} className="w-[40px] h-[40px] md:w-[56px] md:h-[56px]" />
        </button>

        {isProfileOpen && (
          <div className="absolute top-[64px] right-0 min-w-[200px] bg-[#29382F] p-4 rounded-xl z-50 border border-[#36E27B] shadow-xl flex flex-col gap-3">
            <div className="flex flex-col gap-1 border-b border-[#36E27B]/20 pb-2">
              <span className="text-xs text-[#36E27B] font-medium uppercase tracking-wider">Usuario</span>
              <div className="flex items-center gap-2">
                <User size={14} className="text-slate-300" />
                <span className="text-sm text-white font-medium">{userEmail}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsProfileOpen(false);
                logout();
              }}
              className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full text-left pt-1"
            >
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};