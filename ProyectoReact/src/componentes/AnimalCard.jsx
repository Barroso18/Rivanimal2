import { PlusCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import Modal from "./Modales/Modal.jsx";
import EditarAnimal from "./Modales/EditarAnimal.jsx";
import ServicioAnimales from "../servicios/servicioAnimales";
import { useEffect, useState, useRef } from "react";


const AnimalCard = ({ animal, onEdit, onDelete, onView  }) => {
  const [animalInformacion, setAnimalInformacion] = useState(animal);
  const [modalsAnimal,setModalsAnimal] = useState({
      crear: false,
      consultar: false,
      editar: false,
    });
  // Función para gestionar los modales de animal
  const gestionarModalAnimal = (tipoModal, estadoAbierto) => {
    setModalsAnimal((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
    recargaAnimal();
  };
  const editarAnimal = () =>{
    gestionarModalAnimal("editar",true);
  }
  const recargaAnimal = () => {
      if (!animalInformacion.id_animal) return;
      ServicioAnimales.buscaPorid_animal(parseInt(animalInformacion.id_animal))
        .then((response) => {
          setAnimalInformacion(
            response.data
          );
        })
        .catch((error) => {
          console.error("Error al obtener el animal:", error);
        });
    };

  return (
    <li className="flex flex-col sm:flex-row items-center sm:items-start justify-between p-4 bg-white rounded-lg shadow-md border mb-4">
      {/* Información principal */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{animal.id_animal} {animal.nombre} ({animal.clase})</h3>
        <p className="text-sm text-gray-600 mt-1">Nivel: {animal.nivel}, raza: {animal.raza}, identificador: {animal.identificador}</p>
      </div>

      {/* Botones */}
      <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
        >
          <Link to={`/pagina-animal/${animal.id_animal}`} className="flex items-center gap-1">
            Ver
          </Link>
        </button>
        <button
          onClick={() => editarAnimal()}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
      <Modal isOpen={modalsAnimal.editar}
        onClose={() => gestionarModalAnimal("editar", false)}>
        <EditarAnimal animal={animalInformacion}
        onClose={()=>gestionarModalAnimal("editar",false)}/>
      </Modal>
    </li>
    
    


  );
};
{/*
    <div className="flex flex-col sm:flex-row items-center sm:items-start p-4 bg-white rounded-xl shadow-sm border w-full">
      
      <div className="flex-shrink-0 w-24 h-24 sm:w-20 sm:h-20 bg-gray-200 rounded-md flex items-center justify-center">
        <img
          src={animal.foto || '../imagenes/imagenUsuario.jpg'}
          alt="User Avatar"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      
      <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col justify-between text-center sm:text-left">
        <h3 className="text-base font-semibold leading-tight">
          {animal.nombre} {usuario.apellido1} {usuario.apellido2}
        </h3>

        
        <div className="flex flex-wrap gap-2 mt-2">
          {usuario.roles.split(',').map((rol, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {rol.trim()}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-700 mt-2">
          Licencia PPP: <span className="font-medium">{usuario.licenciaPPP ? 'sí' : 'no'}</span>
        </p>
        <p className="text-sm text-gray-500">Nombre usuario: {usuario.nombre_usuario}</p>
        
        <Link
          to={`/perfil-publico/${usuario.nombre_usuario}`}
          className="mt-2 inline-flex items-center text-blue-600 text-sm hover:underline"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          VER PERFIL
        </Link>
      </div>
    </div>
    */}
export default AnimalCard;