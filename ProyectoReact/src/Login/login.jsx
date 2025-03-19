import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); //  Usa el contexto de autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosLogin = { usuario, contrasena };

    try {
      const response = await axios.post('http://localhost/Rivanimal2/FuncionesPHP/login.php', datosLogin, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.jwt) {
        login(response.data.jwt); // Guardar token y cargar usuario
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error en el login');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Usuario: </strong></label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label><strong>Password: </strong></label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">Login</button>
        <Link to="/registro">
          <button type="button">Registro</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;


