"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/features/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import Navbar from '../app/components/Navbar';
import { getRefreshToken } from '../utils/cookieService';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '../redux/hooks';
import Toast from '@/app/components/Toast';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { token, error: authError } = useAppSelector((state) => state.auth);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const error = useSelector((state: RootState) => state.auth.error );

  // Vérification de l'authentification au chargement
  useEffect(() => {
    console.log('ClientLayout: Vérification de l\'authentification...');
    console.log('ClientLayout: Token de rafraîchissement:', getRefreshToken());
    
    // Vérifier l'authentification une seule fois au chargement
    dispatch(checkAuth());
  }, [dispatch]);

  // Gestion des redirections
  useEffect(() => {
    if (pathname) {
      // Liste des routes nécessitant une authentification
      const protectedRoutes = ['/profil', '/settings'];
      
      // Si l'utilisateur n'est pas authentifié et qu'il essaie d'accéder à une page protégée
      if (!token && !isLoading && !error && protectedRoutes.includes(pathname)) {
        router.push('/login');
      }
      
      // Si l'utilisateur est authentifié et qu'il est sur la page de connexion
      if (!isLoading && token && pathname === '/login') {
        router.push('/');
      }
    }
  }, [pathname, isLoading, token, error, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="md:pl-64 pb-16 md:pb-8" style={{ paddingBottom: '0px' }}>
          <div>
            {children}
          <Toast message={error} type="error" duration={5000} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="md:pl-64 pb-16 md:pb-8" style={{ paddingBottom: '0px' }}>
        <div>{children}</div>
      </main>
    </>
  );
}
