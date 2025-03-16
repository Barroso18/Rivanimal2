import "../estilos/paginaAnimal.css";
import { useState } from 'react';
import { useParams } from "react-router-dom"
//import { buscarProducto,incrementarCantidad,decrementarCantidad } from "../herramientas/buscarProducto";
import {buscarAnimal} from "../herramientas/buscaAnimal";
import {Link} from "react-router-dom";


const PaginaAnimal = ({animales,setAnimales}) => {
  //Aqui se mete el codigo JS, en el return solo lo que va a renderizar
  //console.log(productosJson)
  const {nombre} = useParams()

  let animalInformacion = buscarAnimal(nombre, animales);
  

/*
<div className="DetalleCarrito">
      
          <h1>{animalInformacion.nombre}</h1>
          <img src={animalInformacion.url} alt={`imagen ${animalInformacion.nombre}`} />
       
    </div>
*/

  return (
    <div className="animal">
    <div className="ficha-container">
        <div className="foto">
            <img src={animalInformacion.url} alt="Perro en adopción"/>
        </div>
        <div className="info">
            <h1 className="titulo">Ficha de <span className="nombre">{animalInformacion.nombre}</span></h1>
            <span className="adopcion"><i>💚 En adopción</i></span>

            <div className="detalles">
                <p><strong>Nombre:</strong> {animalInformacion.nombre} <strong>Clase:</strong> {animalInformacion.clase}</p>
                <p><strong>Sexo:</strong> {animalInformacion.sexo}</p>
                <p><strong>Desde:</strong> {animalInformacion.fecha_ingreso} </p>
                <p><strong>Fecha de nacimiento:</strong> {animalInformacion.fecha_nacimiento} </p>
                <p><strong>Raza:</strong> {animalInformacion.raza}</p>
                <p><strong>Tamaño:</strong> {animalInformacion.tamaño} <strong>Peso:</strong> {animalInformacion.peso} Kg</p>
                <p><strong>Situación:</strong> {animalInformacion.situacion}</p>
                <p><strong>Comportamiento:</strong> {animalInformacion.comportamiento}</p>
            </div>
        </div>
    </div>
    </div>
  );
}

export default PaginaAnimal;