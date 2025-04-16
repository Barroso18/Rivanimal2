import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login/AuthProvider';
import ServicioUsuarios from "../servicios/servicioUsuarios";
const PerfilUsuario = () => {
    const [activeTab, setActiveTab] = useState("roles");
    const { user, logout } = useAuth();// user?.data.usuario
    const [usuarioInformacion, setUsuarioInformacion] = useState({});
    const [reportesDiarios, setReportesDiarios] = useState([]);

    //Carga de datos del usuario
    useEffect(()=>{
        const idUsuario = user?.data.id;
        ServicioUsuarios.buscaPorIdCompleto(idUsuario)
        .then((response) => {
            setUsuarioInformacion(response.data);
        })
        .catch((error) => console.error("Error al obtener los datos del usuario:", error));
    })
    function buscaFoto(){
        if(usuarioInformacion.foto === null || usuarioInformacion.foto === undefined || usuarioInformacion.foto === ""){
            return (<>No hay foto</>);

        }else{
            return (<>{usuarioInformacion.foto ? (
                <img src={usuarioInformacion.foto} alt="Foto perfil usuario" />
              ) : (
                <p>Cargando imagen...</p>
              )}</>);
        }
        
    }
    return (
        <div className="usuario-perfil">
            <div className="ficha-container">
                <div className="foto">
                  {/* Verificación condicional para evitar errores */}
                  {buscaFoto()}
                </div>
                <div className="info text-gray-800 text-sm">
                    <h1 className="titulo text-lg font-semibold mb-2">
                    Info general <span className="nombre">{usuarioInformacion.nombre}</span>
                    </h1>
                    <div className="detalles">
                        <p>
                            <strong>Nombre:</strong> {usuarioInformacion.nombre}{" "}
                        </p>
                        <p>
                            <strong>Apellidos:</strong> {usuarioInformacion.apellido1}, {usuarioInformacion.apellido2}
                        </p>
                        <p>
                            <strong>Email:</strong> {usuarioInformacion.email}
                        </p>
                        <p>
                            <strong>Licencia PPP:</strong> 
                        </p>
                        <p>
                            <strong>Movil:</strong>{" "}
                            {usuarioInformacion.telefono}{" "}
                        </p>
                        <p>
                            <strong>Nombre de usuario:</strong> {usuarioInformacion.nombre_usuario}
                        </p>
                        <p>
                            <strong>Direccion:</strong> {usuarioInformacion.direccion}
                        </p>
                        <p>
                            <strong>DNI:</strong> {usuarioInformacion.dni}
                        </p>
                        <p>
                            <strong>Cambio de contraseña:</strong> Link
                        </p>
                    </div>
                </div>
            </div>
            <div className= "fila">

                <div className="tabs-container border border-gray-300 rounded-md overflow-hidden mb-4">
                    {/* Columna para los tabs */}
                    {/* Tabs */}
                    <div className="tabs border-b border-gray-300">
                        <button
                            className={`tab px-4 py-2 ${
                            activeTab === "roles"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                            }`}
                            onClick={() => setActiveTab("roles")}
                        >
                            Roles
                        </button>
                    </div>
                    {/* Contenido de las tabs */}
                    <div className="tab-content mt-4">
                        {activeTab === "roles" && (
                            <div>Información de la salud del animal.</div>
                        )}
                    </div>
                </div>
                <div>{/* Columna para el calendario */}

                </div>
            </div> 
              
        </div>
    );
}
export default PerfilUsuario;