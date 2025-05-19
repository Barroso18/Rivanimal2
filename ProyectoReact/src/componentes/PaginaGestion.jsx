import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/estilos.css";
import Modal from "./Modales/Modal.jsx";
import Registro from "./Modales/RegistroUsuario.jsx";
import AgregarAnimal from './Modales/AgregarAnimal.jsx';
import UserCard from './UserCard';
import AnimalCard from './AnimalCard.jsx';
import servicioAnimales from '../servicios/servicioAnimales.js';
import servicioUsuarios from "../servicios/servicioUsuarios.js";
const PaginaGestion = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [animales,setAnimales] = useState([]);
    const tabs = [
        { id: "usuarios", label: "Usuarios" },
        { id: "animales", label: "Animales" },
        { id: "reportesdiarios", label: "Reportes diarios" }
    ];
    const tabRefs = useRef({});
    const [activeTab, setActiveTab] = useState("usuarios");
    const [modalsUsuarios, setModalsUsuarios] = useState({
        crear: false,
        consultar: false,
        editar: false,
    });
    const [modalsAnimales, setModalsAnimales] = useState({
        crear: false,
        consultar: false,
        editar: false,
    });
    const gestionarModalUsuarios = (tipoModal, estadoAbierto) => {
        setModalsUsuarios((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
        // Si el modal se cierra, recargar la lista de usuarios
        if (!estadoAbierto && tipoModal === "crear") {
            cargaTabUsuarios();
        }
    };
    const gestionarModalAnimales = (tipoModal, estadoAbierto) => {
        setModalsAnimales((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
    };
    const crearRegistroUsuario = () => {
        gestionarModalUsuarios("crear", true);
    };


    const crearRegistroAnimal = () => {
        gestionarModalAnimales("crear", true);
    }

    // Función para cargar la lista de usuarios
    const cargaTabUsuarios = () => {
        servicioUsuarios
            .buscaTodosUsuarios()
            .then((response) => {
                setUsuarios(response.data);
                console.log("Lista de usuarios:", response.data);
            })
            .catch((error) => {
                console.error("Error al cargar la lista de usuarios:", error);
            });
    };

    const cargaTabAnimales = () =>{
        servicioAnimales.getAll()
        .then((response) => {
                setAnimales(response.data);
                console.log("Lista de animales:", response.data);
        })
        .catch((error) => {
            console.error("Error al cargar la lista de animales:", error);
        });
    };

    // Cargar datos al cambiar de pestaña
    useEffect(() => {
        if (activeTab === "usuarios") {
            cargaTabUsuarios();
        }
        if(activeTab === "animales"){
            cargaTabAnimales();
        }
    }, [activeTab]);

    return (
        <div>
            <h1>Pagina de Gestion</h1>
            <p>Esta es la pagina de gestion de la aplicacion.</p>

            {/* Tabs */}
            <div className="tabs flex border-b border-gray-300 overflow-x-auto whitespace-nowrap no-scrollbar">
                {tabs.map((tab) => (
                    <button key={tab.id}
                        ref={(el) => (tabRefs.current[tab.id] = el)}
                        className={`tab px-4 py-2 shrink-0 ${
                            activeTab === tab.id
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab(tab.id)}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenido de las tabs */}
            <div className="tab-content mt-4">
                {activeTab === "usuarios" && (
                    <div>
                        <button type="button" 
                            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600" 
                            onClick={() => crearRegistroUsuario()}>
                                Registro Usuario
                        </button>
                        <h2 className="mt-4 text-lg font-bold">Lista de Usuarios</h2>
                        <p>Esta es la lista de usuarios registrados en la aplicación:</p>
                        <ul className="list-disc pl-5">
                            {usuarios.map((usuario) => (
                                <UserCard key={usuario.id_usuario} usuario={usuario} />
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === "animales" && (
                    <div>
                        <button type="button" 
                            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600" 
                            onClick={() => crearRegistroAnimal()}>
                                Registro Animal
                        </button>
                        <h2 className="mt-4 text-lg font-bold">Gestión de Animales</h2>
                        <p>Contenido relacionado con la gestión de animales.</p>
                        <ul className="list-disc pl-5">
                            {animales.map((animal) => (
                                <AnimalCard key={animal.id_animal} animal={animal} />
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === "reportesdiarios" && (
                    <div>
                        <h2 className="mt-4 text-lg font-bold">Reportes Diarios</h2>
                        <p>Contenido relacionado con los reportes diarios.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal isOpen={modalsUsuarios.crear} onClose={() => gestionarModalUsuarios("crear", false)}>
                <Registro onClose={() => gestionarModalUsuarios("crear", false)} />
            </Modal>

            <Modal isOpen={modalsAnimales.crear} onClose={() => gestionarModalAnimales("crear", false)}>
                <AgregarAnimal onClose={() => gestionarModalAnimales("crear", false)} />
            </Modal>
        </div>
    );
};

export default PaginaGestion;