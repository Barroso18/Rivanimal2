import "../estilos/paginaPaseos.css";
import { useState } from 'react';
import {buscarAnimal} from "../herramientas/buscaAnimal";
import {Link} from "react-router-dom";
import Modal from "./Modal.jsx";
import PaseoCrear from "./PaseoCrear.jsx";
import PaseoEditar from "./PaseoEditar.jsx";
import PaseoEliminar from "./PaseoEliminar.js";
import { useAuth } from '../Login/AuthProvider';
const PaginaPaseos = ({paseos,setPaseos})=>{
    const { user, logout } = useAuth();
    const [animalSeleccionado, setAnimalSeleccionado] = useState(null);
    const [paseoSeleccionado, setPaseoSeleccionado] = useState(null);
    const [modals, setModals] = useState({
        crear: false,
        consultar: false,
        editar: false,
      });
      const editarPaseo = (paseo) => {
        setPaseoSeleccionado(paseo)    
        gestionarModal("editar",true)
      };
      const gestionarModal = (tipoModal, estadoAbierto) => {
          setModals((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
        };
    const borrarPaseo = (paseo) =>{
        PaseoEliminar(paseo, paseos, setPaseos);
    }
    return(
        <div>
            <ul>
                {
                paseos.map((paseo,indice)=>{

                    
                    return <li key={indice}>
                        <div>
                            
                            <p>
                                <strong>Lugar:</strong> {paseo.lugarPaseo}  <strong>Duracion:</strong> {paseo.duracion} min <br/>
                               
                                <strong>Animal:</strong> {paseo.animal} <strong>Voluntario:</strong> {paseo.voluntario} <br/>
                                <strong>Descripción:</strong> {paseo.descripcion}
                            </p>
                            <button className="btn-Paseo-editar" onClick={() => editarPaseo(paseo)}>Editar</button>
                            <button className="btn-Paseo-borrar" onClick={() => borrarPaseo(paseo)}>Borrar</button>
                            <Link to={`/pagina-animal/${paseo.animal}`} >
                                <button className="add-aficion-btn">Info animal</button> 
                            </Link>
                        </div>
                        
                    </li>
                }
                
                )
                }
            </ul>
            <Modal isOpen={modals.editar} onClose={()=>gestionarModal("editar",false)} >
                <PaseoEditar  paseos={paseoSeleccionado} setPaseos={setPaseos} nombreAnimal={animalSeleccionado} voluntario={user} onClose={()=>gestionarModal("editar",false)} />
            </Modal>  
        </div>
    );
}

export default PaginaPaseos;