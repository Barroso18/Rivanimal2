import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../estilos/estilos.css";
import Modal from "./Modales/Modal.jsx";
import Registro from "./Modales/RegistroUsuario.jsx";
import AgregarAnimal from './Modales/AgregarAnimal.jsx';
import ChenilCrear from './Modales/ChenilCrear.jsx';
import ChenilAsignar from './Modales/ChenilAsignar.jsx';
import UserCard from './UserCard';
import UserCard2 from './UserCard2';
import AnimalCard from './AnimalCard.jsx';
import servicioAnimales from '../servicios/servicioAnimales.js';
import servicioUsuarios from "../servicios/servicioUsuarios.js";
import FiltroAnimales from "./FiltroAnimales"; 
import FiltroUsuarios from './FiltroUsuarios.jsx';

const PaginaGestion = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [animales,setAnimales] = useState([]);
    const [filtros, setFiltros] = useState({
        animal: '',
        nivel: '',
        clase: '',
        situacion: ''
    });
    const [animalesFiltrado, setAnimalesFiltrado] = useState([]);
    const [usuariosFiltrado, setUsuariosFiltrado] = useState([]);
    const [errores, setErrores] = useState({});
    const [filtros2, setFiltros2] = useState({
        busqueda: '',
        rol: ''
    });
    const tabs = [
        { id: "usuarios", label: "Usuarios" },
        { id: "animales", label: "Animales" },
        { id: "cheniles", label: "Cheniles" },
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
    const [modalsCheniles, setModalsCheniles] = useState({
        crear: false,
        consultar: false,
        editar: false,
        asignar: false,
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
    const gestionarModalCheniles = (tipoModal, estadoAbierto) => {
        setModalsCheniles((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
    };

    const crearRegistroUsuario = () => {
        gestionarModalUsuarios("crear", true);
    };
    const crearChenil = () =>{
        gestionarModalCheniles("crear",true);
    }

    const crearRegistroAnimal = () => {
        gestionarModalAnimales("crear", true);
    }


    // Función para cargar la lista de usuarios
    const cargaTabUsuarios = () => {
        servicioUsuarios
            .buscaTodosUsuarios()
            .then((response) => {
                // Procesar usuarios: convertir roles a array si es string
                const usuariosProcesados = response.data.map(usuario => {
                    let rolesArray = usuario.roles;
                    if (typeof rolesArray === "string") {
                        rolesArray = rolesArray.split(',').map(r => r.trim());
                    }
                    return {
                        ...usuario,
                        roles: Array.isArray(rolesArray) ? rolesArray : []
                    };
                });
                setUsuarios(usuariosProcesados);
                setUsuariosFiltrado(usuariosProcesados);
                //console.log("Lista de usuarios:", usuariosProcesados);
            })
            .catch((error) => {
                console.error("Error al cargar la lista de usuarios:", error);
            });
    };

    const cargaTabAnimales = () =>{
        servicioAnimales.getAll()
        .then((response) => {
                setAnimales(response.data);
                //console.log("Lista de animales:", response.data);
        })
        .catch((error) => {
            console.error("Error al cargar la lista de animales:", error);
        });
    };

    // Filtrado en tiempo real usando los filtros del componente externo
    useEffect(() => {
        let filtrados = animales;

        if (filtros.animal.trim() !== '') {
            filtrados = filtrados.filter(animal =>
                animal.nombre.toLowerCase().includes(filtros.animal.toLowerCase())
            );
        }
        if (filtros.nivel !== undefined && filtros.nivel !== '' && !isNaN(filtros.nivel)) {
            filtrados = filtrados.filter(animal =>
                String(animal.nivel) === String(filtros.nivel)
            );
        }
        if (filtros.clase) {
            filtrados = filtrados.filter(animal =>
                animal.clase && animal.clase.toLowerCase() === filtros.clase.toLowerCase()
            );
        }
        if (filtros.situacion) {
            filtrados = filtrados.filter(animal =>
                animal.situacion && animal.situacion.toLowerCase() === filtros.situacion.toLowerCase()
            );
        }
        setAnimalesFiltrado(filtrados);
    }, [filtros, animales]); 

    const handleFiltrosChange = (nuevosFiltros) => {
        setFiltros(nuevosFiltros);
    };
    useEffect(() => {
        let filtrados = usuarios;

        if (filtros2.busqueda && filtros2.busqueda.trim() !== '') {
            const texto = filtros2.busqueda.toLowerCase();
            filtrados = filtrados.filter(usuario =>
                usuario.nombre.toLowerCase().includes(texto) ||
                usuario.nombre_usuario.toLowerCase().includes(texto)
            );
        }
        if (filtros2.rol) {
            filtrados = filtrados.filter(usuario =>
                Array.isArray(usuario.roles) &&
                usuario.roles.some(
                    rol => rol.toLowerCase() === filtros2.rol.toLowerCase()
                )
            );
        }
        setUsuariosFiltrado(filtrados);
    }, [filtros2, usuarios]);

    const handleFiltrosChange2 = (nuevosFiltros) => {
        setFiltros2(nuevosFiltros);
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
        <div className='p-[3%]'>
           
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                            <div className="flex-1">
                                <h2 className="mt-4 text-lg font-bold">Lista de Usuarios</h2>
                                <p>Esta es la lista de usuarios registrados en la aplicación:</p>
                            </div>
                            <button type="button" 
                                className=" bg-green-500 text-white p-3 rounded-md hover:bg-green-600" 
                                onClick={() => crearRegistroUsuario()}>
                                    Añadir Usuario
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <FiltroUsuarios filtros={filtros2} onFiltrosChange={handleFiltrosChange2} errores={errores} />
                        </div>
                        <ul className="list-disc pl-5">
                            {usuariosFiltrado.map((usuario) => (
                                <UserCard2
                                    key={usuario.id_usuario}
                                    usuario={usuario}
                                    onDelete={() =>cargaTabUsuarios()}
                                    onEdit={() =>cargaTabUsuarios()}/>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === "animales" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                            <div className="flex-1">
                                <h2 className="text-lg font-bold">Gestión de Animales</h2>
                                <p>Contenido relacionado con la gestión de animales.</p>
                            </div>
    
                            <button
                                type="button"
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 self-start sm:self-auto"
                                onClick={() => crearRegistroAnimal()}
                            >
                                Registro Animal
                            </button>
                        </div>

                        <div className="flex justify-center items-center mt-4">
                        <FiltroAnimales filtros={filtros} onFiltrosChange={handleFiltrosChange} errores={{}} />
                        </div>
                        <ul className="list-disc pl-5">
                            {filtros.animal || filtros.nivel || filtros.clase || filtros.situacion
                                ? (
                                animalesFiltrado.length > 0
                                    ? animalesFiltrado.map((animal) => (
                                        <AnimalCard
                                            key={animal.id_animal}
                                            animal={animal}
                                            onAsignar={() => {
                                                cargaTabAnimales();
                                            }}
                                            onReAsignar={() => {
                                                cargaTabAnimales();
                                            }}
                                            />
                                    ))
                                    : <>No se encontraron animales con esos filtros.</>
                                )
                                : animales.map((animal) => (
                                    <AnimalCard key={animal.id_animal} animal={animal} onDelete={() =>cargaTabAnimales()} onAsignar={() => {
                                                
                                                cargaTabAnimales();
                                            }}/>
                                ))
                            }
                        </ul>
                    </div>
                )}
                {activeTab === "reportesdiarios" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                            <div className="flex-1">
                                <h2 className="mt-4 text-lg font-bold">Reportes Diarios</h2>
                                <p>Contenido relacionado con los reportes diarios.</p>
                            </div>
                            <button type="button" 
                                className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600" 
                                >
                                    Agregar reporte
                            </button>
                        </div>
                        
                    </div>
                )}
                {activeTab === "cheniles" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                            <div className="flex-1">
                                <h2 className="mt-4 text-lg font-bold">Gestion de cheniles y zonas de gatos</h2>
                                <p>Contenido relacionado con los cheniles y zonas de gatos.</p>
                            </div>
                            <button type="button" 
                                className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600" 
                                onClick={() =>crearChenil()}>
                                    Agregar chenil
                            </button>
                        </div>
                        
                    </div>
                )}
            </div>

            {/* Modal */}
            <Modal isOpen={modalsUsuarios.crear} onClose={() => gestionarModalUsuarios("crear", false)}>
                <Registro onClose={() => gestionarModalUsuarios("crear", false)} />
            </Modal>

            <Modal
                isOpen={modalsAnimales.crear}
                onClose={() => {
                    gestionarModalAnimales("crear", false);
                    cargaTabAnimales(); // Recarga la lista de animales al cerrar el modal
                }}
                >
                <AgregarAnimal onClose={() => {
                    gestionarModalAnimales("crear", false);
                    cargaTabAnimales(); // Recarga la lista de animales al cerrar desde el propio modal
                }} />
            </Modal>
            <Modal isOpen={modalsCheniles.crear}
                onClose={() => {
                    gestionarModalCheniles("crear", false);
                }}>
                <ChenilCrear onClose={() => {
                    gestionarModalCheniles("crear", false);
                }}/>
            </Modal>
            
        </div>
    );
};

export default PaginaGestion;