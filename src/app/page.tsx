import { redirect } from 'next/navigation';

export default function Home() {
  // Como es el punto de entrada, redirigimos directamente 
  // El middleware se encargará de decidir si va a /login o /dashboard
  redirect('/dashboard');
}