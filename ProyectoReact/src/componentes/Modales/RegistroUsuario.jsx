import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Login/AuthProvider';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import servicioUsuarios from '../../servicios/servicioUsuarios';

const Registro = ({onClose}) => {
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

       
          await servicioUsuarios.registro(formData)
            .then((response) => {
              if (response.data.message === "Registro exitoso") {
                setMensaje("Usuario registrado correctamente");
                setError("");
                navigate("/login"); // Redirigir a la página de login después del registro exitoso
              } else if (response.data.errores) {
                setError(Object.values(response.data.errores).join(", "));
              } else {
                setError("Error desconocido al registrar el usuario");
                console.log("Datos:",response.data);
              }
            }).catch((error) => {
              setError("Error en la petición de registro.");
              console.error("Error en axios:", error);
            });
          /*
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
        */
    };
    return (
        <div>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro</h2>
          
              <form onSubmit={controlaRegistro}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Nombre: </strong></label>
                  <input
                    type="text"
                    value={nombre}
                    name="nombre"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Apellido 1: </strong></label>
                  <input
                    type="text"
                    value={apellido1}
                    name="apellido1"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setApellido1(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Apellido 2: </strong></label>
                  <input
                    type="text"
                    value={apellido2}
                    name="apellido2"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setApellido2(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Password: </strong></label>
                  
                  <input
                    type="password"
                    value={contrasena}
                    name="contrasena"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                  />
                  
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Nombre usuario: </strong></label>
                  <input
                    type="text"
                    value={nombreUsuario}
                    name="nombreUsuario"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Roles: </strong></label>
                  <input
                    type="textarea"
                    value={roles}
                    name="roles"
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setRoles(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>DNI: </strong></label>
                  <input
                    type="text"
                    value={dni}
                    name='dni'
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setDni(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Teléfono: </strong></label>
                  <input
                    type="text"
                    value={telefono}
                    name='telefono'
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Email: </strong></label>
                  <input
                    type="email"
                    value={email}
                    name='email'
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Direccion: </strong></label>
                  <input
                    type="text"
                    value={direccion}
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    name='direccion'
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                </div>
                <div  className="mb-4">
                  <label className="block text-sm font-medium text-gray-600"><strong>Foto: </strong></label>{/* Esto hay que cambiarlo por un tipo file*/}
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {mensaje && <p>{mensaje}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
                  Registrar
                </button>
                <Link to="/login">
                  <button type="button" className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600">Volver login</button>
                </Link>
              </form>
            </div>
            </div>
        </div>
      );
};

export default Registro;