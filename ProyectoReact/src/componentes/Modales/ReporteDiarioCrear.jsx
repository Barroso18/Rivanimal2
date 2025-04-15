import React, { useState } from 'react';
import { useAuth } from '../../Login/AuthProvider';
import '../../estilos/estilos.css';
function ReporteDiarioCrear({onClose}){
    const { user, logout } = useAuth();
    // errores Almacena los errores del formulario
    const [errores,setErrores] = useState({});
    
      const [error, setError] = useState('');
    const [form,setForm] = useState({
            id:'',
            usuario:user?.data.id,
            rol:'',
            fecha:'',
            horario: ''
    });
    const usuario = user.data.id ;
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
    const validar = async()=>{

    };


    const enviarFormulario = async (e) => { 
        e.preventDefault(); // Evitar el envío del formulario por defecto
        
    };


    return(
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
                    <form onSubmit={enviarFormulario}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Usuario:</label>
                        <input
                        id="usuario"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md mt-2"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600">Contraseña</label>
                        
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                    >
                        Iniciar Sesión
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ReporteDiarioCrear;