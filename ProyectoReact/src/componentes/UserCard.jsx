import { PlusCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const UserCard = ({ usuario }) => {
  const roles = Array.isArray(usuario.roles) ? usuario.roles : [];

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start p-4 bg-white rounded-xl shadow-sm border w-full">
      {/* Imagen */}
      <div className="flex-shrink-0 w-24 h-24 sm:w-20 sm:h-20 bg-gray-200 rounded-md flex items-center justify-center">
        <img
          src={usuario.foto || '../imagenes/imagenUsuario.jpg'}
          alt="User Avatar"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Información */}
      <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col justify-between text-center sm:text-left">
        <h3 className="text-base font-semibold leading-tight">
          {usuario.nombre} {usuario.apellido1} {usuario.apellido2}
        </h3>

        {/* Roles como etiquetas */}
        <div className="flex flex-wrap gap-2 mt-2">
          {roles.map((rol, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {rol.trim()}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-700 mt-2">
          Licencia PPP: <span className="font-medium">{usuario.licenciaPPP ? 'sí' : 'no'}</span>
        </p>
        <p className="text-sm text-gray-500">Nombre usuario: {usuario.nombre_usuario}</p>
        
        <Link
          to={`/perfil-publico/${usuario.nombre_usuario}`}
          className="mt-2 inline-flex items-center text-blue-600 text-sm hover:underline"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          VER PERFIL
        </Link>
      </div>
    </div>
  );
};

export default UserCard;