import "../estilos/estilos.css";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login/AuthProvider';
import ServicioUsuarios from "../servicios/servicioUsuarios";
import ServicioReporteDiario from "../servicios/servicioReporteDiario";
import { use } from "react";
import {Link} from "react-router-dom";
import servicioReporteDiario from "../servicios/servicioReporteDiario";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "./Modales/Modal.jsx";
import ReporteDiarioConsultar from "./Modales/ReporteDiarioConsultar.jsx";
import servicioPaseos from "../servicios/servicioPaseos.js";
import CalendarioDinamico from "./CalendarioDinamico.jsx";
import EditarUsuario from "./Modales/Editarusuario.jsx";


const PerfilUsuario = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
    const [activeTab, setActiveTab] = useState("roles");
    const { user, logout } = useAuth();// user?.data.usuario
    const [usuarioInformacion, setUsuarioInformacion] = useState({});
    const [animales,setAnimales] = useState([]);
    const [reportesDiarios, setReportesDiarios] = useState([]);
    const rolesUsuario = typeof user?.data.roles === 'string' ? user.data.roles.split(',').map(role => role.trim()) // Convertir a array y eliminar espacios
  : Array.isArray(user?.data.roles)? user.data.roles: [];
  //Variables para la paginacion de los reportes diarios
  const [paginaActual, setPaginaActual] = useState(0);
  const elementosPorPagina = 4;
  //Constantes para gestionar los modales
    const [modals, setModals] = useState({
        crear: false,
        consultar: false,
        editar: false,
    });
    const [modalsUsuario, setModalsUsuario] = useState({
        crear: false,
        consultar: false,
        editar: false,
    });
    const gestionarModal = (tipoModal, estadoAbierto) => {
      setModals((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
    };
    const consultarReporteDiario = (reporte) => {
      setReporteSeleccionado(reporte);
      gestionarModal("consultar",true)
    };
    const gestionarModalUsuario = (tipoModal, estadoAbierto) => {
      setModalsUsuario((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
    };
    const editarUsuario = (reporte) => {
      //setReporteSeleccionado(reporte);
      gestionarModalUsuario("editar",true)
    };
    //Carga de datos del usuario
    useEffect(()=>{
        const idUsuario = user?.data.id;
        ServicioUsuarios.buscaPorIdCompleto(idUsuario)
        .then((response) => {
            setUsuarioInformacion(response.data);
            cargaReportesDiarios(idUsuario);
        })
        .catch((error) => console.error("Error al obtener los datos del usuario:", error));
    }, [user?.data.id])
    function buscaFoto(){
        if(usuarioInformacion.foto === null || usuarioInformacion.foto === undefined || usuarioInformacion.foto === ""){
            return (
                <div className="foto flex justify-center items-center w-full md:w-auto mb-4 md:mb-0">
                    <img src="../imagenes/imagenUsuario.jpg" alt="Foto perfil usuario" />
                </div>);

        }else{
            return (<>{usuarioInformacion.foto ? (
                <div className="foto flex justify-center items-center w-full md:w-auto mb-4 md:mb-0">
                    <img src={usuarioInformacion.foto} alt="Foto perfil usuario" />
                </div>
              ) : (
                <p>Cargando imagen...</p>
              )}</>);
        }
        
    }
    //Carga de reportes diarios del usuario ordenados por fecha mas reciente
    async function  cargaReportesDiarios(idUsuario){
        await servicioReporteDiario.buscarReportesDiariosPorUsuario(idUsuario)
            .then((response) => {
                setReportesDiarios(response.data);
                //console.log("Reportes diarios:", response.data);
            })
            .catch((error) => {
                console.error("Error al buscar reportes diarios:", error);
            });
    }
    async function cargaAnimalesCuidados(idUsuario){
        await servicioPaseos.buscaAnimalPorUsuario(idUsuario)
        .then((response) => {
          //Hay que controlar si no existen registros
          console.log ("animales: ", response.data);
            setAnimales(response.data);
            //console.log("Reportes diarios:", response.data);
        })
        .catch((error) => {
            console.error("Error al buscar reportes diarios:", error);
        });
    }
    useEffect(() => {
      if (activeTab === "animales" && usuarioInformacion.id_usuario) {
        cargaAnimalesCuidados(usuarioInformacion.id_usuario);
      }
      // eslint-disable-next-line
    }, [activeTab, usuarioInformacion.id_usuario]);

    const visualizaAnimalesCuidados = () => {
      if (!animales || animales.length === 0) {
        return <p>No hay animales cuidados.</p>;
      }
      return (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Clase</th>
                <th className="border border-gray-300 px-4 py-2">Raza</th>
                <th className="border border-gray-300 px-4 py-2">PPP</th>
              </tr>
            </thead>
            <tbody>
              {animales.map((animal, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2"><Link to={`/pagina-animal/${animal.id_animal}`} className="underline text-blue-600 hover:text-blue-800">{animal.nombre}</Link></td>
                  <td className="border border-gray-300 px-4 py-2">{animal.clase}</td>
                  <td className="border border-gray-300 px-4 py-2">{animal.raza}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {animal.ppp === 1 ? "Sí" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    const visualizaReportesDiarios = () => {
        if (reportesDiarios == null || reportesDiarios.length == 0) {
          return <p>No hay paseos registrados</p>;
        } else {
          const totalPaginas = Math.ceil(reportesDiarios.length / elementosPorPagina);
    
          const reportesPaginados = reportesDiarios.slice(
            paginaActual * elementosPorPagina,
            (paginaActual + 1) * elementosPorPagina
          );
    
          const siguientePagina = () => {
            if (paginaActual < totalPaginas - 1) {
              setPaginaActual(paginaActual + 1);
            }
          };
    
          const anteriorPagina = () => {
            if (paginaActual > 0) {
              setPaginaActual(paginaActual - 1);
            }
          };
          return (
            <div className="bg-gray-100 w-full">
              <div className="p-4 rounded-2xl shadow-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <button
                    className="text-2xl"
                    onClick={siguientePagina}
                    disabled={paginaActual === totalPaginas - 1}
                  >
                    <ArrowLeft className="mr-2" />
                  </button>
    
                  <h2 className="text-xl font-semibold">Reportes diarios</h2>
    
                  <button
                    className="text-2xl"
                    onClick={anteriorPagina}
                    disabled={paginaActual === 0}
                  >
                    <ArrowRight className="ml-2" />
                  </button>
                </div>
    
                <ul className="space-y-4">
                  {reportesPaginados.map((reporte, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold">
                          {reporte.fecha}
                        </p>
                        <p>
                          <strong>Horario:</strong> {reporte.horario}
                        </p>
                        <p>
                          <strong>Rol:</strong> {reporte.rol}
                        </p>
                      </div>
                    {/*  onClick={() => consultarPaseo(reporte)}*/}
                      <button
                        onClick={() => consultarReporteDiario(reporte)}
                        className="flex items-center gap-2 bg-purple-300 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-400 transition"
                      >
                        <span className="text-lg">I</span>
                        Mas info
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
      };
    



    //Carga de la interfaz de perfil de usuario
    return (
      <div className="usuario-perfil flex flex-col items-center w-[90%] mx-auto">
        <div className="ficha-container flex flex-col md:flex-row items-center justify-center w-full max-w-6xl my-8">
          {/* Foto con ancho fijo y menor que el de info */}
          <div className="flex justify-center items-center w-full md:w-1/3 mb-4 md:mb-0">
            {buscaFoto()}
          </div>
          <div className="info text-gray-800 text-sm flex flex-col items-center w-full md:w-2/3">
            <div className="flex items-center justify-between w-full mb-2">
              <h1 className="titulo text-lg font-semibold text-center text-red-700">
                Info general <span className="nombre">{usuarioInformacion.nombre}</span>
              </h1>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition-colors ml-2"
                onClick={() => editarUsuario()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </button>
            </div>
            <div className="detalles w-full bg-gray-100 p-4 rounded-md">
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
                  <strong>Licencia PPP:</strong> {usuarioInformacion.licenciaPPP ? "Sí" : "No"}
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
        {/* Fila de tabs y calendario alineados al centro */}
        <div className="fila w-full flex flex-col lg:flex-row items-start justify-center">
          <div className="flex flex-col lg:flex-row w-full gap-6 items-start justify-center">
            {/* Tabs */}
            <div className="tabs-container border border-gray-300 rounded-md overflow-hidden mb-4 w-full max-w-4xl lg:w-2/3">
              {/* Columna para los tabs */}
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
                <button
                  className={`tab px-4 py-2 ${
                    activeTab === "reportes"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("reportes")}
                >
                  Reportes diarios
                </button>
                <button
                  className={`tab px-4 py-2 ${
                    activeTab === "animales"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("animales")}
                >
                  Animales cuidados
                </button>
              </div>
              {/* Contenido de las tabs */}
              <div className="tab-content mt-4">
                {activeTab === "roles" && (
                  <div>{user?.data.roles}</div>
                )}
                {activeTab === "reportes" && (
                  visualizaReportesDiarios()
                )}
                {activeTab === "animales" && (
                  visualizaAnimalesCuidados()
                )}
              </div>
            </div>
            {/* Calendario al lado de los tabs */}
            <div className="w-full lg:w-1/3 flex justify-center mb-4 lg:mb-0">
              <CalendarioDinamico reportesDiarios={reportesDiarios} />
            </div>
          </div>
        </div>
        {/* Modales */}
        <Modal isOpen={modals.consultar} onClose={() => gestionarModal("consultar", false)}>
          <ReporteDiarioConsultar reporte={reporteSeleccionado}/>
        </Modal>
        <Modal isOpen={modalsUsuario.editar} onClose={() => gestionarModalUsuario("editar", false)}>
          <EditarUsuario usuario={usuarioInformacion} onClose={() => gestionarModalUsuario("editar", false)}/>
        </Modal>
      </div>
    );
}
export default PerfilUsuario;