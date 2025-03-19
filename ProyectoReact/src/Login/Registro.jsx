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
        var url = "http://localhost/Rivanimal2/FuncionesPHP/registro.php";
        var datos = {
          nombre: nombre,
          apellido1: apellido1,
          apellido2: apellido2,
          contrasena: contrasena,
          nombreUsuario: nombreUsuario,
          roles: roles,
          dni: dni,
          telefono: telefono,
          email: email,
          direccion: direccion,
          foto: foto
        };
        console.log("Datos:",datos);
        axios.post(url, datos)
          .then(response => {
            if (response.data === "OK") {
              setMensaje("Usuario registrado correctamente");
            } else {
                console.log("Datos:",response.data);
              setError("Error al registrar el usuario1",response.data[0]);
            }
          })
          .catch(error => {
            setError("Error al registrar el usuario2");
          });
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
                name="nombre"
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Apellido 1: </strong></label>
              <input
                type="text"
                value={apellido1}
                name="apellido1"
                onChange={(e) => setApellido1(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Apellido 2: </strong></label>
              <input
                type="text"
                value={apellido2}
                name="apellido2"
                onChange={(e) => setApellido2(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label><strong>Password: </strong></label>
              
              <input
                type="password"
                value={contrasena}
                name="contrasena"
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              
            </div>
            <div>
              <label><strong>Nombre usuario: </strong></label>
              <input
                type="text"
                value={nombreUsuario}
                name="nombreUsuario"
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Roles: </strong></label>
              <input
                type="textarea"
                value={roles}
                name="roles"
                onChange={(e) => setRoles(e.target.value)}
              />
            </div>
            <div>
              <label><strong>DNI: </strong></label>
              <input
                type="text"
                value={dni}
                name='dni'
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Teléfono: </strong></label>
              <input
                type="text"
                value={telefono}
                name='telefono'
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div>
              <label><strong>Email: </strong></label>
              <input
                type="email"
                value={email}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Direccion: </strong></label>
              <input
                type="text"
                value={direccion}
                name='direccion'
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>
            <div>
              <label><strong>Foto: </strong></label>{/* Esto hay que cambiarlo por un tipo file*/}
              <input
                type="text"
                value={foto}
                name='foto'
                onChange={(e) => setFoto(e.target.value)}
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