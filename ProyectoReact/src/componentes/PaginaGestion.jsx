import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/estilos.css";
import Modal from "./Modales/Modal.jsx";
import Registro from "./Modales/RegistroUsuario.jsx";
const PaginaGestion = () => {

    //Constantes para gestionar los modales
    const [modals, setModals] = useState({
        crear: false,
        consultar: false,
        editar: false,
    });
    const gestionarModal = (tipoModal, estadoAbierto) => {
        setModals((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
    };

    const crearRegistroUsuario = () => {  
        gestionarModal("crear",true)
      };
    return (
        <div>
            <h1>Pagina de Gestion</h1>
            <p>Esta es la pagina de gestion de la aplicacion.</p>
            
            <button type="button" 
                className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600" 
                onClick={() => crearRegistroUsuario()}>
                    Registro Usuario
            </button>
            
            {/* Modal */}
            <Modal isOpen={modals.crear} onClose={() => gestionarModal("crear", false)}>
                <Registro onClose={() => gestionarModal("crear", false)} />
            </Modal>
        </div>
    );
};
export default PaginaGestion;