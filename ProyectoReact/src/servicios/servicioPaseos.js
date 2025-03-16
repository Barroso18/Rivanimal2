import http from "./http-axios.js";

class ServicioPaseos {
  getAll() {
    return http.get("/paseos");
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