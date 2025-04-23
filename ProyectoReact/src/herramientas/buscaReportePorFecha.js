export function  buscaReportePorFecha(valor, informacion){
    //console.log(informacion)
        return informacion.find(reporte => reporte.fecha.toLowerCase()===valor.toLowerCase()) || null;
    }