import http from "./http-axios.js";
import https from "./https-axios.js";
class ServicioPaseos {
  getAll() {
    //return http.get("/paseos");
    return http.get("/paseos.php?funcion=paseostodos");
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
  get(id) {
    return http.get(`/paseos/${id}`);
  }

  create(data) {
    return http.post("/paseos", data);
  }

  update(id, data) {
    return http.put(`/paseos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/paseos/${id}`);
  }
}

export default new ServicioPaseos();