import "../estilos/estilos.css";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useAuth } from '../Login/AuthProvider';
import ServicioUsuarios from "../servicios/servicioUsuarios";
import servicioReporteDiario from "../servicios/servicioReporteDiario";
import servicioPaseos from "../servicios/servicioPaseos.js";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CalendarioDinamico from "./CalendarioDinamico.jsx";

const PerfilUsuarioPublico = () => {
  const { nombre_usuario } = useParams();
  const [activeTab, setActiveTab] = useState("roles");
  const { user } = useAuth();
  const [usuarioInformacion, setUsuarioInformacion] = useState({});
  const [reportesDiarios, setReportesDiarios] = useState([]);
  const [animales, setAnimales] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const elementosPorPagina = 4;

  useEffect(() => {
    ServicioUsuarios.buscaPorNombre(nombre_usuario)
      .then((response) => {
        setUsuarioInformacion(response.data);
        cargaReportesDiarios(response.data.id_usuario);
      })
      .catch((error) => console.error("Error al obtener los datos del usuario:", error));
  }, [nombre_usuario]);

  function buscaFoto() {
    const imagenPredeterminada = "../imagenes/imagenUsuario.jpg";
    if (!usuarioInformacion.foto) {
      return (
        <div className="foto flex justify-center items-center w-full md:w-auto mb-4 md:mb-0">
          <img src={imagenPredeterminada} alt="Foto perfil usuario" />
        </div>
      );
    } else {
      return (
        <div className="foto flex justify-center items-center w-full md:w-auto mb-4 md:mb-0">
          <img
            src={usuarioInformacion.foto || imagenPredeterminada}
            alt="Foto perfil usuario"
            onError={e => {
              e.target.onerror = null;
              e.target.src = imagenPredeterminada;
            }}
          />
        </div>
      );
    }
  }

  async function cargaAnimalesCuidados(idUsuario) {
    await servicioPaseos.buscaAnimalPorUsuario(idUsuario)
      .then((response) => {
        setAnimales(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar animales cuidados:", error);
      });
  }

  useEffect(() => {
    if (activeTab === "animales" && usuarioInformacion.id_usuario) {
      cargaAnimalesCuidados(usuarioInformacion.id_usuario);
    }
  }, [activeTab, usuarioInformacion.id_usuario]);

  const visualizaAnimalesCuidados = () => {
    if (!animales || animales.length === 0) {
      return <p className="p-2">No hay animales cuidados.</p>;
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
      <div className="usuario-perfil flex flex-col items-center w-[90%] mx-auto">
          <div className="ficha-container flex flex-col md:flex-row items-center justify-center w-full max-w-6xl my-8">
              <div className="flex justify-center items-center w-full md:w-1/3 mb-4 md:mb-0">
                {/* Verificación condicional para evitar errores */}
                {buscaFoto()}
                
              </div>
              <div className="info text-gray-800 text-sm">
                  <h1 className="titulo text-lg font-semibold mb-2">
                  Info general <span className="nombre">{usuarioInformacion.nombre}</span>
                  </h1>
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
                  </div>
              </div>
          </div>
          <div className="fila w-full flex flex-col lg:flex-row items-start justify-center">
            <div className="flex flex-col lg:flex-row w-full gap-6 items-start justify-center">
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
                        <div className="flex flex-wrap gap-2 p-4">
                          {(usuarioInformacion.roles && Array.isArray(usuarioInformacion.roles)
                            ? usuarioInformacion.roles
                            : typeof usuarioInformacion.roles === "string"
                              ? usuarioInformacion.roles.split(",").map(r => r.trim())
                              : []
                          ).map((rol, idx) => (
                            <span
                              key={idx}
                              className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded"
                            >
                              {rol}
                            </span>
                          ))}
                        </div>
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
                  <CalendarioDinamico
                    reportesDiarios={reportesDiarios}
                    usuarioActual={user}
                    usuarioPerfil={usuarioInformacion}
                    onRecargarReportes={() => cargaReportesDiarios(usuarioInformacion.id_usuario)}
                  />
              </div>
            </div>
          </div> 
            
      </div>
  );
}
export default PerfilUsuarioPublico;