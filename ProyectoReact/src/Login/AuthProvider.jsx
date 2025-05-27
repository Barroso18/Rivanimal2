import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("🔑 Usuario recuperado del token:", decoded);
        return decoded;
      } catch (error) {
        console.error('❌ Token inválido:', error);
        return null;
      }
    }
    return null;
  });

  const login = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      console.log("✅ Login exitoso, decoded user:", decodedUser);
      setUser(decodedUser);
      localStorage.setItem('token', token);
      navigate('/', { replace: true }); // <-- Asegura navegación
    } catch (error) {
      console.error('❌ Error al decodificar token:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


