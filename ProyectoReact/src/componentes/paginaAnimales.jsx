//import "../estilos/paginaAnimales.css";
import "../estilos/estilos.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ServicioAnimales from "../servicios/servicioAnimales";
import Swal from 'sweetalert2';
import FiltroAnimales from "./FiltroAnimales";
const PaginaAnimales = () => {
  const [errores, setErrores] = useState({});
  const [animales, setAnimales] = useState([]);
  const [animalesFiltrado, setAnimalesFiltrado] = useState([]);
  const [filtros, setFiltros] = useState({
    animal: '',
    nivel: '',
    clase: '',
    estado: ''
  });

  useEffect(() => {
    ServicioAnimales.getAll()
      .then(response => {
        setAnimales(response.data);
        setAnimalesFiltrado(response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar los animales :(" + error,
          icon: "question"
        });
      });
  }, []);

  // Filtrado en tiempo real usando los filtros del componente externo
  useEffect(() => {
    let filtrados = animales;

    if (filtros.animal.trim() !== '') {
      filtrados = filtrados.filter(animal =>
        animal.nombre.toLowerCase().includes(filtros.animal.toLowerCase())
      );
    }
    if (filtros.nivel !== undefined && filtros.nivel !== '' && !isNaN(filtros.nivel)) {
      filtrados = filtrados.filter(animal =>
        String(animal.nivel) === String(filtros.nivel)
      );
    }
    if (filtros.clase) {
      filtrados = filtrados.filter(animal =>
        animal.clase && animal.clase.toLowerCase() === filtros.clase.toLowerCase()
      );
    }
    if (filtros.estado) {
      filtrados = filtrados.filter(animal =>
        animal.situacion && animal.situacion.toLowerCase() === filtros.estado.toLowerCase()
      );
    }
    setAnimalesFiltrado(filtrados);
  }, [filtros, animales]);

  // Recibe los filtros desde el componente externo
  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };


  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <FiltroAnimales filtros={filtros} onFiltrosChange={handleFiltrosChange} errores={errores} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {animalesFiltrado.map((animal, indice) => (
            <div key={indice} className="text-center">
              <img src={animal.foto} alt={`imagen ${animal.nombre}`} className="rounded-md w-40 h-40 object-cover mx-auto" />
              <h3 className="font-bold mt-2">{animal.nombre}</h3>
              <p className="text-gray-600">{animal.raza}</p>
              <p className="text-gray-500">Estado: {animal.situacion}</p>
              <p className="text-gray-500">Nivel: {animal.nivel}</p>
              <Link to={`/pagina-animal/${animal.id_animal}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600">
                  Mas info
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PaginaAnimales;