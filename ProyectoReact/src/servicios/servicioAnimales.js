
import http from "./http-axios.js";
import https from "./https-axios.js";
class ServicioAnimales {
  buscaPorNombre(animal){
    return http.get(`/animales?nombre=${animal}`);
 }
  getAll() {
    let funcion= "animalestodos";
   /*
    try{
      const response = await https.get(`/animales.php?funcion=${funcion}`);
      return response.data;
    } catch (error) {
      console.error("Error en enviarNombre:", error);
      throw error;
    }*/
    /*https.post("animales.php", { funcion })
      .then((response) => response.data)
      .catch((error) => console.error("Error al obtener los animales:", error));*/
    return https.get(`/animales.php?funcion=${funcion}`);
  }
  /*
  async buscaPorID(id) {
    try {
      const funcion = "animalporID";
      const response = await https.post(`/animales.php?funcion=${funcion}`, {
        id: id,
      });
      console.log("response.data: "+response.data);
      return response.data;
    } catch (error) {
      console.error("Error al buscar animal por ID:", error);
      throw error;
    }
  }
    */
   buscaPorID(id) {
    const funcion = "animalporID";
    return https.post(`/animales.php?funcion=${funcion}`, { id });
   }
   buscaTratamientoPorAnimal(idanimal) {
    const funcion = "tratamientoPorAnimal";
    return https.post(`/animales.php?funcion=${funcion}`, { idanimal });
   }
  buscaPorid_animal(id_animal) {
    return https.post(`/animales.php?funcion=buscaAnimalPorid_animal`, { id_animal });
  }
  buscaEstadoAnimal(id_animal) {
    return https.post(`/animales.php?funcion=buscaEstadoAnimal`, { id_animal });
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
