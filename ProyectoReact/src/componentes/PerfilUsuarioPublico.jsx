import "../estilos/estilos.css";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useAuth } from '../Login/AuthProvider';
import { use } from "react";
import ServicioUsuarios from "../servicios/servicioUsuarios";
import servicioReporteDiario from "../servicios/servicioReporteDiario";
import servicioPaseos from "../servicios/servicioPaseos.js";
import { ArrowLeft, ArrowRight } from "lucide-react";



const PerfilUsuarioPublico = () => {
  const { nombre_usuario } = useParams();
    const [activeTab, setActiveTab] = useState("roles");
    //No es el usuario que ha iniciado sesion, es el que se busca por nombre de usuario
    const { user, logout } = useAuth();// user?.data.usuario
    const [usuarioInformacion, setUsuarioInformacion] = useState({});
    const [reportesDiarios, setReportesDiarios] = useState([]);
    const [animales,setAnimales] = useState([]);
    //No pueden ser los mismos que el usuario que ha iniciado sesion
    const rolesUsuario = typeof user?.data.roles === 'string' ? user.data.roles.split(',').map(role => role.trim()) // Convertir a array y eliminar espacios
  : Array.isArray(user?.data.roles)? user.data.roles: [];
  //Variables para la paginacion de los reportes diarios
  const [paginaActual, setPaginaActual] = useState(0);
  const elementosPorPagina = 4;
    //Carga de datos del usuario
    useEffect(()=>{
        const idUsuario = user?.data.id;
        ServicioUsuarios.buscaPorNombre(nombre_usuario)
        .then((response) => {
            setUsuarioInformacion(response.data);
            cargaReportesDiarios(idUsuario);
        })
        .catch((error) => console.error("Error al obtener los datos del usuario:", error));
    }, [nombre_usuario])
    function buscaFoto(){
      const imagenPredeterminada = "../imagenes/imagenUsuario.jpg";
        if(usuarioInformacion.foto === null || usuarioInformacion.foto === undefined || usuarioInformacion.foto === ""){
            return (
                <div>
                    <img src="../imagenes/imagenUsuario.jpg" alt="Foto perfil usuario" />
                </div>);

        }else{
            return (<>{usuarioInformacion.foto ? (
                <div>
                    <img src={usuarioInformacion.foto || imagenPredeterminada} alt="Foto perfil usuario" onError={(e) => {
                    e.target.onerror = null; // Evitar bucles infinitos
                    e.target.src = imagenPredeterminada; // Mostrar la imagen predeterminada si ocurre un error
                }}/>
                </div>
              ) : (
                <p>Cargando imagen...</p>
              )}</>);
        }
        
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
                            <strong>Licencia PPP:</strong> {usuarioInformacion.licenciaPPP ? "Sí" : "No"}
                        </p>
                        <p>
                            <strong>Movil:</strong>{" "}
                            {usuarioInformacion.telefono}{" "}
                        </p>
                        <p>
                            <strong>Nombre de usuario:</strong> {usuarioInformacion.nombre_usuario}
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
                <div>{/* Columna para el calendario */}

                </div>
            </div> 
              
        </div>
    );
}
export default PerfilUsuarioPublico;