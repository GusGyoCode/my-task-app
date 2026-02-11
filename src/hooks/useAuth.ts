import { create } from 'zustand';

/**
 * Hook de estado global para la gestión de autenticación.
 * Utiliza Zustand para mantener el estado del usuario y sincroniza
 * las credenciales con LocalStorage y Cookies para persistencia y Middleware.
 * * @namespace useAuth
 */
interface AuthState {
  userEmail: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  userEmail: null,
  
  /**
   * Realiza el inicio de sesión simulado.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   */
  login: (email, password) => {
    const fakeToken = "eyJhGciOiJIUzI1Ni...";
    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user_email', email);
    document.cookie = `token=${fakeToken}; path=/`;
    set({ userEmail: email });
  },

  /**
   * Limpia los datos de sesión y fuerza una redirección al login.
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    set({ userEmail: null });
    window.location.href = '/login';
  },

  /**
   * Verifica si existe una sesión persistente al inicializar la app.
   */
  checkAuth: () => {
    const email = localStorage.getItem('user_email');
    if (email) set({ userEmail: email });
  }
}));