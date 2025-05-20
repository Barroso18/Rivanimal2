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
      estado: ''
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
        <label htmlFor="estado">Estado de animal: </label>
        <select
          id="estado"
          name="estado"
          className="border p-2"
          value={filtros.estado}
          onChange={gestionarCambio}
        >
          <option value="">-- Selecciona --</option>
          <option value="chenil">Chenil/jaula</option>
          <option value="acogida">Acogida</option>
          <option value="adopcion">Adopción</option>
        </select>
        {errores?.estado && <p className="error">{errores.estado}</p>}
      </div>
      <div>
        <label htmlFor="nivel">Nivel de animal: </label>
        <input
          id="nivel"
          type="number"
          name="nivel"
          value={filtros.nivel}
          onChange={gestionarCambio}
          className="border p-2"
        />
        {errores?.nivel && <p className="error">{errores.nivel}</p>}
      </div>
      <button onClick={eliminarFiltros} type="button" className="add-info-btn h-10 mt-4 md:mt-0">Todos</button>
    </div>
  );
};

export default FiltroAnimales;