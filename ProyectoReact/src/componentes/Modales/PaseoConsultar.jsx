import React, { useState,useEffect} from 'react';
import { useAuth } from '../../Login/AuthProvider';
import '../../estilos/estilos.css';
import { Link } from "react-router-dom";
import servicioReporteDiario from '../../servicios/servicioReporteDiario';
import servicioAnimales from '../../servicios/servicioAnimales';
import { calculaDuracion } from '../../herramientas/calculaDuracion';
import { use } from 'react';
const PaseoConsultar = ({paseoInformacion,onClose})=>{
    const duracion = calculaDuracion(paseoInformacion.fecha_hora_inicio, paseoInformacion.fecha_hora_fin);
    const [animalInformacion,setAnimalInformacion] = useState({});
    useEffect(() => {
        servicioAnimales.buscaPorid_animal(parseInt(paseoInformacion.animal))
            .then((response) => {  
                setAnimalInformacion(response.data);
            }).catch((error) => {
                console.error("Error en la solicitud:", error);
            });
    }, [paseoInformacion.animal]);
   
    return(
        <div>
            <div className="text-sm text-gray-700">
                <p className="font-semibold">
                  Paseo de <Link
                      to={`/pagina-animal/${animalInformacion.identificador}`}
                      className="text-black-500 hover:underline hover:text-orange-500 font-semibold"
                    >{animalInformacion.nombre}</Link>
                </p>
                <p>
                  <strong>Paseador:</strong><Link
                      to={`/perfil-publico/${paseoInformacion.nombre_usuario}`}
                      className="text-black-500 hover:underline hover:text-orange-500 font-semibold"
                    >
                      {paseoInformacion.nombre_usuario}
                    </Link>
                </p>
                <p>
                  <strong>Inicio:</strong> {paseoInformacion.fecha_hora_inicio} 
                </p>
                <p>
                  <strong>Fin:</strong> {paseoInformacion.fecha_hora_fin}   
                </p>
                <p>
                  <strong>Duración:</strong> {duracion} min 
                </p>
                <p>
                  <strong>Nivel cacas: </strong> {paseoInformacion.caca_nivel} 
                </p>
                <p>
                  <strong>Localizacion: </strong> {paseoInformacion.ubicaciones}
                </p>
                <p>
                    <strong>Descripcion:</strong> {paseoInformacion.descripcion}
                </p>
              </div>
        </div>
    );
};

export default PaseoConsultar;