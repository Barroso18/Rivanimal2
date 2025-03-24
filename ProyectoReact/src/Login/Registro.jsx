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
    const [errores, setErrores] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          setFoto(file);
          setPreview(URL.createObjectURL(file)); // Mostrar vista previa de la imagen
      }
  };
    /*const subirFoto = async (e) => {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await fetch("http://localhost/Rivanimal2/FuncionesPHP/subeFoto.php", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setMessage("Error al subir la imagen.");
      }
    };*/

    const controlaRegistro = async (e) => {
        e.preventDefault();
        var url = "http://localhost/Rivanimal2/FuncionesPHP/registro.php";
        /*var datos = {
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
          foto: image
        };*/
        // Crear un objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("apellido1", apellido1);
        formData.append("apellido2", apellido2);
        formData.append("contrasena", contrasena);
        formData.append("nombreUsuario", nombreUsuario);
        formData.append("roles", roles);
        formData.append("dni", dni);
        formData.append("telefono", telefono);
        formData.append("email", email);
        formData.append("direccion", direccion);
        if (foto) {
            formData.append("file", foto); // Adjuntar la imagen
        }

        //console.log("Datos:",datos);
        /*
        axios.post(url, formData,{headers: { 'Content-Type': 'multipart/form-data' }})
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
          */
          try {
            const response = await axios.post(
                "http://localhost/Rivanimal2/FuncionesPHP/registro.php",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.message === "Registro exitoso") {
                setMensaje("Usuario registrado correctamente");
                setError("");
            } else if (response.data.errores) {
                setError(Object.values(response.data.errores).join(", "));
            } else {
                setError("Error desconocido al registrar el usuario");
            }
        } catch (error) {
            setError("Error en la petición de registro.");
            console.error("Error en axios:", error);
        }

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
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mensaje && <p>{mensaje}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      );
};

export default Registro;