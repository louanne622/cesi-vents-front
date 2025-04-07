import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'cesi_vents_access_token';
const REFRESH_TOKEN_KEY = 'cesi_vents_refresh_token';

export const setAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: 15/60/24, // 15 minutes
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain: process.env.COOKIE_DOMAIN || 'localhost'
  });
};

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY, {
    domain: process.env.COOKIE_DOMAIN || 'localhost'
  });
};

export const setRefreshToken = (token: string) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    domain: process.env.COOKIE_DOMAIN || 'localhost'
  });
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN_KEY, {
    domain: process.env.COOKIE_DOMAIN || 'localhost'
  });
};

export const clearTokens = () => {
  removeAccessToken();
  removeRefreshToken();
};
