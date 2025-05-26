import { PlusCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import Modal from "./Modales/Modal.jsx";
import EditarUsuario from "./Modales/EditarUsuario.jsx";
import servicioUsuarios from "../servicios/servicioUsuarios";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";


const UserCard2 = ({ usuario, onEdit, onDelete, onView  }) => {
    const [usuarioInformacion, setusuarioInformacion] = useState(usuario);
    const [modalsusuario,setModalsusuario] = useState({
        crear: false,
        consultar: false,
        editar: false,
        });
    // Función para gestionar los modales de usuario
    const gestionarModalusuario = (tipoModal, estadoAbierto) => {
        setModalsusuario((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
        recargausuario();
    };
    const editarusuario = () =>{
        gestionarModalusuario("editar",true);
    }
    const recargausuario = () => {
        if (!usuarioInformacion.id_usuario) return;
        servicioUsuarios.buscaPorIdCompleto(parseInt(usuarioInformacion.id_usuario))
            .then((response) => {
                setusuarioInformacion(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener el usuario:", error);
            });
        };
    const borrarUsuario = () =>{
        servicioUsuarios.borraUsuarioPorId(usuario.id_usuario)
        .then((response) => {
            if(response.data.error){
                Swal.fire({
                    title: "Error",
                    text: response.data.error,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
            if(response.data.mensaje === 'Usuario eliminado exitosamente'){
                const mensaje = "Usuarios eliminados: "+response.data.filas_eliminadas;
                Swal.fire({
                    title: response.data.mensaje,
                    text: mensaje,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                }).then(() => {
                    // Recargar la lista de usuarios después de eliminar
                    if (typeof onDelete === "function") {
                        onDelete();
                    }
                });
            }
        })
        .catch((error) => {
            console.error("Error al borrar el usuario:", error);
        });
    }
    return (
       <li className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow-md border mb-4">
            {/* Información principal */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{usuario.id_usuario} {usuario.nombre} {usuario.apellido1} {usuario.apellido2}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Usuario:</span> {usuario.nombre_usuario}
                </p>
                <div className="flex flex-wrap gap-2 mt-2"><strong>Roles: </strong>
                    {usuario.roles.map((rol, index) => (
                        <span
                            key={index}
                            className="bg-green-100 text-green-700 flex items-center justify-center text-xs font-medium px-2.5 py-0.5 rounded "
                        >
                            {rol.trim()}
                        </span>
                    ))}
                </div>
            </div>

            {/* Botones */}
            <div className="divbotones mt-4 sm:mt-0 flex flex-row sm:flex-row justify-center sm:justify-end gap-2 w-full sm:w-auto">
                <Link to={`/perfil-publico/${usuario.nombre_usuario}`} className="flex items-center gap-1">
                    <button
                    className="relative bg-green-500 hover:bg-green-600 text-white flex flex-row items-center gap-2 px-4 py-2 rounded-md text-sm group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                            Ver perfil
                        </span>
                    </button>
                </Link>
                <button
                  onClick={() => editarusuario()}
                  type="button"
                  className="relative bg-orange-400 hover:bg-orange-600 text-white flex flex-row items-center gap-2 px-4 py-2 rounded-md text-sm group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                    Editar usuario
                  </span>
                </button>
                <button
                onClick={() =>borrarUsuario()}
                className="relative bg-red-500 hover:bg-red-600 text-white flex flex-row items-center gap-2 px-4 py-2 rounded-md text-sm group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                        Eliminar usuario
                    </span>
                
                </button>
            </div>
            <Modal
                isOpen={modalsusuario.editar}
                onClose={() => {
                    gestionarModalusuario("editar", false);
                    if (typeof onDelete === "function") {
                        onDelete(); // Recarga la lista de usuarios al cerrar el modal de editar
                    }
                }}
            >
                <EditarUsuario
                usuario={usuarioInformacion}
                onClose={() => {
                    gestionarModalusuario("editar", false);
                    if (typeof onDelete === "function") {
                        onDelete();
                    }
                }}
                />
            </Modal>
        </li>
    );
};
export default UserCard2;