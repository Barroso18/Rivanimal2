import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Login/AuthProvider';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import servicioUsuarios from '../../servicios/servicioUsuarios';
import Roles from '../Roles';
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
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
              {/* Botón de cierre */}
              <button
                onClick={onClose}
                className="close-btn absolute top-2 right-2 bg-white text-gray-500 hover:text-gray-800 rounded-full shadow-lg p-2"
                aria-label="Cerrar"
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro</h2>
          
              <form onSubmit={controlaRegistro} className="space-y-6">

                {/* Grupo 1: Nombre y Apellidos */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Nombre:</label>
                    <input
                      type="text"
                      value={nombre}
                      name="nombre"
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Apellido 1:</label>
                    <input
                      type="text"
                      value={apellido1}
                      name="apellido1"
                      onChange={(e) => setApellido1(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Apellido 2:</label>
                    <input
                      type="text"
                      value={apellido2}
                      name="apellido2"
                      onChange={(e) => setApellido2(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                </div>

                {/* Grupo 2: Email, Usuario y Contraseña */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Email:</label>
                    <input
                      type="email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Usuario:</label>
                    <input
                      type="text"
                      value={nombreUsuario}
                      name="nombreUsuario"
                      onChange={(e) => setNombreUsuario(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Contraseña:</label>
                    <input
                      type="password"
                      value={contrasena}
                      name="contrasena"
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                </div>

                {/* Grupo 3: Dirección, DNI y Foto */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Dirección:</label>
                    <input
                      type="text"
                      value={direccion}
                      name="direccion"
                      onChange={(e) => setDireccion(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">DNI:</label>
                    <input
                      type="text"
                      value={dni}
                      name="dni"
                      onChange={(e) => setDni(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
                  
                </div>

                {/* Grupo 4: Roles */}
                <div className="mb-4 flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium text-gray-600 mb-2"><strong>Roles:</strong></label>
                  <div className="flex flex-wrap gap-4">
                    {Roles.map((rol) => (
                      <label key={rol} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={rol}
                          checked={roles.includes(rol)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRoles([...roles, rol]);
                            } else {
                              setRoles(roles.filter(r => r !== rol));
                            }
                          }}
                        />
                        <span className="text-sm capitalize">{rol}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Foto:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full mt-1 text-sm"
                    />
                    {preview && <img src={preview} alt="Preview" className="mt-2 h-16 rounded border object-cover" />}
                  </div>
                {/* Mensajes */}
                {error && <p className="text-red-500">{error}</p>}
                {mensaje && <p className="text-green-600">{mensaje}</p>}

                {/* Botones */}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600">Registrar</button>
                <Link to="/login">
                  <button type="button" className="w-full bg-green-500 text-white p-2 text-sm rounded mt-2 hover:bg-green-600">Volver login</button>
                </Link>
              </form>
            </div>
          </div>
      );
};

export default Registro;