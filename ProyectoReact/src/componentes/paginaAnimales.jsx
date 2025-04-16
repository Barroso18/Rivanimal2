//import "../estilos/paginaAnimales.css";
import "../estilos/estilos.css";
import { useState,useEffect, React } from 'react';
import {buscarAnimal} from "../herramientas/buscaAnimal";
import ServicioAnimales from "../servicios/servicioAnimales";
import LocalStorageServicio from "../servicios/LocalStorageServicio";
import {Link} from "react-router-dom";
import Modal from "./Modales/Modal.jsx";
import PaseoCrear from "./Modales/PaseoCrear.jsx";
import { useAuth } from '../Login/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const PaginaAnimales = () => {
  // errores Almacena los errores del formulario
  const [errores,setErrores] = useState({});
  const { user, logout } = useAuth();
  const [animales,setAnimales] = useState([]);
  const [animalesFiltrado,setAnimalesFiltrado] = useState([]);
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
   const [tipoSeleccionado, setTipoSeleccionado] = useState("");
   const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  // Creamos un usuario de forma temporal
  const usuario = user.data.usuario ;
  useEffect(() => {
    ServicioAnimales.getAll()
      .then(response => {
        //console.log("Animales: ",response.data);
        setAnimales(response.data);
        setAnimalesFiltrado(response.data); 
      })
      .catch((error) => {
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar los animales :("+error,
          icon: "question"
        });
      });
  }, []);
  
  
//console.log("Usuario: ",user);
  const [modals, setModals] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });
  const [form,setForm] = useState({
      animal:'',
      raza:''
  });
  // Manejador del evento onChange
  const handleChange = (event) => {
    const {name,value} = event.target;
    setTipoSeleccionado(event.target.value);
    console.log("Sitio seleccionado:", event.target.value);
    setForm({
        ...form,
        [name]:value,
    });
};
  const gestionarModal = (tipoModal, estadoAbierto) => {
      setModals((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
    };
      // ************************************************
    // Manejadores de Eventos de : editar , crear y borrar 
    // Gracias a UseEffect, se ejecuta una única vez
    // ************************************************
   
    const crearPaseo = (animal) => {
      setAnimalSeleccionado(animal)    
      gestionarModal("crear",true)
    };
  
 //////////////////////////////////////
    // Función de validación
    //////////////////////////////////////
    const validar = async()=>{
      const nuevosErrores = {};
      if (!form.animal.trim()) {
          nuevosErrores.animal = 'El nombre del animal es obligatorio';
      } else {
          try {
              console.log("Comprueba por nombre");
              
              //Cargamos la lista de animales
                useEffect(() => {
                  ServicioAnimales.buscaPorNombre(form.animal)
                    .then((response) => {
                      if (response.data.length === 0) { 
                          console.log("No se encuentra el animal");
                          nuevosErrores.animal = 'El animal no existe, no está registrado';
                      }
                      setAnimalesFiltrado(response.data);
                    })
                    .catch((error) => { });
                }, []);
              
              
          } catch (error) {
              nuevosErrores.animal = 'Error al verificar el animal';
              //alert(error);
          }
      }
      setErrores(nuevosErrores);
        
      // Retorna true si no hay errores, de lo contrario retorna false
      return Object.keys(nuevosErrores).length === 0;
    }

    //////////////////////////////////////
    // Función para gestionar los cambios en los campos del formulario
    //////////////////////////////////////
    const gestionarCambio = (e)=>{
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]:value,
        });
    }
     
    
        //Función para eliminar los filtros
        const eliminarFiltros = () =>{
          setAnimalesFiltrado(animales);
        }
        //Función para manejar el envío del formulario
        const enviaFormulario = async (e) => {
          e.preventDefault();
          setErrores({});          
          try {
            const response = await ServicioAnimales.buscaPorNombre(form.animal);
            
            if (response.data.length === 0) { 
              console.log("No se encuentra el animal");
            } else {
              setAnimalesFiltrado([response.data[0]]);
            }
          } catch (error) {
            console.error("Error al buscar el animal:", error);
          }
        };

    
  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">{/*  className="Animales" */}
        <div className="flex justify-between items-center mb-6">{/*  className="buscador" */}
          <form onSubmit={enviaFormulario}>
            {/* Campo de texto para nombre animal */}
            <label htmlFor="nombre">Nombre del animal: </label>
            <input
                id="nombre"
                type="text"
                name="animal"
                value={form.animal}
                onChange={gestionarCambio}
                placeholder="nombre del animal"
            /><br/>
            {errores.animal && <p className="error">{errores.animal}</p>}
            {/* Campo de texto para tipo animal */}
            <label htmlFor="tipo">Tipo de animal: </label>
            <select
                id="tipo"
                name="tipo"
                className="border p-2"
                value={tipoSeleccionado}
                onChange={handleChange}>
                <option value="">-- Selecciona --</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
            </select><br/>
            {errores.tipo && <p className="error">{errores.tipo}</p>}
            {/* Campo de texto para tipo animal */}
            <label htmlFor="estado">Estado de animal: </label>
            <select
                id="estado"
                name="estado"
                className="border p-2"
                value={estadoSeleccionado}
                onChange={handleChange}>
                <option value="">-- Selecciona --</option>
                <option value="chenil">Chenil/jaula</option>
                <option value="acogida">Acogida</option>
                <option value="adopcion">Adopción</option>
            </select><br/>
            {errores.estado && <p className="error">{errores.estado}</p>}
            {/* Botón de envío */}
            <button type="submit" className="add-info-btn">Buscar</button>
          </form>
          <button onClick={eliminarFiltros} className="add-info-btn">Todos</button>
        </div>
        
        <div  className="grid grid-cols-3 gap-6">{/* className="lista"*/}
          
              {
              animalesFiltrado.map((animal,indice)=>{
                  return <div key={indice} className="text-center">
                      <div>
                          <img src={animal.foto} alt={`imagen ${animal.nombre}`} className="rounded-md w-40 h-40 object-cover mx-auto"/>
                          <h3 className="font-bold mt-2">{animal.nombre}</h3>
                          <p className="text-gray-600">{animal.raza}</p>
                          <p className="text-gray-500">Estado: {animal.situacion}</p>
                          <p className="text-gray-500">Nivel: {animal.nivel}</p>
                          
                          <button className="add-info-btn" onClick={() => crearPaseo(animal.nombre)}>Paseo</button> 
                          <Link to={`/pagina-animal/${animal.identificador}`} >
                              <button className="add-info-btn">Mas info</button> 
                          </Link>
                      </div>
                      
                  </div>
              }
              
              )
              }
          
          </div>
      </div>
          
      
      <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <select className="border p-2" onChange={(e) => setType(e.target.value)}>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>
        <select className="border p-2" onChange={(e) => setStatus(e.target.value)}>
          <option value="En chenil/jaula">En chenil/jaula</option>
          <option value="De paseo">De paseo</option>
        </select>
        <div className="relative">
          <input
            type="text"
            placeholder="nombre animal"
            className="border p-2 pr-10"
            onChange={(e) => setSearch(e.target.value)}
          />
          {/*<Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />*/}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/*filteredAnimals.map((animal, index) => (
          <div key={index} className="text-center">
            <img src={animal.image} alt={animal.name} className="rounded-md w-40 h-40 object-cover mx-auto" />
            <h3 className="font-bold mt-2">{animal.name}</h3>
            <p className="text-gray-600">{animal.type}</p>
            <p className="text-gray-500">Estado: {animal.status}</p>
            <button className="mt-2 border px-4 py-1 rounded text-gray-600 flex items-center justify-center mx-auto">
              ➕ VER PERFIL
            </button>
          </div>
        ))*/}
      </div>
    </div>
    </>
  );
}

export default PaginaAnimales;