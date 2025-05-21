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
                <ListaReportesPaseos reportes={paseos} />
              </div>
            )}
            {activeTab === "gatos" && <ListaReportesGatos reportes={repGatos} />}
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
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          className="relative bg-orange-400 hover:bg-orange-600 text-white flex flex-row items-center gap-2 px-4 py-2 rounded-md text-sm group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
            Editar reporte
          </span>
        </button>
        <button
          type="button"
          className="relative bg-red-500 hover:bg-red-600 text-white flex flex-row items-center gap-2 px-4 py-2 rounded-md text-sm group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
            Eliminar reporte
          </span>
        </button>
      </div>
    </div>
  );
}

export default ReporteDiarioConsultar;