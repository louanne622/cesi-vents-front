import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', // Ajustez le port selon votre configuration
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Intercepteur pour ajouter le token d'authentification si nécessaire
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  // Intercepteur pour gérer les erreurs de réponse
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Gérer les erreurs globalement (ex: redirection si 401 Unauthorized)
      if (error.response && error.response.status === 401) {
        // Rediriger vers la page de connexion ou rafraîchir le token
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export default api;

