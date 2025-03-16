import React, {useEffect,useState} from "react";
// import '../estilos/Informe.css';
import Swal from "sweetalert2";
import servicioAnimales from "../servicios/servicioAnimales";
import ServicioPaseos from '../servicios/servicioPaseos';
import servicioPaseos from "../servicios/servicioPaseos.js";
import servicioUsuarios from "../servicios/servicioUsuarios.js";

function PaseoCrear({paseos, setPaseos,nombreAnimal,voluntario, onClose}){
    // errores Almacena los errores del formulario
    const [errores,setErrores] = useState({});
    const sitios = ["MONTARCO","A3","CASA MÚSICA","POLIGONO","RAYUELA"];
    // Estado para almacenar la opción seleccionada
    const [sitioSeleccionado, setSitioSeleccionado] = useState("");
    //Almacenamos los valores del formulario
    //Por defecto se mostrara en el formulario el nombre de usuario registrado en ese momento en el apartado de voluntario
    const [form,setForm] = useState({
        id:'',
        voluntario:voluntario,
        animal:'',
        lugarPaseo:'',
        cacas: 0,
        duracion: 0,
        descripcion:''
    });
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

    // Manejador del evento onChange
    const handleChange = (event) => {
        const {name,value} = event.target;
        setSitioSeleccionado(event.target.value);
        console.log("Sitio seleccionado:", event.target.value);
        setForm({
            ...form,
            [name]:value,
        });
    };
    
    //////////////////////////////////////
    // Función de validación
    //////////////////////////////////////
    const validar = async()=>{
        const nuevosErrores = {};
        if (!form.voluntario.trim()) {
            nuevosErrores.voluntario = 'El nombre del voluntario es obligatorio';
        } else {
            try {
                console.log("Comprueba por nombre");
                const response = await servicioUsuarios.buscaPorNombre(form.voluntario);
                
                console.log(response)
                if (response.data.length === 0) { 
                    console.log("No se encuentra el voluntario");
                    nuevosErrores.voluntario = 'El voluntario no existe, no está registrado';
                }
                
            } catch (error) {
                nuevosErrores.voluntario = 'Error al verificar el voluntario';
                //alert(error);
            }
        }
        if(isNaN(form.duracion)){
            nuevosErrores.duracion ='Se debe introducir un numero';
        }
        if(form.duracion <= 0){
            nuevosErrores.duracion ='La duración del paseo debe superar los 0 minutos';
        }

        if(form.cacas < 0 || form.cacas > 5){
            nuevosErrores.cacas = 'El nivel del las cacas tiene que ser entre 0 y 5';
        }

        // Validación para la "descripcion"
        if(form.descripcion.length === 0 || form.descripcion.length >100){
            nuevosErrores.descripcion = 'La descripción debe tener entre 1 y 100 caracteres';
        }

        // Validación para lugar Paseo
        console.log("Lugar: "+form.lugarPaseo.valueOf());
        if(!sitios.includes(form.lugarPaseo)){
            nuevosErrores.lugarPaseo = 'El lugar de paseo no existe';
        }

        setErrores(nuevosErrores);
        
        //console.log(errores);
        // Retorna true si no hay errores, de lo contrario retorna false
        return Object.keys(nuevosErrores).length === 0;
    };

    


    //Función para manejar el envío del formulario
    const enviaFormulario = async (e) =>{
        e.preventDefault();
        //const errores2 = await validar();
        setErrores({});
        //console.log("Valida el formulario? "+validar());
        // Validar antes de enviar
        //if (Object.keys(errores2).length === 0) {
        if(await validar()){
            //console.clear();
            //console.log('Formulario enviado', form);

            const nuevoPaseo = {
                voluntario:form.voluntario,
                animal:nombreAnimal,
                lugarPaseo:form.lugarPaseo,
                cacas:parseInt(form.cacas),
                duracion:parseInt(form.duracion),
                descripcion: form.descripcion
            }
            try {
                // Enviar por Axios al Json de BD
                const response = await servicioPaseos.create(nuevoPaseo);
                Swal.fire("Paseo creado correctamente");
                
                // Limpiar el formulario después de agregar
                setForm({
                    id: '',
                    voluntario: '',
                    animal: '',
                    lugarPaseo: '',
                    cacas: 0,
                    duracion: 0,
                    descripcion: ''
                });
                // Le ponemos el id correcto de la BD
                nuevoPaseo.id = response.data.id

                //Actualizar el estado local de paseos
                setPaseos([...paseos,nuevoPaseo]);

                // Cerramos el modal
                
            } catch (error) {
                //Swal.fire("ERROR, Al crear el paseo",error);
            }
            onClose();
        }
        else{
            await Swal.fire("ERROR, Al crear el paseo");
        }
    };
    return(
        <div>
            <h3>Paseo de {nombreAnimal}</h3>
            <form onSubmit={enviaFormulario}>
                {/* Campo de texto para nombre VOLUNTARIO */}
                <label htmlFor="nombre">Nombre del voluntario </label>
                <input
                    id="nombre"
                    type="text"
                    name="voluntario"
                    value={form.voluntario}
                    onChange={gestionarCambio}
                    placeholder="Escribe el nombre del voluntario"
                /><br/>
                {errores.voluntario && <p className="error">{errores.voluntario}</p>}

                {/* Campo numerico para duracion paseo */}
                <label htmlFor="duracion">Duración del paseo (min) </label>
                <input
                    id="duracion"
                    type="number"
                    name="duracion"
                    value={parseInt(form.duracion)}
                    onChange={gestionarCambio}
                    placeholder="0"
                /><br/>
                {errores.duracion && <p className="error">{errores.duracion}</p>}

                {/* Campo numerico para nivel cacas */}
                <label htmlFor="cacas">Cacas nivel 1 al 5 </label>
                <input
                    id="cacas"
                    type="number"
                    name="cacas"
                    value={parseInt(form.cacas)}
                    onChange={gestionarCambio}
                    placeholder="0"
                /><br/>
                {errores.cacas && <p className="error">{errores.cacas}</p>}

                {/* Seleccion para el sitio */}
                <label htmlFor="lugarPaseo">Sitio del paseo </label>
                <select
                    id="lugarPaseo"
                    name="lugarPaseo"
                    value={sitioSeleccionado}
                    onChange={handleChange}>
                    <option value="">-- Selecciona --</option>
                    {sitios.map((sitio, index) => (
                        <option key={index} value={sitio.toUpperCase()}>
                            {sitio}
                        </option>
                    ))}
                </select><br/>
                {errores.sitio && <p className="error">{errores.sitio}</p>}

                {/* Campo de texto para descripción */}
                <label htmlFor="descripcion">Descripción del paseo </label><br/>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={gestionarCambio}
                    placeholder="Escribe una breve descripción del paseo"
                /><br/>
                {errores.descripcion && <p className="error">{errores.descripcion}</p>}

                {/* Botón de envío */}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default PaseoCrear;