import React, { useState } from "react";
import "../estilos/estilos.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Login/AuthProvider';

const MenuSuperior = () => {
  //Variable paseos tendrá que ser consultada a la BBDD
  //const [paseos, setPaseos] = useState([]);
  //const [paseosVisible, setPaseosVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const rolesUsuario = typeof user?.data.roles === 'string' ? user.data.roles.split(',').map(role => role.trim()) // Convertir a array y eliminar espacios
  : Array.isArray(user?.data.roles)? user.data.roles: [];
  //console.log("Roles del usuario:", rolesUsuario);
/*
  const togglePaseos = () => {
    setPaseosVisible(!paseosVisible);
  };
*/
  const handleLogout = async() => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="menu-superior">
      <img
        src="/imagenes/logoRivanimal.jpg"
        alt="Logo Rivanimal"
        className="icono-supermercado"
      />
      <div className="item-menu">{user?.data.usuario}</div>

      <Link to="/">
        <button className="item-menu">Animales</button>
      </Link>
      <Link to="/pagina-voluntarios">
        <button className="item-menu">Voluntarios</button>
      </Link>
      {rolesUsuario.includes('admin') && (
        <Link to="/pagina-gestion">
          <button className="item-menu">Gestion</button>
        </Link>
      )}
      <Link to="/Semana">
        <button className="item-menu">Semana</button>
      </Link>
      <Link to="/tu-perfil">
        <button className="item-menu">Tu perfil</button>
      </Link>
      
      <Link to="/paseos">
        <button className="item-menu">Todos los paseos</button>
      </Link>

      <button className="item-menu" onClick={handleLogout}>
        Salir
      </button>
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