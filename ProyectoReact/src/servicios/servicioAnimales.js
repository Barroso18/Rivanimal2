
import https from "./https-axios.js";
class ServicioAnimales {

  getAll() {
    let funcion= "animalestodos";
    return https.get(`/animales.php?funcion=${funcion}`);
  }
   buscaPorID(id) {
    const funcion = "animalporID";
    return https.post(`/animales.php?funcion=${funcion}`, { id });
   }
   buscaTratamientoPorAnimal(idanimal) {
    const funcion = "tratamientoPorAnimal";
    return https.post(`/animales.php?funcion=${funcion}`, { idanimal });
   }
   buscaUsuariosPorAnimal(id_animal){
      return https.post(`/animales.php?funcion=buscaUsuariosPorAnimal`, { id_animal });
   }
  buscaPorid_animal(id_animal) {
    return https.post(`/animales.php?funcion=buscaAnimalPorid_animal`, { id_animal });
  }
  buscaEstadoAnimal(id_animal) {
    return https.post(`/animales.php?funcion=buscaEstadoAnimal`, { id_animal });
  }
  async registro(datosRegistro) {
      return https.post(`/animales.php?funcion=agregaAnimal`, datosRegistro );
   }
   async actualiza(datosRegistro) {
      return https.post(`/animales.php?funcion=actualizaAnimal`, datosRegistro );
   }

  borraAnimalPorId(id_animal){
    return https.post(`/animales.php?funcion=borraPorId`, { id_animal });
  }
  
  async crearChenil(datosRegistro) {
    return https.post(`/animales.php?funcion=crearChenil`, {datosRegistro});
  }
  async asignarChenil(datosRegistro) {
    return https.post(`/animales.php?funcion=asignarChenil`, {datosRegistro});
  }
  async editarChenil(datosRegistro) {
    return https.post(`/animales.php?funcion=editarChenil`, {datosRegistro});
  }
  cargaRazasSugerencias(clase){
    return https.post(`/animales.php?funcion=cargaRazasSugerencias`, {clase});
  }
  buscaChenilAnimal(id_animal){
    return https.post(`/animales.php?funcion=buscaChenilAnimal`, {id_animal});
  }
  buscaChenilesLibres(){
    return https.post(`/animales.php?funcion=buscaChenilesLibres`);
  }
  buscaChenilPorNumero(numero){
    return https.post(`/animales.php?funcion=buscaChenilPorNumero`,{numero});
  }
}

export default new ServicioAnimales();
