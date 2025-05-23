import "../estilos/estilos.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ServicioAnimales from "../servicios/servicioAnimales";
import Swal from 'sweetalert2';

const FiltroAnimales = ({ filtros, onFiltrosChange, errores }) => {
  const gestionarCambio = (e) => {
    const { name, value } = e.target;
    onFiltrosChange({
      ...filtros,
      [name]: value,
    });
  };

  const eliminarFiltros = () => {
    onFiltrosChange({
      animal: '',
      nivel: '',
      clase: '',
      situacion: ''
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
      <div>
        <label htmlFor="nombre">Nombre del animal: </label>
        <input
          id="nombre"
          type="text"
          name="animal"
          value={filtros.animal}
          onChange={gestionarCambio}
          placeholder="nombre del animal"
          className="border p-2"
        />
        {errores?.animal && <p className="error">{errores.animal}</p>}
      </div>
      <div>
        <label htmlFor="tipo">Tipo de animal: </label>
        <select
          id="tipo"
          name="clase"
          className="border p-2"
          value={filtros.clase}
          onChange={gestionarCambio}
        >
          <option value="">-- Selecciona --</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>
        {errores?.tipo && <p className="error">{errores.tipo}</p>}
      </div>
      <div>
        <label htmlFor="situacion">Situacion de animal: </label>
        <select
          id="situacion"
          name="situacion"
          className="border p-2"
          value={filtros.situacion}
          onChange={gestionarCambio}
        >
          <option value="">-- Selecciona --</option>
          <option value="Refugio">Refugio</option>
          <option value="Casa acogida">Casa Acogida</option>
          <option value="Aadoptado">Adoptado</option>
          <option value="Residencia">Residencia</option>
        </select>
        {errores?.estado && <p className="error">{errores.estado}</p>}
      </div>
      <div>
        <label htmlFor="nivel">Nivel de animal: </label>
        <input
            id="nivel"
            type="number"
            name="nivel"
            min={0}
            max={5}
            value={filtros.nivel}
            onChange={gestionarCambio}
            className="border p-2"
        />
        {errores?.nivel && <p className="error">{errores.nivel}</p>}
      </div>
      <button
          onClick={eliminarFiltros}
          type="button"
          className="relative bg-orange-400 hover:bg-orange-600 text-white rounded-md flex items-center justify-center gap-1 px-2 py-1 mx-auto mt-2 md:mt-0  min-w-0 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
            Limpiar filtros
          </span>
        </button>
    </div>
  );
};

export default FiltroAnimales;