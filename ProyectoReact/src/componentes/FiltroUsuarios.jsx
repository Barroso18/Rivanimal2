import "../estilos/estilos.css";

const FiltroUsuarios = ({ filtros, onFiltrosChange, errores }) => {
  const gestionarCambio = (e) => {
    const { name, value } = e.target;
    onFiltrosChange({
      ...filtros,
      [name]: value,
    });
  };

  const eliminarFiltros = () => {
    onFiltrosChange({
      busqueda: '',
      rol: ''
    });
  };

  return (
    <div className="flex flex-col h-full items-center justify-center md:flex-row md:items-end gap-4 mb-6">
      <div className="flex items-center w-full md:w-auto gap-4">
        <label htmlFor="busqueda">Nombre o usuario: </label>
        <input
          id="busqueda"
          type="text"
          name="busqueda"
          value={filtros.busqueda}
          onChange={gestionarCambio}
          placeholder="Nombre o usuario"
          className="border p-2"
        />
        {errores?.busqueda && <p className="error">{errores.busqueda}</p>}
      </div>
      <div className="flex items-center w-full md:w-auto gap-4">
        <label htmlFor="rol">Rol: </label>
        <select
          id="rol"
          name="rol"
          className="border p-2"
          value={filtros.rol}
          onChange={gestionarCambio}
        >
          <option value="">-- Selecciona --</option>
          <option value="admin">Admin</option>
          <option value="voluntario">Voluntario</option>
          <option value="gespad">Gespad</option>
          <option value="educadora">Educadora</option>
        </select>
        {errores?.rol && <p className="error">{errores.rol}</p>}
        <button
          onClick={eliminarFiltros}
          type="button"
          className="relative bg-orange-400 hover:bg-orange-600 text-white rounded-md flex items-center justify-center gap-1 px-2 py-1 mx-auto mt-2 md:mt-0 h-auto w-auto min-w-0 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
            Limpiar filtros
          </span>
        </button>
      </div>
      
      
    </div>
  );
};

export default FiltroUsuarios;