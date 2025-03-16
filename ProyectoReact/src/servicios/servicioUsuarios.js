
import http from "./http-axios.js";

class ServicioUsuario {
  login(usuario,pass) {
      //return http.get(`/usuarios?nombre=${usuario}&pass=${pass}`);
      return http.get(`/usuarios?nombre=${usuario}`);
      //http://localhost:3000/usuarios?nombre=agustin&pass=123
   }
   buscaPorNombre(usuario){
      return http.get(`/usuarios?nombre=${usuario}`);
   }
   getAll() {
      return http.get("/usuarios");
    }
}

export default new ServicioUsuario();