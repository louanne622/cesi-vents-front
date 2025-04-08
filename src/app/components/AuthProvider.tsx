'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { getAccessToken } from '@/utils/cookieService';
import { getProfile } from '@/redux/features/authSlice';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      // Initialize token in Redux state
      dispatch({ type: 'auth/login/fulfilled', payload: { token } });
      
      // Get user profile
      dispatch(getProfile());
    }
  }, [dispatch]);

  return <>{children}</>;
}
