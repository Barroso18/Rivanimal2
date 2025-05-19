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
    <div className='w-full flex justify-center items-center flex-col'>
      <h1>Pagina de Voluntarios</h1>
      <form>

      </form>
      <p>Bienvenido a la pagina de voluntarios</p>
      <h2>Lista de voluntarios</h2>
      
      <div className="w-full flex flex-col items-center space-y-4 bg-gray-50 min-h-screen">
        {usuarios.map((usuario, idx) => (
          <div key={idx} className="w-[50%]">
            <UserCard usuario={usuario} />
          </div>
        ))}
      </div>
      
    </div>
  );
}
export default PaginaVoluntarios;