export function  buscaTratamientoTipo(valor, informacion){
    // Filtrar los tratamientos que coincidan con el tipo especificado
    return informacion.filter(tratamiento => tratamiento.tipo.toLowerCase() === valor.toLowerCase());
    }