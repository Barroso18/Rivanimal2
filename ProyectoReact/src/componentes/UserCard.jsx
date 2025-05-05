import { PlusCircle } from 'lucide-react';
import {Link} from "react-router-dom";
const UserCard = ({ usuario }) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm border">
      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
        <img src={usuario.foto || '../imagenes/imagenUsuario.jpg'} alt="User Avatar" className="w-full h-full rounded-md" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{usuario.nombre} {usuario.apellido1} {usuario.apellido2}</h3>
        <p className="text-sm text-gray-700">
          {usuario.roles}
        </p> 
        <p className="text-sm text-gray-700">
            Licencia PPP: <span className="font-medium">{usuario.licenciaPPP ? 'sí' : 'no'}</span>
        </p>
        <p className="text-sm text-gray-500">Nombre usuario: {usuario.nombre_usuario}</p>
        <button className="mt-2 inline-flex items-center text-blue-600 text-sm hover:underline">
          <PlusCircle className="w-4 h-4 mr-1" /> <Link to={`/perfil-publico/${usuario.nombre_usuario}`}>VER PERFIL</Link>
        </button>
      </div>
    </div>
  );
};

export default UserCard;