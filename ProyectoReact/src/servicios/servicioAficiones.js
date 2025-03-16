
import http from "./http-axios.js";

class ServicioAficiones {
  getAll() {
    return http.get("/aficiones");
  }

  get(id) {
    return http.get(`/aficiones/${id}`);
  }

  create(data) {
    return http.post("/aficiones", data);
  }

  update(id, data) {
    console.log(id,data)
    return http.put(`/aficiones/${id}`, data);
  }

  delete(id) {
    return http.delete(`/aficiones/${id}`);
  }
}

export default new ServicioAficiones();
