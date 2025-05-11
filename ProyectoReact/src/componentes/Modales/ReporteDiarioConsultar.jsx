import "../../estilos/estilos.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import servicioPaseos from "../../servicios/servicioPaseos.js";
import ServicioReporteGatos from "../../servicios/servicioReporteGatos.js";
import ListaReportesGatos from "../ListaReportesGatos.jsx";
import ListaReportesPaseos from "../ListaReportesPaseos.jsx";

function ReporteDiarioConsultar({ reporte, onClose }) {
  console.log("Reporte diario:", reporte);
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
        console.log("Paseos del reporte diario:", response.data);
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
      <button>Borrar</button>
      <button>Editar</button>
    </div>
  );
}

export default ReporteDiarioConsultar;