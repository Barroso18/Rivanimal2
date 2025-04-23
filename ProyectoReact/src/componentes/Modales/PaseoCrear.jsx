import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import servicioUsuarios from "../../servicios/servicioUsuarios.js";
import servicioReporteDiario from "../../servicios/servicioReporteDiario.js";
import servicioPaseos from "../../servicios/servicioPaseos.js";
import { buscaReportePorFecha } from "../../herramientas/buscaReportePorFecha.js";

function PaseoCrear({ nombreAnimal, voluntario, onClose }) {
    const [errores, setErrores] = useState({});
    const [reportesDiarios, setReportesDiarios] = useState([]);
    const [reporteDiarioSeleccionado, setReporteDiarioSeleccionado] = useState(null);
    const sitios = ["MONTARCO", "A3", "CASA MÚSICA", "POLIGONO", "RAYUELA"];
    const [form, setForm] = useState({
        voluntario: "",
        animal: nombreAnimal,
        lugarPaseo: "",
        cacas: 0,
        duracion: 0,
        descripcion: "",
    });

    // Cargar información del voluntario al montar el componente
    useEffect(() => {
        const cargarInformacionVoluntario = async () => {
            try {
                const response = await servicioUsuarios.buscaPorId(parseInt(voluntario));
                setForm((prevForm) => ({
                    ...prevForm,
                    voluntario: response.data.nombre_usuario,
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
    };

    // Validación del formulario
    const validar = async () => {
        const nuevosErrores = {};

        if (!form.voluntario.trim()) {
            nuevosErrores.voluntario = "El nombre del voluntario es obligatorio";
        }

        if (isNaN(form.duracion) || form.duracion <= 0) {
            nuevosErrores.duracion = "La duración del paseo debe ser un número mayor a 0";
        }

        if (form.cacas < 0 || form.cacas > 5) {
            nuevosErrores.cacas = "El nivel de cacas debe estar entre 0 y 5";
        }

        if (!sitios.includes(form.lugarPaseo)) {
            nuevosErrores.lugarPaseo = "El lugar de paseo no es válido";
        }

        if (form.descripcion.length === 0 || form.descripcion.length > 100) {
            nuevosErrores.descripcion = "La descripción debe tener entre 1 y 100 caracteres";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Función para buscar los reportes diarios por usuario
    const filtraReportesPorUsuario = async (usuario) => {
        try {
            const response = await servicioReporteDiario.buscarReportesDiariosPorUsuario(usuario);
            setReportesDiarios(response.data);

            // Buscar el reporte diario por la fecha actual
            const fechaActual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
            const reporteActual = buscaReportePorFecha(fechaActual, response.data);
            setReporteDiarioSeleccionado(reporteActual || null);
        } catch (error) {
            console.error("Error al buscar los reportes de paseos:", error);
        }
    };

    useEffect(() => {
        filtraReportesPorUsuario(voluntario);
    }, [voluntario]);

    // Función para manejar el envío del formulario
    const enviaFormulario = async (e) => {
        e.preventDefault();
        setErrores({});

        if (await validar()) {
            const nuevoPaseo = {
                voluntario: form.voluntario,
                animal: nombreAnimal,
                lugarPaseo: form.lugarPaseo,
                cacas: parseInt(form.cacas),
                duracion: parseInt(form.duracion),
                descripcion: form.descripcion,
            };

            try {
                const response = await servicioPaseos.create(nuevoPaseo);
                Swal.fire("Paseo creado correctamente");

                // Limpiar el formulario después de agregar
                setForm({
                    voluntario: form.voluntario,
                    animal: nombreAnimal,
                    lugarPaseo: "",
                    cacas: 0,
                    duracion: 0,
                    descripcion: "",
                });

                onClose(); // Cerrar el modal
            } catch (error) {
                Swal.fire("Error al crear el paseo", error.message, "error");
            }
        } else {
            Swal.fire("Error", "Por favor corrige los errores en el formulario", "error");
        }
    };

    return (
        <div>
            <h3>Paseo de {nombreAnimal}</h3>
            <form onSubmit={enviaFormulario}>
                <label htmlFor="nombre">Nombre del voluntario</label>
                <input
                    id="nombre"
                    type="text"
                    name="voluntario"
                    value={form.voluntario}
                    onChange={gestionarCambio}
                    placeholder="Escribe el nombre del voluntario"
                /><br/>
                {errores.voluntario && <p className="error">{errores.voluntario}</p>}

                <label htmlFor="duracion">Duración del paseo (min)</label>
                <input
                    id="duracion"
                    type="number"
                    name="duracion"
                    value={form.duracion}
                    onChange={gestionarCambio}
                    placeholder="0"
                /><br/>
                {errores.duracion && <p className="error">{errores.duracion}</p>}

                <label htmlFor="cacas">Cacas nivel 1 al 5</label>
                <input
                    id="cacas"
                    type="number"
                    name="cacas"
                    value={form.cacas}
                    onChange={gestionarCambio}
                    placeholder="0"
                /><br/>
                {errores.cacas && <p className="error">{errores.cacas}</p>}

                <label htmlFor="lugarPaseo">Sitio del paseo</label>
                <select
                    id="lugarPaseo"
                    name="lugarPaseo"
                    value={form.lugarPaseo}
                    onChange={gestionarCambio}
                >
                    <option value="">-- Selecciona --</option>
                    {sitios.map((sitio, index) => (
                        <option key={index} value={sitio}>
                            {sitio}
                        </option>
                    ))}
                </select><br/>
                {errores.lugarPaseo && <p className="error">{errores.lugarPaseo}</p>}

                <label htmlFor="descripcion">Descripción del paseo</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={gestionarCambio}
                    placeholder="Escribe una breve descripción del paseo"
                /><br/>
                {errores.descripcion && <p className="error">{errores.descripcion}</p>}

                <label htmlFor="reporteDiario">Reporte diario</label>
                <select
                    id="reporteDiario"
                    name="reporteDiario"
                    value={reporteDiarioSeleccionado ? String(reporteDiarioSeleccionado.id_reporte_diario) : ""}
                    onChange={(e) => {
                        const reporteSeleccionado = reportesDiarios.find(
                            (reporte) => String(reporte.id_reporte_diario) === e.target.value
                        );
                        setReporteDiarioSeleccionado(reporteSeleccionado || null);
                    }}
                >
                    <option value="">-- Selecciona un reporte diario --</option>
                    {reportesDiarios.map((reporte, index) => (
                        <option key={index} value={String(reporte.id_reporte_diario)}>
                            {reporte.fecha}, {reporte.horario}
                        </option>
                    ))}
                </select><br/>

                <button type="submit" className="add-info-btn">Enviar</button>
            </form>
        </div>
    );
}

export default PaseoCrear;