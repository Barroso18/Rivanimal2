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
    buscaReportesDiariosSemana(datosRegistro){
        return https.post(`/calendario.php`, datosRegistro, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    borraReporteDiarioPorId(idReporteDiario){
        return https.post(`/reporte_diario.php?funcion=borraPorId`, {idReporteDiario});
    }
}
export default new ServicioReporteDiario();