import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosLogin = {
      usuario: usuario,
      contrasena: contrasena,
    };
    console.log('Datos login:', datosLogin);
     await axios.post('http://localhost/Rivanimal2/FuncionesPHP/login.php', datosLogin, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        if (response.data.jwt) {
          localStorage.setItem('token', response.data.jwt);
          setMensaje('Login exitoso');
          console.log(response.data.jwt);
          navigate('/');
        } else {
          setError(response.data.message);
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error al autenticar:', error);
        setError('Error en el login');
      });
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
            name='usuario'
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label><strong>Password: </strong></label>
          <input
            type="password"
            value={contrasena}
            name='contrasena'
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensaje && <p>{mensaje}</p>}
        <button type="submit">Login</button>
        <Link to="/registro">
          <button>Registro</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
