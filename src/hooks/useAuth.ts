import { create } from 'zustand';

interface AuthState {
  userEmail: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  userEmail: null,
  
  login: (email, password) => {
    // Simulación de validación y generación de JWT [cite: 10]
    const fakeToken = "eyJhGciOiJIUzI1Ni...";
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user_email', email);
    document.cookie = `token=${fakeToken}; path=/`; // Para el middleware
    set({ userEmail: email });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    set({ userEmail: null });
    window.location.href = '/login'; // Redirección física para limpiar estados
  },

  checkAuth: () => {
    const email = localStorage.getItem('user_email');
    if (email) set({ userEmail: email });
  }
}));