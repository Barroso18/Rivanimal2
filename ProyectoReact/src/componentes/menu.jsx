import React, { useState } from "react";
import "../estilos/estilos.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Login/AuthProvider';
import { ChevronDown,Menu } from "lucide-react";
const MenuSuperior = () => {
  //Variable paseos tendrá que ser consultada a la BBDD
  //const [paseos, setPaseos] = useState([]);
  //const [paseosVisible, setPaseosVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const rolesUsuario = typeof user?.data.roles === 'string' ? user.data.roles.split(',').map(role => role.trim()) // Convertir a array y eliminar espacios
  : Array.isArray(user?.data.roles)? user.data.roles: [];
  //console.log("Roles del usuario:", rolesUsuario);
/*
  const togglePaseos = () => {
    setPaseosVisible(!paseosVisible);
  };
*/
  const [togleUsuario, setTogleUsuario] = useState(false);

  const handleLogout = async() => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="menu-superior mx-auto px-4 py-2 flex items-center justify-between flex-wrap bg-white shadow-md">
      {/* Logo */}
      <Link to="/"><img
        src="/imagenes/logoRivanimal.jpg"
        alt="Logo Rivanimal"
        className="icono-logo h-10"
      /></Link>
      {/* Botón hamburguesa - visible solo en móviles */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="sm:hidden text-gray-700"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Menú normal - visible en pantallas sm y mayores */}
      <div className="hidden mx-auto sm:flex gap-6 items-center justify-between">
        <Link to="/"><button className="item-menu text-sm sm:text-xl">Animales</button></Link>
        <Link to="/pagina-voluntarios"><button className="item-menu text-sm sm:text-xl">Voluntarios</button></Link>
        {rolesUsuario.includes("admin") && (
          <Link to="/pagina-gestion"><button className="item-menu text-sm sm:text-xl">Gestion</button></Link>
        )}
        <Link to="/Semana"><button className="item-menu text-sm sm:text-xl">Semana</button></Link>
        {/* Desplegable usuario */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setTogleUsuario(!togleUsuario)}
            className="item-menu text-sm sm:text-xl"
          >
            {user?.data.usuario}
            <ChevronDown className="ml-2 h-4 w-4 inline" />
          </button>
          {togleUsuario && (
            <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link to="/tu-perfil">
                  <button className="item-menu block px-4 py-2 text-xl">Tu perfil</button>
                </Link>
                <button className="item-menu block px-4 py-2 text-xl" onClick={handleLogout}>Salir</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {menuAbierto && (
        <div className="w-full flex flex-col gap-2 mt-2 sm:hidden">
          <Link to="/"><button className="item-menu text-sm text-left">Inicio</button></Link>
          <Link to="/"><button className="item-menu text-sm text-left">Animales</button></Link>
          <Link to="/pagina-voluntarios"><button className="item-menu text-sm text-left">Voluntarios</button></Link>
          {rolesUsuario.includes("admin") && (
            <Link to="/pagina-gestion"><button className="item-menu text-sm text-left">Gestion</button></Link>
          )}
          <Link to="/Semana"><button className="item-menu text-sm text-left">Semana</button></Link>
          <Link to="/tu-perfil"><button className="item-menu text-sm text-left">Tu perfil</button></Link>
          <button className="item-menu text-sm text-left" onClick={handleLogout}>Salir</button>
        </div>
      )}


      {/*
      <Link to="/paseos">
        <button className="item-menu">Todos los paseos</button>
      </Link>
         */}
      
      {/* <button className="item-menu" onClick={togglePaseos}>
        paseos voluntario
      </button> */}
      {/* Aqui pondremos en un futuro los paseos realizados en el reporte diario */}
      {/*
      paseosVisible && (
        <div className="lista-paseos">
          <h4>Paseos</h4>
          {paseos.length > 0 ? (
            <ul className="listaPaseosul">
              {paseos.map((paseo, index) => (
                <li key={index}>
                  {paseo.animal}: {paseo.duracion} min, lugar: {paseo.lugarPaseo}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay paseos.</p>
          )}
        </div>
      )*/}
    </div>
  );
};

export default MenuSuperior;