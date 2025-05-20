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
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
      <div>
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
      <div>
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
      </div>
      <button onClick={eliminarFiltros} type="button" className="bg-orange-500 hover:bg-orange-600 text-white rounded-md h-10 mt-4 md:mt-0">Todos</button>
    </div>
  );
};

export default FiltroUsuarios;