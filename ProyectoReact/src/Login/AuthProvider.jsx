import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode}  from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Recuperar usuario desde el token en localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          return null;
        }
        return decoded;
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('token');
        return null;
      }
    }
    return null;
  });

  // Función para iniciar sesión
  const login = (token) => {
    try {
      const decodedUser = jwtDecode(token); // Decodifica el token
      setUser(decodedUser); // Guarda solo los datos del usuario
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Error al decodificar token:', error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


