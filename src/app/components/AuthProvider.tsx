'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Initialize token in Redux state
      dispatch({ type: 'auth/login/fulfilled', payload: { token } });
      
      // Get user profile
      dispatch({ type: 'auth/getProfile' });
    }
  }, [dispatch]);

  return <>{children}</>;
}
