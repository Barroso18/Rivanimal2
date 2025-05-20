import "../../estilos/estilos.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import servicioPaseos from "../../servicios/servicioPaseos.js";
import ServicioReporteGatos from "../../servicios/servicioReporteGatos.js";
import ListaReportesGatos from "../ListaReportesGatos.jsx";
import ListaReportesPaseos from "../ListaReportesPaseos.jsx";

function ReporteDiarioConsultar({ reporte, onClose }) {
  //console.log("Reporte diario:", reporte);
  const [activeTab, setActiveTab] = useState("paseos");
  const [paseos, setPaseos] = useState([]);
  const [repGatos, setRepGatos] = useState([]);
  const [tareas, setTareas] = useState([]);

  // Cargar datos según la pestaña activa
  useEffect(() => {
    if (activeTab === "paseos") {
      cargaPaseos();
    } else if (activeTab === "gatos") {
      cargaRepGatos();
    } else if (activeTab === "tareas") {
      cargaTareas();
    }
  }, [activeTab]);

  // Sección de paseos
  function cargaPaseos() {
    servicioPaseos
      .getPaseosPorReporteDiario(reporte.id_reporte_diario)
      .then((response) => {
        //console.log("Paseos del reporte diario:", response.data);
        setPaseos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los paseos:", error);
      });
  }

  // Sección de tareas
  function cargaTareas() {
    // Aquí puedes implementar la lógica para cargar las tareas
    console.log("Cargando tareas...");
    setTareas([
      { id: 1, descripcion: "Tarea 1" },
      { id: 2, descripcion: "Tarea 2" },
    ]);
  }

  // Sección de gatos
  function cargaRepGatos() {
    console.log("reporte.id", reporte.id_reporte_diario);
    ServicioReporteGatos.getReportesGatosPorReporteDiario(
      reporte.id_reporte_diario
    )
      .then((response) => {
        console.log("Reportes de gatos del reporte diario:", response.data);
        setRepGatos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los reportes de gatos:", error);
      });
  }

  return (
    <div>
      {reporte.usuario ? (
        <div className="reporte-diario">
          <h2>
            Reporte diario de{" "}
            <Link
              to={`/perfil-publico/${reporte.nombre_usuario}`}
              className="text-black-500 hover:underline hover:text-orange-500 font-semibold"
            >
              {reporte.nombre_usuario}
            </Link>
          </h2>
          <p>Fecha: {reporte.fecha}</p>
          <p>Horario: {reporte.horario}</p>
          <p>Rol: {reporte.rol}</p>
          <div className="tabs border-b border-gray-300">
            <button
              className={`tab px-4 py-2 ${
                activeTab === "paseos"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("paseos")}
            >
              Paseos
            </button>
            <button
              className={`tab px-4 py-2 ${
                activeTab === "gatos"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("gatos")}
            >
              Gatos
            </button>
            <button
              className={`tab px-4 py-2 ${
                activeTab === "tareas"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("tareas")}
            >
              Tareas
            </button>
          </div>

          {/* Contenido de las tabs */}
          <div className="tab-content mt-4">
            {activeTab === "paseos" && (
              <div>
                <ListaReportesPaseos reportes={paseos}/>
              </div>
            )}
            {activeTab === "gatos" && (
              
                
                <ListaReportesGatos reportes={repGatos} />
              
            )}
            {activeTab === "tareas" && (
              <div>
                <ul>
                  {tareas.map((tarea) => (
                    <li key={tarea.id}>{tarea.descripcion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Cargando reporte diario...</p>
      )}
      {/* Solo si eres admin o el usuario que lo creo */}
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
        </svg>
      </button>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
        </svg>
      </button>
      
    </div>
  );
}

export default ReporteDiarioConsultar;