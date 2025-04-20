
import http from "./http-axios.js";
import https from "./https-axios.js";
class ServicioUsuario {
  /*login(usuario,pass) {
      //return http.get(`/usuarios?nombre=${usuario}&pass=${pass}`);
      return http.get(`/usuarios?nombre=${usuario}`);
      //http://localhost:3000/usuarios?nombre=agustin&pass=123
   }*/
   async login(datosLogin) {
      return https.post(`/login.php`, { datosLogin });
   }
   async registro(datosRegistro) {
      return https.post(`/registro.php`, datosRegistro ,{
         headers: {
           'Content-Type': 'multipart/form-data',
         }});
   }
   buscaPorNombre(usuario){
      return https.post(`/usuarios.php?funcion=buscaPorNombre`, { usuario });
   }
   getAll() {
      return http.get("/usuarios");
    }
    buscaPorId(idusuario){
      return https.post(`/usuarios.php?funcion=buscaPorId`, { idusuario });
   }
   buscaPorIdCompleto(idusuario){
      return https.post(`/usuarios.php?funcion=buscaPorIdCompleto`, { idusuario });
   }

}

export default new ServicioUsuario();