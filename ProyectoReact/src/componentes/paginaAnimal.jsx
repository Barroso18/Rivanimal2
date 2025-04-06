import "../estilos/paginaAnimal.css";
import { useState } from 'react';
import { useParams } from "react-router-dom"
import {buscarAnimal} from "../herramientas/buscaAnimal";
import {Link} from "react-router-dom";


const PaginaAnimal = ({animales,setAnimales}) => {
  const [activeTab, setActiveTab] = useState("salud"); // Estado para controlar la pestaña activa
  const {nombre} = useParams()
//esto hay que cambiarlo por la busqueda en BBDD
  let animalInformacion = buscarAnimal(nombre, animales);
  


  return (
    <div className="animal">
    <div className="ficha-container">
        <div className="foto">
            <img src={animalInformacion.foto} alt="Perro en adopción"/>
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
    <div className="tabs-container">
          {/* Tabs */}
          <div className="tabs flex border-b border-gray-300">
            <button
              className={`tab px-4 py-2 ${
                activeTab === "salud" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("salud")}
            >
              Salud
            </button>
            <button
              className={`tab px-4 py-2 ${
                activeTab === "higiene" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("higiene")}
            >
              Higiene
            </button>
            <button
              className={`tab px-4 py-2 ${
                activeTab === "paseos" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("paseos")}
            >
              Paseos
            </button>
            <button
              className={`tab px-4 py-2 ${
                activeTab === "alimentacion" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("alimentacion")}
            >
              Alimentacion
            </button>
            <button
              className={`tab px-4 py-2 ${
                activeTab === "socializacion" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("socializacion")}
            >
              Socialización
            </button>
            <button
              className={`tab px-4 py-2 ${
                activeTab === "otros" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("otros")}
            >
              Otros
            </button>
          </div>
          {/* Contenido de las tabs */}
          <div className="tab-content mt-4">
            {activeTab === "salud" && (
              <div>
                Informacion de la salud del animal.
                
              </div>
            )}

            {activeTab === "higiene" && (
              <div className="higiene">
                Informacion de la higiene del animal.
              </div>
            )}

            {activeTab === "paseos" && (
              <div>
                Paseos del animal.Aqui ira la lista de paseos que se le han dado al animal.
              </div>
            )}

            {activeTab === "alimentacion" && (
              <div>
                Alimentacion del animal.
              </div>
            )}
            {activeTab === "socializacion" && (
              <div>
                Socializacion con personas y otros animales.
              </div>
            )}
            {activeTab === "otros" && (
              <div>
                otros datos del animal.
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default PaginaAnimal;