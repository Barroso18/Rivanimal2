import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/servicioUsuarios';
import bcrypt from 'bcryptjs';
import axios from 'axios';
const Registro = () => {
     const [usuario, setUsuario] = useState('');
      const [password, setPassword] = useState('');
      const [contrasena, setContrasena] = useState('');
      const [mensaje, setMensaje] = useState('');
      const [error, setError] = useState('');
    const handleSubmit = async (e) => {
  
        e.preventDefault();
    };
    return (
        <div>
          <h2>Registro</h2>
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
                value={password}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mensaje && <p>{mensaje}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      );
};

export default Registro;