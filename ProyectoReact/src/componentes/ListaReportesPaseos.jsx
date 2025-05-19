import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "./Modales/Modal.jsx";
import PaseoConsultar from "./Modales/PaseoConsultar.jsx";
import { calculaDuracion } from "../herramientas/calculaDuracion";
const ListaReportesPaseos = ({ reportes }) => {
    const [paginaActual, setPaginaActual] = useState(0);
    const elementosPorPagina = 4;
    const [reporteSeleccionado, setReporteSeleccionado] = useState(null); // Estado para almacenar el paseo seleccionado
    const [modalsPaseo, setModalsPaseo] = useState({
        crear: false,
        consultar: false,
        editar: false,
    });
    // Función para gestionar los modales de paseos
    const gestionarModalPaseo = (tipoModal, estadoAbierto) => {
        setModalsPaseo((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
    };
    const consultarPaseo = (reporte) => {
        setReporteSeleccionado(reporte); // Almacena el reporte seleccionado en el estado
        gestionarModalPaseo("consultar", true); // Abre el modal de consulta
    };
    if (reportes == null || reportes.length == 0) {
        return <p>No hay reportes registrados</p>;
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
                <button
                className="text-2xl"
                onClick={siguientePagina}
                disabled={paginaActual === totalPaginas - 1}>
                <ArrowLeft className="mr-2" />
                </button>

                <h2 className="text-xl font-semibold">Paseos</h2>

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
                        min <strong>Nivel cacas:</strong> {reporte.caca_nivel}
                    </p>
                    </div>

                    <button
                    onClick={() => consultarPaseo(reporte)}
                    className="flex items-center gap-2 bg-orange-300 text-black px-4 py-2 rounded-xl shadow-md hover:bg-orange-400 transition"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>

                    Mas info
                    </button>
                </li>
                ))}
            </ul>
            </div>
            <Modal isOpen={modalsPaseo.consultar}
                onClose={() => gestionarModalPaseo("consultar", false)}>
                <PaseoConsultar paseoInformacion={reporteSeleccionado}
                onClose={() => gestionarModalPaseo("consultar", false)}/>
            </Modal>
        </div>
        );
    }
};
export default ListaReportesPaseos;