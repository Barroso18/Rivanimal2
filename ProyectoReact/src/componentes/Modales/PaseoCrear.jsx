import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from '../../Login/AuthProvider';
import servicioUsuarios from "../../servicios/servicioUsuarios.js";
import servicioReporteDiario from "../../servicios/servicioReporteDiario.js";
import servicioPaseos from "../../servicios/servicioPaseos.js";
import { buscaReportePorFecha } from "../../herramientas/buscaReportePorFecha.js";
import { calculaDuracion } from '../../herramientas/calculaDuracion';
import Modal from "./Modal.jsx";
import ReporteDiarioCrear from "./ReporteDiarioCrear";

function PaseoCrear({ animal, voluntario, onClose }) {
    const { user } = useAuth();
    const rolesUsuario = typeof user?.data.roles === 'string'
        ? user.data.roles.split(',').map(role => role.trim())
        : Array.isArray(user?.data.roles) ? user.data.roles : [];
    const [nombreVoluntario, setNombreVoluntario] = useState('');
    const [mostrarModalReporte, setMostrarModalReporte] = useState(false);
    const [errores, setErrores] = useState({});
    const [usuario, setUsuario] = useState({});
    const [error,setError] = useState([]);
    const [mensaje,setMensaje] = useState('');
    const [reportesDiarios, setReportesDiarios] = useState([]);
    const [reporteDiarioSeleccionado, setReporteDiarioSeleccionado] = useState(null);
    const sitios = ["MONTARCO", "A3", "CASA MÚSICA", "POLIGONO", "RAYUELA"];
    const [form, setForm] = useState({
        voluntario: "",
        idVoluntario:0,
        animal: animal.id_animal,
        lugarPaseo: "",
        caca_nivel: 0,
        reporte_diario: 0,
        fecha_hora_inicio: "",
        fecha_hora_fin: "",
        descripcion: "",
    localizaciones: [],        
    nuevaLocalizacion: "",
    });
    const [modalsAnimal,setModalsAnimal] = useState({
        crear: false,
        consultar: false,
        editar: false,
    });

    const gestionarModalAnimal = (tipoModal, estadoAbierto) => {
        setModalsAnimal((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
    };

    const crearReporteDiario = () => {
        gestionarModalAnimal("crear", true);
    };

    // Cargar información del voluntario al montar el componente
    useEffect(() => {
        const cargarInformacionVoluntario = async () => {
            try {
                const response = await servicioUsuarios.buscaPorId(parseInt(voluntario));
                setUsuario(response.data);
                setNombreVoluntario(response.data.nombre_usuario);
                setForm((prevForm) => ({
                    ...prevForm,
                    voluntario: response.data.nombre_usuario,
                    idVoluntario:response.data.id_usuario,
                }));
            } catch (error) {
                console.error("Error al buscar el voluntario:", error);
                setErrores((prevErrores) => ({
                    ...prevErrores,
                    voluntario: "Error al cargar la información del voluntario",
                }));
            }
        };

        cargarInformacionVoluntario();
    }, [voluntario]);

    // Función para gestionar los cambios en los campos del formulario
    const gestionarCambio = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        if (name === "voluntario") {
            setNombreVoluntario(value);
        }
    };
    const resetFormulario = () =>{
        const form2 = {
            voluntario: "",
            animal: animal.id_animal,
            lugarPaseo: "",
            caca_nivel: 0,
            reporte_diario: 0,
            fecha_hora_inicio: "",
            fecha_hora_fin: "",
            descripcion: "",
            localizaciones: [],        
            nuevaLocalizacion: "",
        }
        setForm(form2);
    }
   
    const muestraDuracion = () => {
        if (form.fecha_hora_inicio && form.fecha_hora_fin) {
            return <>{calculaDuracion(form.fecha_hora_inicio, form.fecha_hora_fin)} min</>;
        }
        return "";
    };

    // Buscar reportes diarios por usuario
    const filtraReportesPorUsuario = async (nombreUsuario) => {
        try {
            // 1. Buscar el usuario por nombre de usuario
            const usuarioResp = await servicioUsuarios.buscaPorNombre(nombreUsuario);
            if (!usuarioResp.data || !usuarioResp.data.id_usuario) {
                setErrores((prev) => ({
                    ...prev,
                    voluntario: "No se encontró el usuario indicado",
                }));
                setReportesDiarios([]);
                setReporteDiarioSeleccionado(null);
                setForm((prevForm) => ({
                    ...prevForm,
                    reporte_diario: ""
                }));
                return;
            }
            setErrores([]);
            
            const idUsuario = usuarioResp.data.id_usuario;
            // 2. Buscar los reportes diarios por id de usuario
            const response = await servicioReporteDiario.buscarReportesDiariosPorUsuario(idUsuario);
            setReportesDiarios(Array.isArray(response.data) ? response.data : []);

            if (!response.data || response.data.length === 0) {
                // Mostrar confirmación antes de abrir el modal
                const confirmacion = await Swal.fire({
                    title: "No existen reportes diarios",
                    text: "Se va a crear un nuevo reporte diario. ¿Quieres continuar?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí, continuar",
                    cancelButtonText: "Cancelar"
                });
                if (confirmacion.isConfirmed) {
                    setMostrarModalReporte(true); // Mostrar modal de crear reporte diario
                }
                setForm((prevForm) => ({
                    ...prevForm,
                    reporte_diario: ""
                }));
                return;
            }

            // Buscar el reporte diario por la fecha actual
            const fechaActual = new Date().toISOString().split("T")[0];
            const reporteActual = buscaReportePorFecha(fechaActual, response.data);
            setReporteDiarioSeleccionado(reporteActual || null);
            setForm((prevForm) => ({
                ...prevForm,
                reporte_diario: reporteActual ? reporteActual.id_reporte_diario : ""
            }));
        } catch (error) {
            console.error("Error al buscar los reportes de paseos:", error);
        }
    };

    // Si cambia el voluntario, recargar reportes diarios
    useEffect(() => {
        if (form.voluntario) {
            filtraReportesPorUsuario(form.voluntario);
        }
    }, [form.voluntario]);

    // Función para manejar el envío del formulario
    const enviaFormulario = async (e) => {
        e.preventDefault();
        setErrores({});
        
        const formData = new FormData();
        formData.append("voluntario", form.voluntario); // Ahora será el id
        console.log("form.voluntario : ",form.voluntario);
        formData.append("animal", form.animal);
        formData.append("ubicaciones", form.localizaciones);
        formData.append("reporte_diario",form.reporte_diario);
        formData.append("caca_nivel", parseInt(form.caca_nivel));
        formData.append("fecha_hora_inicio", form.fecha_hora_inicio);
        formData.append("fecha_hora_fin", form.fecha_hora_fin);
        formData.append("descripcion", form.descripcion);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        
        await servicioPaseos.registro(formData)
        .then((response) => {
            if (response.data.message === "Registro exitoso") {
            setMensaje("Paseo registrado correctamente");
            setError([]);
            resetFormulario();
            Swal.fire({
                title: "¡Éxito!",
                text: mensaje,
                icon: "success",
                confirmButtonText: "Aceptar",
            });
            //Cerramos el modal una vez el paseo se ha agregado
            onClose();
            } else if (response.data.errores) {
            //setError(Object.values(response.data.errores).join(", "));
            setError(response.data.errores);
            console.log("Error: ",error);
            } else {
            setError("Error desconocido al registrar el paseo");
            console.log("Datos:",response.data);
            }
        }).catch((error) => {
            setError("Error en la petición de registro.");
            console.error("Error en axios:", error);
        });
    };

    const gestionaReportesDiarios = (e) => {
         const idSeleccionado = e.target.value;
        const reporteSeleccionado = reportesDiarios.find(
            (reporte) => String(reporte.id_reporte_diario) === e.target.value
        );
        setReporteDiarioSeleccionado(reporteSeleccionado || null);
        setForm((prevForm) => ({
            ...prevForm,
            reporte_diario: idSeleccionado
        }));
    };

    return (
        <>
            {/* Modal para crear reporte diario si no existen */}
            {mostrarModalReporte && (
                <ReporteDiarioCrear
                    voluntario={voluntario}
                    onClose={() => {
                        setMostrarModalReporte(false);
                        filtraReportesPorUsuario(nombreVoluntario);
                    }}
                />
            )}

            {/* Modal de crear paseo */}
            {!mostrarModalReporte && (
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
                        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Paseo de {animal.nombre}</h3>
                        <form onSubmit={enviaFormulario} className="space-y-6">

                            {/* Grupo 1: Voluntario y reporte diario */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">Voluntario:</label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        name="voluntario"
                                        value={form.voluntario}
                                        onChange={gestionarCambio}
                                        onBlur={(e) => filtraReportesPorUsuario(e.target.value)}
                                        placeholder="Escribe el nombre del voluntario"
                                        required
                                        disabled={!rolesUsuario.includes("admin")}
                                        className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                                    /><br />
                                    {errores.voluntario && <p className="error">{errores.voluntario}</p>}
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="reporte_diario" className="block text-sm font-medium text-gray-600">Reporte diario</label>
                                    <select
                                        id="reporte_diario"
                                        name="reporte_diario"
                                        value={form.reporte_diario ? String(form.reporte_diario) : ""}
                                        onChange={gestionaReportesDiarios}
                                        className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                                    >
                                        <option value="">-- Selecciona un reporte diario --</option>
                                        {(reportesDiarios || []).map((reporte, index) => (
                                            <option key={index} value={String(reporte.id_reporte_diario)}>
                                                {reporte.fecha}, {reporte.horario}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="add-info-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            crearReporteDiario();
                                        }}
                                    >
                                        Crear reporte
                                    </button>
                                </div>
                            </div>
                            {/* Grupo 2: Hora inicio, fin y duración y nivel cacas */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="fecha_hora_inicio" className="block text-sm font-medium text-gray-600">
                                        Fecha y hora del inicio:
                                    </label>
                                    <input
                                        id="fecha_hora_inicio"
                                        type="datetime-local"
                                        name="fecha_hora_inicio"
                                        value={form.fecha_hora_inicio || ""}
                                        onChange={gestionarCambio}
                                        required
                                        className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="fecha_hora_fin" className="block text-sm font-medium text-gray-600">
                                        Fecha y hora del fin:
                                    </label>
                                    <input
                                        id="fecha_hora_fin"
                                        type="datetime-local"
                                        name="fecha_hora_fin"
                                        value={form.fecha_hora_fin || ""}
                                        onChange={gestionarCambio}
                                        required
                                        className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                                    />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="duracion" className="block text-sm font-medium text-gray-600">
                                        Duración:
                                    </label>
                                    <p id="duracion" className="w-full p-1 text-sm border border-gray-300 rounded mt-1">
                                        {(form.fecha_hora_inicio && form.fecha_hora_fin)
                                            ? muestraDuracion()
                                            : "0 min"}
                                    </p>
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="caca_nivel" className="block text-sm font-medium text-gray-600">
                                        Nivel cacas:
                                    </label>
                                    <input
                                        id="caca_nivel"
                                        type="number"
                                        name="caca_nivel"
                                        min={0}
                                        max={5}
                                        value={form.caca_nivel || 0}
                                        onChange={gestionarCambio}
                                        className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                                    />
                                </div>
                            </div>
                            {/* Grupo 3: localizaciones */}
                            <div className="flex flex-wrap gap-4">
                                
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="localizaciones" className="block text-sm font-medium text-gray-600">
                                        Localizaciones:
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {form.localizaciones && form.localizaciones.map((loc, idx) => (
                                            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                                                {loc}
                                                <button
                                                    type="button"
                                                    className="ml-1 text-red-500 hover:text-red-700"
                                                    onClick={() => {
                                                        setForm({
                                                            ...form,
                                                            localizaciones: form.localizaciones.filter((l, i) => i !== idx)
                                                        });
                                                    }}
                                                    aria-label="Eliminar localización"
                                                >✖</button>
                                            </span>
                                        ))}
                                        <input
                                            list="lista-localizaciones"
                                            type="text"
                                            className="p-1 border border-gray-300 rounded"
                                            placeholder="Añadir localización"
                                            value={form.nuevaLocalizacion || ""}
                                            onChange={e => setForm({ ...form, nuevaLocalizacion: e.target.value })}
                                            onKeyDown={e => {
                                                if (
                                                    (e.key === "Enter" || e.key === ",") &&
                                                    form.nuevaLocalizacion &&
                                                    !form.localizaciones.includes(form.nuevaLocalizacion)
                                                ) {
                                                    e.preventDefault();
                                                    setForm({
                                                        ...form,
                                                        localizaciones: [...(form.localizaciones || []), form.nuevaLocalizacion],
                                                        nuevaLocalizacion: ""
                                                    });
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => {
                                                if (
                                                    form.nuevaLocalizacion &&
                                                    !(form.localizaciones || []).includes(form.nuevaLocalizacion)
                                                ) {
                                                    setForm({
                                                        ...form,
                                                        localizaciones: [...(form.localizaciones || []), form.nuevaLocalizacion],
                                                        nuevaLocalizacion: ""
                                                    });
                                                }
                                            }}
                                        >
                                            Añadir
                                        </button>
                                        <datalist id="lista-localizaciones">
                                            {sitios.map((sitio, idx) => (
                                                <option key={idx} value={sitio} />
                                            ))}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                            {/* Grupo 4: descripcion*/}
                            <div className="flex flex-wrap gap-4">
                                
                                <div className="flex-1 min-w-[150px]">
                                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-600">
                                        Descripción:
                                    </label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={form.descripcion || ""}
                                        onChange={gestionarCambio}
                                        maxLength={100}
                                        rows={3}
                                        className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
                                        placeholder="Añade una descripción (máx. 100 caracteres)"
                                    />
                                    {errores.descripcion && <p className="error">{errores.descripcion}</p>}
                                </div>
                            </div>
                            {/* Grupo 8: Botones */}
                            <div className="space-y-2">
                                <button type="submit" className="w-full bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600">Guardar</button>
                                <button type="button" onClick={resetFormulario} className="w-full bg-red-500 text-white p-2 text-sm rounded hover:bg-red-600">Borrar campos</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Modal isOpen={modalsAnimal.crear}
                onClose={async() => {gestionarModalAnimal("crear", false);
                filtraReportesPorUsuario(nombreVoluntario);}}>
                <ReporteDiarioCrear
                    onClose={async() => {
                        gestionarModalAnimal("crear", false);
                        filtraReportesPorUsuario(nombreVoluntario);
                    }}
                />
            </Modal>
        </>
    );
}

export default PaseoCrear;