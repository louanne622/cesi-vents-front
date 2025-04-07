import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, clearTokens } from './cookieService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const refreshToken = getRefreshToken();

    if (token) {
      config.headers['x-auth-token'] = token;
    }
    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer le rafraîchissement automatique du token
axiosInstance.interceptors.response.use(
  (response) => {
    // Si un nouveau token est présent dans les headers, on le sauvegarde
    const newToken = response.headers['x-new-token'];
    if (newToken) {
      setAccessToken(newToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axiosInstance.post('/auth/refresh-token', {}, {
          headers: {
            'x-refresh-token': refreshToken,
          },
          withCredentials: true,
        });

        const { accessToken } = response.data;
        setAccessToken(accessToken);

        // On met à jour le token dans la requête originale
        originalRequest.headers['x-auth-token'] = accessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Clear tokens and logout
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
