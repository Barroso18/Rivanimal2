import React, {useEffect,useState} from "react";
import Swal from "sweetalert2";
import servicioAnimales from "../../servicios/servicioAnimales";
import '../../estilos/estilos.css';
/////////////////////////////////
// Hay que modificarlo para asignarAnimal
////////////////////////////////
const ChenilReAsignar = ({animal,chenil,onClose})=>{
  const [chenilDado,setChenilDado] = useState({});
  const [chenilesLibres,setChenilesLibres] = useState([]);
  const [chenilSeleccionado,setChenilSeleccionado] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        chenil: chenil,
        animal: animal.id_animal,
        activo: true,
    });
  useEffect(() => {
    //Aqui va buscaChenilPorNumero
  }, []);
    const resetFormulario = () => {
        setForm({
          chenil: "",
          animal: animal.id_animal,
          activo: true,
        });
    };

    const gestionarCambio = (e) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const buscaChenilesLibres =() =>{
      servicioAnimales.buscaChenilesLibres()
      .then((response) => {
        if (response.data.errores) {
          setError(response.data.errores);
          Swal.fire({
              title: error,
              icon: "fail",
              confirmButtonText: "Aceptar",
              customClass: {
                  confirmButton: "swal-tailwind-confirm"
              }
          });
          
        } else {
          setChenilesLibres(response.data);
        }
      }).catch((error) => {
        setError("Error en la petición de busqueda.");
        console.error("Error en axios:", error);
      });
    };

    useEffect(() => {
      buscaChenilesLibres();
    }, []);

    const envioFormulario = (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');
        const datos = {
            ...form,
            chenil: Number(form.chenil),
            animal: Number(form.animal),
        };
        console.log("Asignacion: ",datos);
        servicioAnimales.asignarChenil(datos)
        .then((response) => {
          if (response.data.mensaje === "Chenil asignado") {
            setError("");
            Swal.fire({
                title: response.data.mensaje,
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                    confirmButton: "swal-tailwind-confirm"
                }
            });
            onClose(); // Cerrar el modal después de enviar el formulario
            } else if (response.data.errores) {
            setError(
                typeof response.data.errores === "string"
                ? response.data.errores
                : Object.values(response.data.errores).join(", ")
            );
            } else {
            setError('Error desconocido al asignar el chenil.');
            }
        }).catch ((error) =>{
            setError('Error en la petición de registro.');
            console.error('Error en axios:', error);
        })
    };
    return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 pt-12">
        
        {/* Botón de cierre (ahora dentro del modal) */}
        

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Asignar chenil</h2>
        {/* Formulario */}
        <form onSubmit={envioFormulario} className="space-y-6">
          {/* Grupo 1: chenil y animal */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Animal:</label>
              <input
                type="text"
                value={`#${animal.id_animal} - ${animal.nombre}`}
                disabled
                className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
              />
            </div>
             <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Chenil:</label>
              <select
                value={form.chenil}
                name="chenil"
                onChange={gestionarCambio}
                required
                className="w-full p-1 text-sm border border-gray-300 rounded mt-1"
              >
                <option value="" disabled>
                  Selecciona un chenil
                </option>
                {chenilesLibres.map((chenil) => (
                  <option key={chenil.id_chenil} value={chenil.id_chenil}>
                    {chenil.numero}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grupo 2: activo */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-600">Está activo:</label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.activo}
                  name="activo"
                  onChange={gestionarCambio}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-black-600">Activo</span>
              </label>
            </div>
          </div>

          {/* Grupo 4: Mensajes */}
          {error && <p className="text-red-500">{error}</p>}
          {mensaje && <p className="text-green-600">{mensaje}</p>}

          {/* Grupo 8: Botones */}
          <div className="flex gap-4 mt-2 justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600"
              style={{ minWidth: "130px" }}
            >
              Asignar
            </button>
            <button
              type="button"
              onClick={resetFormulario}
              className="bg-red-500 text-white p-2 text-sm rounded hover:bg-red-600"
              style={{ minWidth: "130px" }}
            >
              Borrar campos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChenilReAsignar;