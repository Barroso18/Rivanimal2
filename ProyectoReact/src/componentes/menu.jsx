import React, { useState } from "react";
import "../estilos/menu.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Login/AuthProvider';

const MenuSuperior = ({ paseos }) => {
  const [paseosVisible, setPaseosVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const togglePaseos = () => {
    setPaseosVisible(!paseosVisible);
  };

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
      
      <button className="item-menu">Gestion</button>
      <Link to="/Semana">
        <button className="item-menu">Semana</button>
      </Link>
      <Link to="/tu-perfil">
        <button className="item-menu">Tu perfil</button>
      </Link>
      
      <Link to="/paseos">
        <button className="item-menu">Todos los paseos</button>
      </Link>

      <button className="toggle-carrito" onClick={togglePaseos}>
        Paseos voluntario
      </button>

      <button className="item-menu" onClick={handleLogout}>
        Salir
      </button>

      {paseosVisible && (
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
      )}
    </div>
  );
};

export default MenuSuperior;