import http from "./http-axios.js";
import https from "./https-axios.js";
class ServicioReporteGatos {
    getReportesPorAnimal(idanimal){
        return https.post(`/reporte_gato.php?funcion=buscarPorAnimal`, { idanimal });
    }
    getReportesGatosPorReporteDiario(idreporteDiario){
        return https.post(`/reporte_gato.php?funcion=buscarPorReporteDiario`, { idreporteDiario });
    }
    async registro(datosRegistro) {
      return https.post(`/reporte_gato.php?funcion=agregaReporteGato`, datosRegistro ,{
         headers: {
           'Content-Type': 'multipart/form-data',
         }});
   }
}

export default new ServicioReporteGatos();