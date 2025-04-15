export function  buscaTratamientoTipo(valor, informacion){
    //console.log(informacion)
        return informacion.find(tratamiento => tratamiento.tipo.toLowerCase()===valor.toLowerCase()) || null;
    }