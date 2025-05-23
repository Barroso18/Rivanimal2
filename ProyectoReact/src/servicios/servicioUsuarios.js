
import http from "./http-axios.js";
import https from "./https-axios.js";
class ServicioUsuario {

   async login(datosLogin) {
      return https.post(`/login.php`, { datosLogin });
   }
   async registro(datosRegistro) {
      return https.post(`/registro.php`, datosRegistro ,{
         headers: {
           'Content-Type': 'multipart/form-data',
         }});
   }
   async actualiza(datosRegistro) {
      return https.post(`/usuarios.php?funcion=actualiza`, datosRegistro ,{
         headers: {
           'Content-Type': 'multipart/form-data',
         }});
   }
   buscaPorNombre(usuario){
      return https.post(`/usuarios.php?funcion=buscaPorNombre`, { usuario });
   }
    buscaPorId(idusuario){
      return https.post(`/usuarios.php?funcion=buscaPorId`, { idusuario });
   }
   buscaPorIdCompleto(idusuario){
      return https.post(`/usuarios.php?funcion=buscaPorIdCompleto`, { idusuario });
   }
   buscaTodosUsuarios(){
      return https.post(`/usuarios.php?funcion=buscaTodos`);
   }
   borraUsuarioPorId(idusuario){
      return https.post(`/usuarios.php?funcion=borraPorId`,{idusuario});
   }
}

export default new ServicioUsuario();