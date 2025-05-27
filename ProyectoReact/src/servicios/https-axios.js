import axios from "axios";

const https = axios.create({
  baseURL: "https://backend.rivanimal-gestion.es",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token Authorization en cada petición
https.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor para depurar errores
https.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error("🚨 Error de red:", error);
    } else {
      console.error("⚠️ Otro error:", error);
    }
    return Promise.reject(error);
  }
);

export default https;