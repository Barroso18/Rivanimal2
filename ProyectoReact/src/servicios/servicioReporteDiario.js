import http from "./http-axios.js";
import https from "./https-axios.js";

class ServicioReporteDiario {
    async creaReporte(datosReporte) {
        return https.post(`/reporte_diario.php?funcion=registrar`, { datosReporte });
    }
    buscartodosReportesDiarios(){
        return https.post(`/reporte_diario.php?funcion=buscarTodos`);
    }
    buscarReportesDiariosPorUsuario(idusuario){
        return https.post(`/reporte_diario.php?funcion=buscarPorUsuario`, { idusuario });
    }
}
export default new ServicioReporteDiario();