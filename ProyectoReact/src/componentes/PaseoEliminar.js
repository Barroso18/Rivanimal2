import React, {useEffect,useState} from "react";
import Swal from "sweetalert2";
import servicioAnimales from "../servicios/servicioAnimales";
import ServicioPaseos from '../servicios/servicioPaseos';

const PaseoEliminar = (paseo, paseos, setPaseos) => {
 
Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
        ServicioPaseos.delete(paseo.id)
        .then(() => {
          Swal.fire("Afición borrada correctamente");
          const nuevosPaseos = paseos.filter((a) => a.id !== paseo.id);
          setPaseos(nuevosPaseos);
          Swal.fire(
            "¡Eliminado!",
            "El elemento ha sido eliminado.",
            "success"
          );
        })
        .catch(() => {
          Swal.fire("ERROR, No se ha borrado la afición");
        });           
    }
  });
};

export default PaseoEliminar;