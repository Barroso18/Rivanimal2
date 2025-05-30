import http from "./http-axios.js";
import https from "./https-axios.js";
class ServicioPaseos {
  getAll() {
    //return http.get("/paseos");
    return https.get("/paseos.php?funcion=paseostodos");
  }
  getPaseosPorAnimal(idanimal) {
    return https.post(`/paseos.php?funcion=paseosporanimal`, { idanimal });
  }
  getPaseosPorReporteDiario(idReporte) {
    return https.post(`/paseos.php?funcion=paseosporreportediario`, { idReporte });
    //return https.post(`/paseos.php?funcion=paseosporanimal`, { idanimal });
  }
  async buscaAnimalPorUsuario(usuario){
    return https.post(`/paseos.php?funcion=buscaAnimalPorUsuario`, { usuario });
  }
  async registro(datosRegistro) {
      return https.post(`/paseos.php?funcion=agregaPaseo`, datosRegistro ,{
         headers: {
           'Content-Type': 'multipart/form-data',
         }});
   }
   borraPaseoPorId(idPaseo){
    return https.post(`/paseos.php?funcion=borraPaseoPorId`, {idPaseo});
   }

}

export default new ServicioPaseos();