import React, { useState,useEffect} from 'react';
import { useAuth } from '../../Login/AuthProvider';
import '../../estilos/estilos.css';
import servicioReporteDiario from '../../servicios/servicioReporteDiario';
import servicioAnimales from '../../servicios/servicioAnimales';
import { calculaDuracion } from '../../herramientas/calculaDuracion';
import { use } from 'react';
function ReporteGatoConsultar({ repGatoInformacion, onClose }) {
    console.log("Reporte gato:", repGatoInformacion);
    const duracion = calculaDuracion(repGatoInformacion.fecha_hora_inicio, repGatoInformacion.fecha_hora_fin);
        const [animalInformacion,setAnimalInformacion] = useState({});
        useEffect(() => {
            servicioAnimales.buscaPorid_animal(parseInt(repGatoInformacion.gato))
                .then((response) => {  
                    setAnimalInformacion(response.data);
                }).catch((error) => {
                    console.error("Error en la solicitud:", error);
                });
        }, [repGatoInformacion.gato]);
       
        return(
          <div>
            <div className="text-sm text-gray-700">
                <p className="font-semibold">
                  Paseo de {animalInformacion.nombre}
                </p>
                <p>
                  <strong>Paseador:</strong> {repGatoInformacion.nombre_usuario}{/* Aqui ira un link al perfil de usuario publico */}
                </p>
                <p>
                  <strong>Inicio:</strong> {repGatoInformacion.fecha_hora_inicio} 
                </p>
                <p>
                  <strong>Fin:</strong> {repGatoInformacion.fecha_hora_fin}   
                </p>
                <p>
                  <strong>Duración:</strong> {duracion} min 
                </p>
                <p>
                  <strong>cacas: </strong> {repGatoInformacion.caca_nivel} 
                </p>
                <p>
                    <strong>Descripcion:</strong> {repGatoInformacion.descripcion}
                </p>
            </div>
            {/* Botones editar y borrar */}
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
                  Editar paseo
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
                  Eliminar paseo
                </span>
              </button>
            </div>
          </div>
        );
}
export default ReporteGatoConsultar;