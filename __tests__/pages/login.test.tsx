import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '@/app/(auth)/login/page';
import { useRouter } from 'next/navigation';

// Mock de Next.js Router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('debe renderizar los campos del formulario', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText(/nombre@correo.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  test('debe permitir escribir en los inputs y enviar el formulario', () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(/nombre@correo.com/i);
    const passInput = screen.getByPlaceholderText(/••••••••/i);
    const submitBtn = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passInput, { target: { value: 'password' } });
    fireEvent.click(submitBtn);

    // Verificamos que se intentó navegar al dashboard tras el login
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});