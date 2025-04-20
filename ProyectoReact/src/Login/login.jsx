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
    await servicioUsuarios.login(datosLogin)
      .then((response) => {
        if (response.data.jwt) {
          login(response.data.jwt); // Guardar token y cargar usuario
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error en el login:', error);
        setError('Error en el login');
      });

  };
  return (
    <div>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;


