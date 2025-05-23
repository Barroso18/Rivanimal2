import React, { useState } from "react";
import Swal from "sweetalert2";
import servicioAnimales from "../../servicios/servicioAnimales";
import '../../estilos/estilos.css';

const ChenilCrear = ({ onClose }) => {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    numero: 0,
    reja: false,
    guillotina: false,
    activo: false,
    descripcion: "",
  });

  const resetFormulario = () => {
    setForm({
      numero: 0,
      reja: false,
      guillotina: false,
      activo: false,
      descripcion: "",
    });
  };

  const gestionarCambio = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const envioFormulario = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    try {
      const response = await servicioAnimales.crearChenil(form);
      if (response.data.mensaje === "Chenil creado") {
        setError("");
        Swal.fire({
            title: response.data.mensaje,
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
                confirmButton: "swal-tailwind-confirm"
            }
        });
        onClose(); // Cerrar el modal después de enviar el formulario
      } else if (response.data.errores) {
        setError(
          typeof response.data.errores === "string"
            ? response.data.errores
            : Object.values(response.data.errores).join(", ")
        );
      } else {
        setError('Error desconocido al crear el chenil.');
      }
    } catch (error) {
      setError('Error en la petición de registro.');
      console.error('Error en axios:', error);
    }
  };

  return (
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro de chenil</h2>
        {/* Formulario */}
        <form onSubmit={envioFormulario} className="space-y-6">
          {/* Grupo 1: Número y reja */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Número:</label>
              <input
                type="number"
                value={form.numero}
                name="numero"
                min={0}
                onChange={gestionarCambio}
                required
                className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Tiene reja:</label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.reja}
                  name="reja"
                  onChange={gestionarCambio}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-black-600">Reja</span>
              </label>
            </div>
          </div>

          {/* Grupo 2: guillotina y activo */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Tiene guillotina:</label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.guillotina}
                  name="guillotina"
                  onChange={gestionarCambio}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-black-600">Guillotina</span>
              </label>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Está activo:</label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.activo}
                  name="activo"
                  onChange={gestionarCambio}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-black-600">Activo</span>
              </label>
            </div>
          </div>

          {/* Grupo 3: descripcion */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={form.descripcion}
                onChange={gestionarCambio}
                placeholder="Opcional"
                className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
              />
            </div>
          </div>

          {/* Grupo 4: Mensajes */}
          {error && <p className="text-red-500">{error}</p>}
          {mensaje && <p className="text-green-600">{mensaje}</p>}

          {/* Grupo 8: Botones */}
          <div className="flex gap-4 mt-2 justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={resetFormulario}
              className="bg-red-500 text-white p-2 text-sm rounded hover:bg-red-600"
            >
              Borrar campos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChenilCrear;