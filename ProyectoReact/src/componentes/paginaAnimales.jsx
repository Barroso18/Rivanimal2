import "../estilos/paginaAnimales.css";
import { useState,useEffect, React } from 'react';
import {buscarAnimal} from "../herramientas/buscaAnimal";
import ServicioAnimales from "../servicios/servicioAnimales";
import LocalStorageServicio from "../servicios/LocalStorageServicio";
import {Link} from "react-router-dom";
import Modal from "./Modal.jsx";
import PaseoCrear from "./PaseoCrear.jsx";
import { useAuth } from '../Login/AuthProvider';
const PaginaAnimales = ({animales,setAnimales,paseos,setPaseos,usuarios}) => {
  // errores Almacena los errores del formulario
  const [errores,setErrores] = useState({});
  const { user, logout } = useAuth();
  const [animalesFiltrado,setAnimalesFiltrado] = useState(animales);
  const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
  // Creamos un usuario de forma temporal
  const usuario = user;

  const [modals, setModals] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });
  const [form,setForm] = useState({
      animal:'',
      raza:''
  });
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
      <div className="Animales">
        <div className="buscador">
          <form onSubmit={enviaFormulario}>
            {/* Campo de texto para nombre VOLUNTARIO */}
            <label htmlFor="nombre">Nombre del animal: </label>
            <input
                id="nombre"
                type="text"
                name="animal"
                value={form.animal}
                onChange={gestionarCambio}
                placeholder="nombre del animal"
            /><br/>
            {errores.voluntario && <p className="error">{errores.voluntario}</p>}

            {/* Botón de envío */}
            <button type="submit">Buscar</button>
          </form>
          <button onClick={eliminarFiltros}>Todos</button>
        </div>
        
        <div className="lista">
          <ul>
              {
              animalesFiltrado.map((animal,indice)=>{
                  return <li key={indice}>
                      <div>
                          <img src={animal.url} alt={`imagen ${animal.nombre}`} />
                          <p>
                              Nombre: {animal.nombre}<br/>
                              Raza: {animal.raza}<br/>
                              Nivel: {animal.nivel}
                          </p>
                          <button className="add-aficion-btn" onClick={() => crearPaseo(animal.nombre)}>Paseo</button> 
                          <Link to={`/pagina-animal/${animal.nombre}`} >
                              <button className="add-aficion-btn">Mas info</button> 
                          </Link>
                      </div>
                      
                  </li>
              }
              
              )
              }
          </ul>
          </div>
      </div>
      <Modal isOpen={modals.crear} onClose={()=>gestionarModal("crear",false)}>      
          <PaseoCrear paseos={paseos} setPaseos={setPaseos} nombreAnimal={animalSeleccionado} voluntario={usuario} usuarios={usuarios} onClose={()=>gestionarModal("crear",false)} />
      </Modal>      
      
      
    </>
  );
}

export default PaginaAnimales;