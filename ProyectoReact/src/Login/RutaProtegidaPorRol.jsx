import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Swal from 'sweetalert2';

const RutaProtegidaPorRol = ({ children, rolesPermitidos }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Convertir roles a un array
  const rolesUsuario = typeof user?.data?.roles === 'string'
    ? user.data.roles.split(',').map(role => role.trim())
    : Array.isArray(user?.data?.roles)
    ? user.data.roles
    : [];

  // Verificar si al menos uno de los roles del usuario está en los roles permitidos
  const tieneAcceso = rolesUsuario.some(role => rolesPermitidos.includes(role));

  useEffect(() => {
    if (!tieneAcceso) {
      if (localStorage.getItem("justLoggedOut")) {
        localStorage.removeItem("justLoggedOut");
        navigate("/login", { replace: true });
      } else {
        Swal.fire({
          title: "Acceso denegado",
          text: "No tienes permiso para acceder a esta página.",
          icon: "error"
        }).then(() => {
          const previousPath = location.state?.from || '/';
          navigate(previousPath, { replace: true });
        });
      }
    }
    // Solo depende de tieneAcceso, location, navigate
  }, [tieneAcceso, location, navigate]);

  if (!tieneAcceso) {
    return null;
  }

  return children;
};

export default RutaProtegidaPorRol;