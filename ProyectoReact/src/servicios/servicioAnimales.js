
import http from "./http-axios.js";

class ServicioAnimales {
  buscaPorNombre(animal){
    return http.get(`/animales?nombre=${animal}`);
 }
  getAll() {
    return http.get("/animales");
  }

  get(id) {
    return http.get(`/animales/${id}`);
  }

  create(data) {
    return http.post("/animales", data);
  }

  update(id, data) {
    return http.put(`/animales/${id}`, data);
  }

  delete(id) {
    return http.delete(`/animales/${id}`);
  }
}

export default new ServicioAnimales();
