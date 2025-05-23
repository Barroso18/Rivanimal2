import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Login/AuthProvider';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import servicioUsuarios from '../../servicios/servicioUsuarios';
import Roles from '../Roles';
import Swal from "sweetalert2";
import '../../estilos/estilos.css';
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
    const [licenciaPPP, setLicenciaPPP] = useState(false);
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
    // Función para restablecer el formulario
    const resetFormulario = () => {
      setNombre('');
      setApellido1('');
      setApellido2('');
      setContrasena('');
      setNombreUsuario('');
      setRoles([]);
      setDni('');
      setTelefono('');
      setEmail('');
      setDireccion('');
      setFoto('');
      setMensaje('');
      setError('');
      setPreview(null);
      setLicenciaPPP(false);
      setImage(null);
    };
    const controlaRegistro = async (e) => {
      e.preventDefault();        
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
      formData.append("licenciaPPP", licenciaPPP ? 1 : 0); // Convertir a 1 o 0
      if (foto) {
          formData.append("file", foto); // Adjuntar la imagen
      }
      await servicioUsuarios.registro(formData)
        .then((response) => {
          if (response.data.message === "Registro exitoso") {
            setMensaje("Usuario registrado correctamente");
            setError("");
            resetFormulario();
            Swal.fire({
              title: "¡Éxito!",
              text: mensaje,
              icon: "success",
              confirmButtonText: "Aceptar",
            });
            //navigate("/pagina-gestion"); // Redirigir a la página de login después del registro exitoso
            //Cerramos el modal una vez el usuario se ha agregado
            onClose();
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

                {/* Grupo 3: Telefono, Dirección, DNI y Foto */}
                <div className="flex flex-wrap gap-4">
                   <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-600">Teléfono:</label>
                    <input
                      type="text"
                      value={telefono}
                      name="telefono"
                      onChange={(e) => setTelefono(e.target.value)}
                      required
                      className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                    />
                  </div>
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
                    {Roles.todos.map((rol) => (
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
                {/* Grupo 5: Licencia PPP */}
                <div className="flex-1 min-w-[150px]">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={licenciaPPP}
                      checked={licenciaPPP}
                      onChange={(e) => setLicenciaPPP(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Licencia PPP</span>
                  </label>
                </div>
                {/* Grupo 6: Foto */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <div className="flex items-center gap-4 mt-1">
                      <label className="block text-sm font-medium text-gray-600">Foto:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full mt-1 text-sm"
                      />
                      {preview && <img src={preview} alt="Preview" className="mt-2 h-16 rounded border object-cover" />}
                    </div>
                  </div>
                </div>
                {/* Grupo 7: Mensajes */}
                {error && <p className="text-red-500">{error}</p>}
                {mensaje && <p className="text-green-600">{mensaje}</p>}

                {/* Grupo 8: Botones */}
                <div className="flex gap-4 mt-2 justify-center">
                  <button type="submit" className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600">Registrar</button>
                  <button type="button" onClick={resetFormulario} className="bg-red-500 text-white p-2 text-sm rounded hover:bg-red-600">Borrar campos</button>
                </div>
                
              </form>
            </div>
          </div>
      );
};

export default Registro;