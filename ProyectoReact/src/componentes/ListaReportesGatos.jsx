import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { calculaDuracion } from "../herramientas/calculaDuracion";
import Modal from "./Modales/Modal.jsx";
import ReporteGatoConsultar from "./Modales/ReporteGatoConsultar.jsx";
const ListaReportesGatos = ({ reportes }) => {
    const [paginaActual, setPaginaActual] = useState(0);
      const elementosPorPagina = 4;
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null); // Estado para almacenar el paseo seleccionado
        const [modalsGato, setModalsGato] = useState({
            crear: false,
            consultar: false,
            editar: false,
        });
        // Función para gestionar los modales de paseos
        const gestionarModalGato = (tipoModal, estadoAbierto) => {
            setModalsGato((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
        };
        const consultarReporteGato = (reporte) => {
            setReporteSeleccionado(reporte); // Almacena el reporte seleccionado en el estado
            gestionarModalGato("consultar", true); // Abre el modal de consulta
        };
    if (reportes == null || reportes.length == 0) {
      return <p className="p-4">No hay reportes registrados</p>;
    } else {
      const totalPaginas = Math.ceil(reportes.length / elementosPorPagina);

      const reportesPaginados = reportes.slice(
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
              <button className="text-2xl"
                onClick={siguientePagina}
                disabled={paginaActual === totalPaginas - 1}>
                <ArrowLeft className="mr-2" />
              </button>

              <h2 className="text-xl font-semibold">Reportes Gatos</h2>

              <button className="text-2xl"
                onClick={anteriorPagina}
                disabled={paginaActual === 0}>
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
                        {reporte.nombre_animal} y {reporte.nombre_usuario}
                    </p>
                    <p>
                        <strong>Hora:</strong> {reporte.fecha_hora_fin}
                    </p>
                    <p>
                      <strong>Duración:</strong>{" "}
                      {calculaDuracion(
                        reporte.fecha_hora_inicio,
                        reporte.fecha_hora_fin
                      )}{" "}
                      min <strong>Cacas:</strong> {reporte.caca_nivel}
                    </p>
                  </div>

                  <button
                    onClick={() => consultarReporteGato(reporte)}
                    className="flex items-center gap-2 bg-purple-300 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-400 transition"
                  >
                    <span className="text-lg">I</span>
                    Mas info
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Modal isOpen={modalsGato.consultar}
                onClose={() => gestionarModalGato("consultar", false)}>
                <ReporteGatoConsultar repGatoInformacion={reporteSeleccionado}
                onClose={() => gestionarModalGato("consultar", false)}/>
            </Modal>
        </div>
      );
    }
};
export default ListaReportesGatos;