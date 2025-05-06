import http from "./http-axios.js";
import https from "./https-axios.js";
class ServicioReporteGatos {
    getReportesPorAnimal(idanimal){
        return https.post(`/reporte_gatos.php?funcion=buscarPorAnimal`, { idanimal });
    }
}

export default new ServicioReporteGatos();