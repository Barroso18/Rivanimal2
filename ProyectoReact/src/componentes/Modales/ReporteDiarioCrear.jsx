import React, { useState } from 'react';
import { useAuth } from '../../Login/AuthProvider';
import '../../estilos/estilos.css';
import servicioReporteDiario from '../../servicios/servicioReporteDiario';
function ReporteDiarioCrear({onClose}){
    const { user, logout } = useAuth();
// errores Almacena los errores del formulario
    const [errores,setErrores] = useState({});
const [roles, setRoles] = useState([]);
    const [horario, setHorario] = useState([]);
    const rolesUsuario = user?.data.roles;
    //console.log("Roles del usuario:", rolesUsuario);
    const opcionesPermitidas = rolesUsuario.split(',');
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        id: '',
        usuario: user?.data.usuario || '',
        rol: '',
        fecha: '',
        horario: '',
    });
const usuarioid = user.data.id ;
    const usuario_name = user.data.usuario;
    //////////////////////////////////////
    // Función para gestionar los cambios en los campos del formulario
    const gestionarCambio = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // Validar el formulario antes de enviarlo
    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!form.usuario) nuevosErrores.usuario = 'El campo Usuario es obligatorio';
        if (!form.rol) nuevosErrores.rol = 'El campo Rol es obligatorio';
        if (!form.fecha) nuevosErrores.fecha = 'El campo Fecha es obligatorio';
        if (!form.horario) nuevosErrores.horario = 'El campo Horario es obligatorio';
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };
    const resetFormulario = () =>{
        setForm({
            id: '',
            usuario: user?.data.usuario || '',
            rol: '',
            fecha: '',
            horario: '',
        });
    }
    // Enviar el formulario
    const enviarFormulario = async (e) => {
        e.preventDefault(); // Evitar el envío del formulario por defecto
// Primero buscamos si el usuario existe y su id
        console.log("horario: ",form.horario);
        //Comprobamos el formato de la fecha

        //Comprobamos el horario
await servicioReporteDiario.creaReporte(form).then((response) => {
            if (response.data.mensaje === "Reporte diario registrado exitosamente") {
                console.log("response: ",response)
                setErrores("");
                onClose(); // Cerrar el modal después de enviar el formulario
            } else if (response.data.errores) {
                setErrores(response.data.errores);
            } else {
                setError('Error desconocido al registrar el reporte diario.');
            }
            console.log("response: ",response)
        }). catch ((error) =>{
            setError('Error en la petición de registro.');
            console.error('Error en axios:', error);
            //setErrores(response.data.error);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 px-4 md:px-12">
                <button
                    onClick={onClose}
                    className="close-btn absolute top-2 right-2 bg-white text-gray-500 hover:text-gray-800 rounded-full shadow-lg p-2"
                    aria-label="Cerrar"
                >
                    ✖
                </button>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Apuntame</h3>
                <form onSubmit={enviarFormulario} className="space-y-2">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Usuario:</label>
                        <input
                            id="usuario"
                            type="text"
                            name="usuario"
                            className="w-full p-3 border border-gray-300 rounded-md mt-2"
                            placeholder="Usuario"
                            value={form.usuario}
                            onChange={gestionarCambio}
                            required
                        />
                        {errores.usuario && <p className="text-red-500 text-sm">{errores.usuario}</p>}
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Rol</label>
                        {opcionesPermitidas.map((opcion) => (
                            <label key={opcion} className="flex items-center space-x-2 text-gray-600">
                                <input
                                    type="radio"
                                    name="rol"
                                    value={opcion}
                                    onChange={gestionarCambio}
                                    checked={form.rol === opcion}
                                    className="accent-blue-600 w-4 h-4"
                                />
                                <span className="capitalize">{opcion}</span>
                            </label>
                        ))}
                        {errores.rol && <p className="text-red-500 text-sm">{errores.rol}</p>}
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Fecha</label>
                        <input
                            type="date"
                            name="fecha"
                            value={form.fecha}
                            onChange={gestionarCambio}
                            className="w-full p-3 border border-gray-300 rounded-md mt-2"
                            required
                        />
                        {errores.fecha && <p className="text-red-500 text-sm">{errores.fecha}</p>}
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-sm font-medium text-gray-600">Horario</label>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <input
                                type="radio"
                                name="horario"
                                value="MAÑANA"
                                onChange={gestionarCambio}
                                checked={form.horario === 'MAÑANA'}
                                className="accent-blue-600 w-4 h-4"
                            />
                            <span className="capitalize">MAÑANA</span>
                        </label>
                        <label className="flex items-center space-x-2 text-gray-600">
                            <input
                                type="radio"
                                name="horario"
                                value="TARDE"
                                onChange={gestionarCambio}
                                checked={form.horario === 'TARDE'}
                                className="accent-blue-600 w-4 h-4"
                            />
                            <span className="capitalize">TARDE</span>
                        </label>
                        {errores.horario && <p className="text-red-500 text-sm">{errores.horario}</p>}
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {errores.duplicado && <p className="text-red-500 text-sm">{errores.duplicado}</p>}
                    <div className="flex gap-4 mt-4">
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={resetFormulario}
                            className="w-1/2 bg-red-500 text-white p-2 text-sm rounded hover:bg-red-600"
                        >
                            Borrar campos
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReporteDiarioCrear;