import { useState } from "react";
import { ChevronDown } from "lucide-react";
const MenuDesplegable = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Botón del menú */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Opciones
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {/* Contenido del dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Perfil
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Configuración
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDesplegable;