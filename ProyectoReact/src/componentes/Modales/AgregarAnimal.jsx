import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import servicioAnimales from "../../servicios/servicioAnimales";
import '../../estilos/estilos.css';

const AgregarAnimal = ({onClose})=>{

    const [nombre, setNombre] = useState('');
    const [clase, setClase] = useState('');
    const [raza, setRaza] = useState('');
    const [sexo, setSexo] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [ppp, setppp] = useState(false);
    const [identificador, setIdentificador] = useState(0); 
    const [nivel, setNivel] = useState(0); // Nivel de agresividad
    const [situacion,setSituacion] = useState('');
    const [fechaNacimiento,setFechaNacimiento] = useState('');
    const [fechaEntrada,setFechaEntrada] = useState('');
    const [peso,setPeso] = useState();
    const [descripcion,setDescripcion] = useState('');
    const [comportamiento,setComportamiento] = useState('');
    const [socializacion,setSocializacion] = useState('');
    const [localidad,setLocalidad] = useState('');
    const [disponibilidad,setDisponibilidad] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);
    const [foto, setFoto] = useState('');
    const [razasSugeridas, setRazasSugeridas] = useState([]);
    const [razasRecientes, setRazasRecientes] = useState([]); // Nuevo estado para razas recientes

    //Manejador de imagenes
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFoto(file);
            setPreview(URL.createObjectURL(file)); // Mostrar vista previa de la imagen
        }
    };

    // Función para restablecer el formulario
    const resetFormulario = () => {
        setNombre('');
        setClase('');
        setRaza('');
        setSexo('');
        setTamaño('');
        setLocalidad('');
        setppp(false);
        setIdentificador(0);
        setNivel(0);
        setSituacion('');
        setFechaNacimiento('');
        setFechaEntrada('');
        setPeso();
        setDescripcion('');
        setComportamiento('');
        setSocializacion('');
        setFoto('');
        setMensaje('');
        setError('');
        setPreview(null);
    };
    const cargaRazasSugerencias = () => {
        if (!clase) return null;
        servicioAnimales.cargaRazasSugerencias(clase)
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setRazasSugeridas(response.data);
                }
            })
            .catch((error) => {
                setRazasSugeridas([]);
            });
        return razasSugeridas.map((raza, idx) => (
            <option key={idx} value={raza} />
        ));
    };

    const controlaRegistro = async (e) => {
        e.preventDefault();
        // Crear un objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append("nombre",nombre);
        formData.append("clase",clase);
        formData.append("raza",raza);
        formData.append("sexo",sexo);
        formData.append("tamaño",tamaño);
        formData.append("ppp",ppp);
        formData.append("identificador",identificador);
        formData.append("nivel",nivel);
        formData.append("situacion",situacion);
        formData.append("disponibilidad",disponibilidad);
        formData.append("fechaNacimiento",fechaNacimiento);
        formData.append("fechaEntrada",fechaEntrada);
        formData.append("peso",peso);
        formData.append("descripcion",descripcion);
        formData.append("comportamiento",comportamiento);
        formData.append("socializacion",socializacion);
        formData.append("localidad",localidad);
        if (foto) {
          formData.append("file", foto); // Adjuntar la imagen
        }
        // Juntar todos los datos en una variable de texto
        const datosHTML  = `
        <div style="text-align: left">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Clase:</strong> ${clase}</p>
            <p><strong>Raza:</strong> ${raza}</p>
            <p><strong>Sexo:</strong> ${sexo}</p>
            <p><strong>Tamaño:</strong> ${tamaño}</p>
            <p><strong>PPP:</strong> ${ppp ? "Sí" : "No"}</p>
            <p><strong>Identificador:</strong> ${identificador}</p>
            <p><strong>Nivel:</strong> ${nivel}</p>
            <p><strong>Situación:</strong> ${situacion}</p>
            <p><strong>Disponibilidad:</strong> ${disponibilidad}</p>
            <p><strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}</p>
            <p><strong>Fecha de Entrada:</strong> ${fechaEntrada}</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
            <p><strong>Descripción:</strong> ${descripcion}</p>
            <p><strong>Comportamiento:</strong> ${comportamiento}</p>
            <p><strong>Socialización:</strong> ${socializacion}</p>
            <p><strong>Localidad:</strong> ${localidad}</p>
        </div>
        `;
        
        await servicioAnimales.registro(formData)
        .then((response) => {
          if (response.data.message === "Registro de animal exitoso") {
            setMensaje("Animal registrado correctamente");
            setError("");
            Swal.fire({
                title: response.data.message,
                html: datosHTML,
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "swal-tailwind-confirm"
                }
            });
            console.log("Datos: ", response.data)
            //resetFormulario();
            //Cerramos el modal una vez el animal se ha agregado
            onClose();
          } else if (response.data.errores) {
            setError(Object.values(response.data.errores).join(", "));
          } else {
            setError("Error desconocido al registrar el animal");
            console.log("Datos:",response.data);
          }
        }).catch((error) => {
          setError("Error en la petición de registro.");
          console.error("Error en axios:", error);
        });


    };

    useEffect(() => {
        cargaRazasSugerencias();
        // eslint-disable-next-line
    }, [clase]);

    useEffect(() => {
        if (raza && !razasRecientes.includes(raza.trim()) && raza.trim() !== "") {
            setRazasRecientes(prev => [...prev, raza.trim()]);
        }
        // eslint-disable-next-line
    }, [raza]);

    // Añade este useEffect para controlar la disponibilidad cuando la situación es "Adoptado"
    useEffect(() => {
        if (situacion === "Adoptado") {
            setDisponibilidad(["Adoptado"]);
        } else if (situacion === "Refugio" || situacion === "Residencia") {
            setDisponibilidad(["Apadrinar", "Acogida", "Adopción"]);
        } else if (situacion === "Casa acogida") {
            setDisponibilidad(["Adopción"]);
        } else {
            setDisponibilidad((prev) => prev.filter((d) => d !== "Adoptado"));
        }
    }, [situacion]);

    return(
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            {/* Botón de cierre */}
            <button
                onClick={onClose}
                className="close-btn absolute top-2 right-2 bg-white text-gray-500 hover:text-gray-800 rounded-full shadow-lg p-2"
                aria-label="Cerrar"
                >
                ✖
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro de animal</h2>
            {/* Formulario */}
            <form onSubmit={controlaRegistro} className="space-y-6">
                {/* Grupo 1: Nombre, clase y raza */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            name="nombre"
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Clase:</label>
                        <select
                            value={clase}
                            name="clase"
                            onChange={(e) => setClase(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1">
                            <option value="" disabled>
                                Selecciona una clase
                            </option>
                            <option value="perro">Perro</option>
                            <option value="gato">Gato</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Raza:</label>
                        <input
                            type="text"
                            value={raza}
                            name="raza"
                            onChange={(e) => setRaza(e.target.value)}
                            list="razas-sugerencias"
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                        {/* Aqui ira una funcion que cargue el datalist en funcion de si es perro o gato */}
                        <datalist id="razas-sugerencias">
                            {clase && razasSugeridas
                                .filter(razaSugerida =>
                                    !razasRecientes.some(r => r.toLowerCase() === razaSugerida.toLowerCase())
                                )
                                .map((raza, idx) => (
                                    <option key={idx} value={raza} />
                                ))
                            }
                            {clase && <option value="Otra" />}
                        </datalist>
                    </div>
                    
                </div>

                {/* Grupo 2: Sexo, ppp y tamaño */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Tamaño:</label>
                        <select
                            value={tamaño}
                            name="tamaño"
                            onChange={(e) => setTamaño(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1">
                            <option value="" disabled>
                                Selecciona un tamaño
                            </option>
                            <option value="pequeño">Pequeño</option>
                            <option value="mediano">Mediano</option>
                            <option value="grande">Grande</option>
                            <option value="gigante">Gigante</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Sexo:</label>
                        <div className="flex items-center space-x-4 mt-1">
                            <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="macho"
                                checked={sexo === "macho"}
                                name="sexo"
                                onChange={(e) => setSexo(e.target.value)}
                                required
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-black-600">Macho</span>
                            </label>
                            <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="hembra"
                                name="sexo"
                                checked={sexo === "hembra"}
                                onChange={(e) => setSexo(e.target.value)}
                                required
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-black-600">Hembra</span>
                            </label>
                        </div>
                    </div>
                    {/* Renderizar el campo "Es PPP" solo si la clase no es "gato" */}
                    {clase !== "gato" && (
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-sm font-medium text-gray-600">Es PPP:</label>
                            <label className="flex items-center space-x-2">
                                <input
                                type="checkbox"
                                value={ppp}
                                checked={ppp}
                                onChange={(e) => setppp(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-black-600">Requiere Licencia PPP</span>
                            </label>
                        </div>
                    )}
                </div>

                {/* Grupo 3: identifiacador, localidad, nivel */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Identificador:</label>
                        <input
                            type="number"
                            value={identificador}
                            name="identificador"
                            onChange={(e) => setIdentificador(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Nivel:</label>
                        <input
                            type="number"
                            value={nivel}
                            name="nivel"
                            min={0}
                            max={5}
                            onChange={(e) => setNivel(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Localidad:</label>
                        <select
                            value={localidad}
                            name="localidad"
                            onChange={(e) => setLocalidad(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1">
                            <option value="" disabled>
                                Selecciona una localidad
                            </option>
                            <option value="RIVAS-VACIAMADRID">RIVAS-VACIAMADRID</option>
                            <option value="PARLA">PARLA</option>
                            <option value="MADRID">MADRID</option>
                        </select>
                    </div>
                </div>
                {/* Grupo 4: situacion */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Situación:</label>
                        <select
                            value={situacion}
                            name="situacion"
                            onChange={(e) => setSituacion(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1">
                            <option value="" disabled>
                                Selecciona una situación
                            </option>
                            <option value="Refugio">Refugio</option>
                            <option value="Casa acogida">Casa acogida</option>
                            <option value="Residencia">Residencia</option>
                            <option value="Adoptado">Adoptado</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Disponibilidad:</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value="Apadrinar"
                                    checked={disponibilidad.includes("Apadrinar")}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setDisponibilidad([...disponibilidad, "Apadrinar"]);
                                        } else {
                                            setDisponibilidad(disponibilidad.filter(d => d !== "Apadrinar"));
                                        }
                                    }}
                                    className="form-checkbox text-blue-600"
                                    disabled={
                                        situacion === "Adoptado" ||
                                        !(
                                            situacion === "Refugio" ||
                                            situacion === "Residencia"
                                        )
                                    }
                                />
                                <span className="ml-2">Apadrinar</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value="Acogida"
                                    checked={disponibilidad.includes("Acogida")}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setDisponibilidad([...disponibilidad, "Acogida"]);
                                        } else {
                                            setDisponibilidad(disponibilidad.filter(d => d !== "Acogida"));
                                        }
                                    }}
                                    className="form-checkbox text-blue-600"
                                    disabled={
                                        situacion === "Adoptado" ||
                                        !(
                                            situacion === "Refugio" ||
                                            situacion === "Residencia"
                                        )
                                    }
                                />
                                <span className="ml-2">Acogida</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value="Adopción"
                                    checked={disponibilidad.includes("Adopción")}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setDisponibilidad([...disponibilidad, "Adopción"]);
                                        } else {
                                            setDisponibilidad(disponibilidad.filter(d => d !== "Adopción"));
                                        }
                                    }}
                                    className="form-checkbox text-blue-600"
                                    disabled={
                                        situacion === "Adoptado" ||
                                        !(
                                            situacion === "Refugio" ||
                                            situacion === "Residencia" ||
                                            situacion === "Casa acogida"
                                        )
                                    }
                                />
                                <span className="ml-2">Adopción</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    value="Adoptado"
                                    checked={disponibilidad.includes("Adoptado")}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setDisponibilidad([...disponibilidad, "Adoptado"]);
                                        } else {
                                            setDisponibilidad(disponibilidad.filter(d => d !== "Adoptado"));
                                        }
                                    }}
                                    className="form-checkbox text-blue-600"
                                    disabled={situacion !== "Adoptado"}
                                />
                                <span className="ml-2">Adoptado</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* Grupo 5: fecha_nacimiento, fecha_entrada, peso */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Fecha de nacimiento:</label>
                        <input
                            type="date"
                            value={fechaNacimiento}
                            name="fechaNacimiento"
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Fecha de entrada:</label>
                        <input
                            type="date"
                            value={fechaEntrada}
                            name="fechaEntrada"
                            onChange={(e) => setFechaEntrada(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Peso(Kg):</label>
                        <input
                            type="number"
                            value={peso}
                            name="peso"
                            onChange={(e) => setPeso(e.target.value)}
                            required
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                </div>
                {/* Grupo 6: descripcion, comportamiento, socializacion */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Descripción:</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Escribe una breve descripción del animal"
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Comportamiento:</label>
                        <textarea
                            id="comportamiento"
                            name="comportamiento"
                            value={comportamiento}
                            onChange={(e) => setComportamiento(e.target.value)}
                            placeholder="Describe el comportamiento del animal"
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Socialización:</label>
                        <textarea
                            id="socializacion"
                            name="socializacion"
                            value={socializacion}
                            onChange={(e) => setSocializacion(e.target.value)}
                            placeholder="Describe la socialización del animal con otros animales y personas"
                            className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                        />
                    </div>
                </div>
                {/* Grupo 7: foto */}
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        
                        <div className="flex items-center gap-4 mt-1">
                            <label className="block text-sm font-medium text-gray-600">Foto:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm"
                                required
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="h-16 rounded border object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>
                {/* Grupo 8: Mensajes */}
                {error && <p className="text-red-500">{error}</p>}
                {mensaje && <p className="text-green-600">{mensaje}</p>}

                {/* Grupo 9: Botones */}
                <div className="flex gap-4 mt-2 justify-center">
                  <button type="submit" className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600">Registrar</button>
                  <button type="button" onClick={resetFormulario} className="bg-red-500 text-white p-2 text-sm rounded hover:bg-red-600">Borrar campos</button>
                </div>
            </form>
        </div>
    </div>
    );
}
export default AgregarAnimal;