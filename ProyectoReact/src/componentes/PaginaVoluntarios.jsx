import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { use } from 'react';
import servicioUsuarios from "../servicios/servicioUsuarios.js";

const PaginaVoluntarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [errores, setErrores] = useState({});
  function cargaListaVoluntarios() {
    servicioUsuarios.buscaTodosUsuarios()
      .then((response) => {
        setUsuarios(response.data);
        console.log("Lista de voluntarios:", response.data);
      })
      .catch((error) => {
        console.error("Error al cargar la lista de voluntarios:", error);
      });
  }
  useEffect(() => {
    cargaListaVoluntarios();
  }, []);
  return (
    <div>
      <h1>Pagina de Voluntarios</h1>
      <form>

      </form>
      <p>Bienvenido a la pagina de voluntarios</p>
      <h2>Lista de voluntarios</h2>
      
      <div className="max-w-md mx-auto p-4 space-y-4 bg-gray-50 min-h-screen">
        {usuarios.map((usuario, idx) => (
          <UserCard key={idx} usuario={usuario} />
        ))}
      </div>
      
    </div>
  );
}
export default PaginaVoluntarios;