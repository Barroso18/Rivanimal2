export function  buscarAnimal(nombre, informacion){
//console.log(informacion)
    return informacion.find(animal => animal.nombre.toLowerCase()===nombre.toLowerCase()) || null;
}