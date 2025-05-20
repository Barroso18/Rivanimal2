import { PlusCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import Modal from "./Modales/Modal.jsx";
import EditarUsuario from "./Modales/Editarusuario.jsx";
import servicioUsuarios from "../servicios/servicioUsuarios";
import { useEffect, useState, useRef } from "react";


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
        servicioUsuarios.buscaPorid_usuario(parseInt(usuarioInformacion.id_usuario))
            .then((response) => {
            setusuarioInformacion(
                response.data
            );
            })
            .catch((error) => {
            console.error("Error al obtener el usuario:", error);
            });
        };

    return (
        <li className="flex flex-col sm:flex-row items-center sm:items-start justify-between p-4 bg-white rounded-lg shadow-md border mb-4">
            {/* Información principal */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{usuario.id_usuario} {usuario.nombre} {usuario.apellido1} {usuario.apellido2}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    <strong>Usuario:</strong> {usuario.nombre_usuario} <strong>Roles: </strong>
                    {usuario.roles.map((rol, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-1"
                        >
                            {rol.trim()}
                        </span>
                    ))}
                </p>
            </div>

            {/* Botones */}
            <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4">
                <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
                >
                <Link to={`/perfil-publico/${usuario.nombre_usuario}`} className="flex items-center gap-1">
                    Ver
                </Link>
                </button>
                <button
                onClick={() => editarusuario()}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-600"
                >
                Editar
                </button>
                <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
                >
                Eliminar
                </button>
            </div>
            <Modal isOpen={modalsusuario.editar}
                onClose={() => gestionarModalusuario("editar", false)}>
                <EditarUsuario usuario={usuarioInformacion}
                onClose={()=>gestionarModalusuario("editar",false)}/>
            </Modal>
        </li>
    );
};
export default UserCard2;