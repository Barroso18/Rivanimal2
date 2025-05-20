import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import servicioUsuarios from "../servicios/servicioUsuarios.js";
import FiltroUsuarios from './FiltroUsuarios.jsx';

const PaginaVoluntarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrado, setUsuariosFiltrado] = useState([]);
  const [errores, setErrores] = useState({});
  const [filtros, setFiltros] = useState({
    busqueda: '',
    rol: ''
  });

  function cargaListaVoluntarios() {
    servicioUsuarios.buscaTodosUsuarios()
      .then((response) => {
        // Procesar usuarios: quitar direccion y dni, y convertir roles a array
        const usuariosProcesados = response.data.map(usuario => {
          const { direccion, dni, roles, ...resto } = usuario;
          return {
            ...resto,
            roles: roles ? roles.split(',').map(r => r.trim()) : []
          };
        });
        setUsuarios(usuariosProcesados);
        setUsuariosFiltrado(usuariosProcesados);
        console.log("Lista de voluntarios:", usuariosProcesados);
      })
      .catch((error) => {
        console.error("Error al cargar la lista de voluntarios:", error);
      });
  }

  useEffect(() => {
    cargaListaVoluntarios();
  }, []);

  useEffect(() => {
    let filtrados = usuarios;

    if (filtros.busqueda && filtros.busqueda.trim() !== '') {
      const texto = filtros.busqueda.toLowerCase();
      filtrados = filtrados.filter(usuario =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.nombre_usuario.toLowerCase().includes(texto)
      );
    }
    if (filtros.rol) {
      filtrados = filtrados.filter(usuario =>
        Array.isArray(usuario.roles) &&
        usuario.roles.some(
          rol => rol.toLowerCase() === filtros.rol.toLowerCase()
        )
      );
    }
    setUsuariosFiltrado(filtrados);
  }, [filtros, usuarios]);

  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <h1>Pagina de Voluntarios</h1>
      <p>Bienvenido a la pagina de voluntarios</p>
      <h2>Lista de voluntarios</h2>
      <FiltroUsuarios filtros={filtros} onFiltrosChange={handleFiltrosChange} errores={errores} />
      <div className="w-full flex flex-col items-center space-y-4 bg-gray-50 min-h-screen">
        {usuariosFiltrado.map((usuario, idx) => (
          <div key={idx} className="w-[50%]">
            <UserCard usuario={usuario} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaginaVoluntarios;