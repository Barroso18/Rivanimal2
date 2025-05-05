import "../../estilos/estilos.css";
import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
function ReporteDiarioConsultar({reporte,onClose}){
    console.log("Reporte diario:",reporte);
    //Seccion de paseos
    //Seccion de tareas
    //Seccion de gatos
    return(
        <div>
            {reporte.usuario ? (
                <div className="reporte-diario">
                    <h2>
                        Reporte diario de  <Link to={`/perfil-publico/${reporte.nombre_usuario}`} 
                                            className="text-black-500 hover:underline hover:text-orange-500 font-semibold">
                                                {reporte.nombre_usuario}
                                            </Link>
                    </h2>
                    <p>Fecha: {reporte.fecha}</p>
                    <p>Horario: {reporte.horario}</p>
                    <p>Rol: {reporte.rol}</p>
                    <h3>Paseos</h3>
                    <ul>
                        {/*reporte.paseos.map((paseo, index) => (
                            <li key={index}>{paseo.descripcion}</li>
                        ))*/}
                    </ul>
                    <h3>Tareas</h3>
                    <ul>
                        {/*reporte.tareas.map((tarea, index) => (
                            <li key={index}>{tarea.descripcion}</li>
                        ))*/}
                    </ul>
                    <h3>Gatos</h3>
                    <ul>
                        {/*reporte.gatos.map((gato, index) => (
                            <li key={index}>{gato.nombre}</li>
                        ))*/}
                    </ul>
                </div>
            ) : (
                <p>Cargando reporte diario...</p>
            )}
        </div>
    );
}
export default ReporteDiarioConsultar;