import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/servicioUsuarios';
import bcrypt from 'bcryptjs';
import axios from 'axios';
const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [roles, setRoles] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [foto, setFoto] = useState('');
    const [mensaje, setMensaje] = useState('');
      const [error, setError] = useState('');

    
    const controlaRegistro = async (e) => {
  
        e.preventDefault();
    };
    return (
        <div>
          <h2>Registro</h2>
          <form onSubmit={controlaRegistro}>
          <div>
              <label><strong>Nombre: </strong></label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Apellido 1: </strong></label>
              <input
                type="text"
                value={apellido1}
                onChange={(e) => setApellido1(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Apellido 2: </strong></label>
              <input
                type="text"
                value={apellido2}
                onChange={(e) => setApellido2(e.target.value)}
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
            <div>
              <label><strong>Nombre usuario: </strong></label>
              <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
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