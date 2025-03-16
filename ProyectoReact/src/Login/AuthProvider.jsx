import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const [user, setUser] = useState(()=>{
    //Recuperar usuario desde localStorage si existe
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null;
  });
  /*const login = (userData) => setUser(userData);
  const logout = () => setUser(null);*/
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user',JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
