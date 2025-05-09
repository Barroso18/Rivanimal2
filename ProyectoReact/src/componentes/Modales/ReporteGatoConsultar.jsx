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
            </div>
        );
}
export default ReporteGatoConsultar;