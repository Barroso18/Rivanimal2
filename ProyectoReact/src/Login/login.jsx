import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import "../estilos/estilos.css";
import servicioUsuarios from '../servicios/servicioUsuarios';

import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); //  Usa el contexto de autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();
  const datosLogin = { usuario, contrasena };

  try {
    const response = await servicioUsuarios.login(datosLogin);
    console.log("Login.js: Respuesta del backend:", response.data);

    if (response.data.jwt) {
      console.log("Login.js: Entrando a login() con token:", response.data.jwt);
      login(response.data.jwt); // Aquí debería entrar
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    console.error('Error en el login:', error);
    setError('Error en el login');
  }

  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/imagenes/fondo-huellas.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center gap-4 my-6">
        <img src='/imagenes/logoRivanimal.jpg' className="h-20 object-contain" alt="Logo Rivanimal" />
        <img src='/imagenes/logo-texto.jpg' className="h-20 object-contain" alt="Logo texto" />
      </div>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Usuario:</label>
            <input
              id="usuario"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              id="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


