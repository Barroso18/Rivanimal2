//import "../estilos/paginaAnimal.css";
import "../estilos/estilos.css";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useAuth } from "../Login/AuthProvider";
import { ArrowLeft, ArrowRight, List } from "lucide-react";
import Swal from "sweetalert2";
import Modal from "./Modales/Modal.jsx";
import PaseoCrear from "./Modales/PaseoCrear.jsx";
import ReporteGatoCrear from "./Modales/ReporteGatoCrear.jsx";
import ReporteGatoConsultar from "./Modales/ReporteGatoConsultar.jsx";
import PaseoConsultar from "./Modales/PaseoConsultar.jsx";
import EditarAnimal from "./Modales/EditarAnimal.jsx";
import ServicioAnimales from "../servicios/servicioAnimales";
import ServicioUsuarios from "../servicios/servicioUsuarios";
import servicioReporteDiario from "../servicios/servicioReporteDiario.js";
import servicioPaseos from "../servicios/servicioPaseos.js";
import ServicioReporteGatos from "../servicios/servicioReporteGatos.js";
import { buscaTratamientoTipo } from "../herramientas/buscaTratamientoTipo";
import { calculaDuracion } from "../herramientas/calculaDuracion";
import { formateaFecha } from "../herramientas/formateaFecha";
import { buscaReportePorFecha } from "../herramientas/buscaReportePorFecha.js";
import ListaReportesGatos from "./ListaReportesGatos.jsx";
import ListaReportesPaseos from "./ListaReportesPaseos.jsx";
import Roles from "./Roles.jsx";
import CalendarioDinamicoAnimal from "./CalendarioDinamicoAnimal.jsx";

const PaginaAnimal = () => {
  const [activeTab, setActiveTab] = useState("reportes"); // Estado para controlar la pestaña activa
  const { idanimal } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const usuario = user.data.usuario; // Usuario temporal
  const idUsuario = user.data.id; // ID del usuario temporal
  const [tratamientos, setTratamientos] = useState([]);
  const [paseos, setPaseos] = useState([]);
  const [error, setError] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [paseoSeleccionado, setPaseoSeleccionado] = useState(null); // Estado para almacenar el paseo seleccionado
  const [numeroChenil, setNumeroChenil] = useState(null);
  //Variables para la paginacion de los paseos
  const [paginaActual, setPaginaActual] = useState(0);
  const elementosPorPagina = 4;
  // Inicializar con propiedades vacías para evitar errores
  const [animalInformacion, setAnimalInformacion] = useState({
    foto: "",
    nombre: "",
    clase: "",
    sexo: "",
    fecha_ingreso: "",
    fecha_nacimiento: "",
    raza: "",
    tamaño: "",
    peso: "",
    situacion: "",
    comportamiento: "",
  });
  const [estadoAnimal, setEstadoAnimal] = useState({});
  //Variables para crear las tabs
  const tabs = [
    { id: "salud", label: "Salud",roles:Roles.soloAdmin },
    { id: "higiene", label: "Higiene",roles:Roles.todos },
    { id: "reportes", label: "Reportes",roles:Roles.todos },
    { id: "alimentacion", label: "Alimentación",roles:Roles.todos },
    { id: "socializacion", label: "Socialización",roles:Roles.todos },
    { id: "otros", label: "Otros",roles:Roles.todos },
  ];
  const tabRefs = useRef({});
  const [modalsPaseo, setModalsPaseo] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });
  const [modalsGato, setModalsGato] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });
  const [modalsAnimal,setModalsAnimal] = useState({
    crear: false,
    consultar: false,
    editar: false,
  });
  // Función para gestionar los modales de paseos
  const gestionarModalPaseo = (tipoModal, estadoAbierto) => {
    setModalsPaseo((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
  };

  // Función para gestionar los modales de gatos
  const gestionarModalGato = (tipoModal, estadoAbierto) => {
    setModalsGato((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
  };
  // Función para gestionar los modales de animal
  const gestionarModalAnimal = (tipoModal, estadoAbierto) => {
    setModalsAnimal((prevModals) => ({ ...prevModals, [tipoModal]: estadoAbierto }));
    recargaAnimal();
  };
  // Cargamos la información del animal por primera vez
  useEffect(() => {
    if (!idanimal) {
      console.error("ID del animal no proporcionado.");
      return;
    }else{
     ServicioAnimales.buscaPorid_animal(parseInt(idanimal))
      .then((response) => {
        if(response.data.errores){
          setError(Object.values(response.data.errores).join(", "));
          Swal.fire({
              title: "Error",
              text: response.data.errores['id_animal'],
              icon: "error",
              confirmButtonText: "Aceptar",
          });
          navigate("/");
        }
        setAnimalInformacion({
        ...response.data,
        fecha_entrada: formateaFecha(response.data.fecha_entrada),
        fecha_nacimiento: formateaFecha(response.data.fecha_nacimiento),
        id_animal: response.data.id_animal,
      });
      })
      .catch((error) => {
        console.error("Error al obtener el animal:", error);
      });
      
    }
  }, [idanimal]);
  // Recargamos la información del animal
  const recargaAnimal = () => {
    if (!idanimal) return;
    ServicioAnimales.buscaPorid_animal(parseInt(idanimal))
      .then((response) => {
        if(response.data.errores){
          setError(Object.values(response.data.errores).join(", "));
          Swal.fire({
              title: "Error",
              text: response.data.errores['id_animal'],
              icon: "error",
              confirmButtonText: "Aceptar",
          });
          navigate("/");
        }
        setAnimalInformacion({
          ...response.data,
          fecha_entrada: formateaFecha(response.data.fecha_entrada),
          fecha_nacimiento: formateaFecha(response.data.fecha_nacimiento),
          id_animal: response.data.id_animal,
        });
      })
      .catch((error) => {
        console.error("Error al obtener el animal:", error);
      });
  };
  //Buscamos el estado del animal
 /* useEffect(() => {
    if (animalInformacion.id_animal) {
      ServicioAnimales.buscaEstadoAnimal(parseInt(animalInformacion.id_animal))
        .then((response) => {
          setEstadoAnimal(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener el estado del animal:", error);
        });
    }
  }, [animalInformacion.id_animal]);
*/
  useEffect(() => {
    if (animalInformacion.id_animal) {
      ServicioAnimales.buscaTratamientoPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          setTratamientos(response.data); // Actualiza el estado con los tratamientos
        })
        .catch((error) => {
          console.error("Error al obtener los tratamientos:", error);
        });
    }
  }, [animalInformacion.id_animal]);
  // Cuando una tab se activa la centramos con scrollIntoView
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  useEffect(() => {
      if (animalInformacion.situacion === "Refugio" && animalInformacion.clase === "perro") {
        ServicioAnimales.buscaChenilAnimal(animalInformacion.id_animal)
          .then((response) => {
            setNumeroChenil(response.data); // Si tu backend devuelve {numero: 22}, usa response.data.numero
          })
          .catch(() => setNumeroChenil(null));
      } else {
        setNumeroChenil(null);
      }
    }, [animalInformacion.id_animal, animalInformacion.situacion, animalInformacion.clase]);

  const crearPaseo = (animal) => {
    gestionarModalPaseo("crear", true);
  };

  const crearReporteGato = (animal) => {
    gestionarModalGato("crear", true);
  };

  //Cargamos la información de los reportes de cada animal
  useEffect(() => {
    if (animalInformacion.id_animal) {
      if(animalInformacion.clase == "perro"){
      servicioPaseos.getPaseosPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          //console.log("Paseos del animal:", response.data);
          setPaseos(response.data); 
        })
        .catch((error) => {
          console.error("Error al obtener los reportes:", error);
        });
      }
      if(animalInformacion.clase == "gato"){ 
        ServicioReporteGatos.getReportesPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          //console.log("Reportes de gatos del animal:", response.data);
          setPaseos(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los reportes:", error);
        });

      }
    }
  }, [animalInformacion]);
  const recargaReportes = () =>{
    if (animalInformacion.id_animal) {
      if(animalInformacion.clase == "perro"){
      servicioPaseos.getPaseosPorAnimal(ananimalInformacion.id_animal)
        .then((response) => {
          //console.log("Paseos del animal:", response.data);
          setPaseos(response.data); 
        })
        .catch((error) => {
          console.error("Error al obtener los reportes:", error);
        });
      }
      if(animalInformacion.clase == "gato"){ 
        ServicioReporteGatos.getReportesPorAnimal(animalInformacion.id_animal)
        .then((response) => {
          //console.log("Reportes de gatos del animal:", response.data);
          setPaseos(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los reportes:", error);
        });
      }
    }
  }
  function filtrarInfo(filtro) {
    if (tratamientos !== null) {
      const tratamientosFiltrado = buscaTratamientoTipo(filtro, tratamientos);
      if (tratamientosFiltrado && tratamientosFiltrado.length > 0) {
        return (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Descripción</th>
                  <th className="border border-gray-300 px-4 py-2">Fecha</th>
                  <th className="border border-gray-300 px-4 py-2">Peso (Kg)</th>
                  <th className="border border-gray-300 px-4 py-2">Activo</th>
                </tr>
              </thead>
              <tbody>
                {tratamientosFiltrado.map((tratamiento, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{tratamiento.descripcion}</td>
                    <td className="border border-gray-300 px-4 py-2">{tratamiento.fecha}</td>
                    <td className="border border-gray-300 px-4 py-2">{tratamiento.peso_kg}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {tratamiento.activo === 1 ? "Sí" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }else{
        return (
          <p className="p-4">No hay registros</p>
        );
      }
      
    }
    return (
      <p className="p-4">No hay registros</p>
    );
    /*
    return (
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Descripción</th>
                  <th className="border border-gray-300 px-4 py-2">Fecha</th>
                  <th className="border border-gray-300 px-4 py-2">Peso (Kg)</th>
                  <th className="border border-gray-300 px-4 py-2">Activo</th>
                </tr>
              </thead>
              <tbody>
                
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2">
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
    );
    */
  }

  async function cargaUsuariosCuidadores(id_animal){
        await ServicioAnimales.buscaUsuariosPorAnimal(id_animal)
        .then((response) => {
          //Hay que controlar si no existen registros
          //console.log ("Usuarios: ", response.data);
            setUsuarios(Array.isArray(response.data) ? response.data : []);
            //console.log("Reportes diarios:", response.data);
        })
        .catch((error) => {
            console.error("Error al buscar usuarios:", error);
            setUsuarios([]);
        });
    }
    useEffect(() => {
      if (animalInformacion.id_animal) {
        cargaUsuariosCuidadores(animalInformacion.id_animal);
      }
      // eslint-disable-next-line
    }, [animalInformacion.id_animal]);

    const visualizaUsuariosCuidadores = () => {
      if (!usuarios || usuarios.length === 0) {
        return <p className="p-4">No hay usuarios cuidadores.</p>;
      }
      return (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Apellidos</th>
                <th className="border border-gray-300 px-4 py-2">Nombre_usuario</th>
                <th className="border border-gray-300 px-4 py-2">Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((cuidador, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2"><Link to={`/perfil-publico/${cuidador.nombre_usuario}`} className="underline text-blue-600 hover:text-blue-800">{cuidador.nombre}</Link></td>
                  <td className="border border-gray-300 px-4 py-2">{cuidador.apellido1}, {cuidador.apellido2}</td>
                  <td className="border border-gray-300 px-4 py-2">{cuidador.nombre_usuario}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {cuidador.rol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
  //Funcion para cambiar el estado del animal
  function cambiaEstadoAnimal() {}

  //Funcion para buscar los reportes diarios por usuario
  async function filtraReportesPorUsuario(usuario) {
    try {
      const response = await servicioReporteDiario.buscarReportesDiariosPorUsuario(usuario);
      const reportesDiarios = response.data;

      // Buscar el reporte diario por la fecha actual
      const fechaActual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
      const reporteActual = buscaReportePorFecha(fechaActual, reportesDiarios);
      return reporteActual || null;
    } catch (error) {
      console.error("Error al buscar los reportes de paseos:", error);
      return null;
    }
  }
  const editarAnimal = () =>{
    gestionarModalAnimal("editar",true);
  }
  const consultarPaseo = (paseo) => {
    setPaseoSeleccionado(paseo); // Almacena el paseo seleccionado en el estado
    gestionarModalPaseo("consultar", true); // Abre el modal de consulta
  };
  const consultarReporteGato = (reporteGato) => {
    setPaseoSeleccionado(reporteGato); // Almacena el reporteGato seleccionado en el estado
    gestionarModalGato("consultar", true); // Abre el modal de consulta
  };
  const muestraPaseos = () => {
    return (
      <ListaReportesPaseos reportes={paseos}/>
    );
  };


  const muestraReportesGatos = () => {
    return(
      <ListaReportesGatos reportes={paseos}/>
    );
  };

  function esPerro(){
    if(animalInformacion.clase == "perro"){
      return (<><strong>PPP: </strong>{animalInformacion.ppp ? "Sí" : "No"}</>);}
    else{
      return (<></>);
    }
  }

  function esPerro2(){
    if(animalInformacion.clase == "perro"){
      return (<>{activeTab === "reportes" && muestraPaseos()}</>);
    }else if(animalInformacion.clase == "gato"){
      return (<>{activeTab === "reportes" && muestraReportesGatos()}</>);
    
    }  else{
      return (<></>);
    }
  }
  function muestraBotonEditar(){
    const rolesUsuario = user.data.roles; // Asumiendo que los roles del usuario están en `user.data.roles`
    const tieneAcceso = Roles.soloAdmin.some((rol) => rolesUsuario.includes(rol));
    if(tieneAcceso){
      return (
        <button
          className=" bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition-colors"
          onClick={() => editarAnimal()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
        </button>
      );
    }
  }
  function agregarBotonesReportes(){
    if(animalInformacion.clase == "perro"){
      return (
      <>{/* Aqui deberiamos poner una funcion que segun el estado del animal muestre un boton u otro */}
        <button
          className="add-info-btn"
          onClick={() => crearPaseo(animalInformacion.nombre)}
        >
          Crear paseo
        </button>
      </>);
    }
    else if (animalInformacion.clase == "gato"){
      return (<>
        <button className="add-info-btn"  onClick={() => crearReporteGato(animalInformacion.nombre)}>Reporte gato</button>
      </>);
    }else{
      return (<></>);
    }
  }

  //Funcion para comprobar si el usuario tiene acceso a la pestaña
  // y renderizarla si tiene acceso
  const  muestraTabs = (tab) =>{
    //console.log("Roles permitidos: ", tab.roles);
    // Comprobar si los roles del usuario coinciden con los roles permitidos de la pestaña
    const rolesUsuario = user.data.roles; // Asumiendo que los roles del usuario están en `user.data.roles`
    const tieneAcceso = tab.roles.some((rol) => rolesUsuario.includes(rol));

    // Si el usuario tiene acceso, renderizar la pestaña
    if (tieneAcceso) {
      return (
        <button
          key={tab.id}
          ref={(el) => (tabRefs.current[tab.id] = el)}
          className={`tab px-4 py-2 shrink-0 ${
            activeTab === tab.id
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      );
    }
    // Si no tiene acceso, no renderizar nada
    return null;
  }

  return (
    <div className="animal px-4 py-6">
      <div className="ficha-container bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-6 max-w-3xl mx-auto relative">
        {/* Botón editar en la esquina superior derecha */}
        
        <div className="foto flex-shrink-0 w-full md:w-1/2 flex justify-center">
          {/* Verificación condicional para evitar errores */}
          {animalInformacion.foto ? (
            <img
              src={animalInformacion.foto}
              alt="Perro en adopción"
              className="rounded-lg w-full h-auto object-cover max-h-[400px]"
            />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>
        <div className="info text-gray-800 text-sm w-full md:w-1/2">
          <div className="flex items-center justify-between">
            <h1 className="titulo text-xl font-semibold text-red-700 mb-2">
              Ficha de <span className="nombre">{animalInformacion.nombre}</span>
            </h1>
            {muestraBotonEditar()}
          </div>
          {/* Mostrar etiquetas de disponibilidad */}
          {animalInformacion.disponibilidad
            ? animalInformacion.disponibilidad
                .split(",")
                .filter(Boolean)
                .map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded mb-2 mr-2"
                  >
                    <i>
                      {item.trim().toLowerCase() === "acogida" && "🏠 "}
                      {item.trim().toLowerCase() === "apadrinar" && (
                        // Icono de moneda SVG
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="inline w-4 h-4 mr-1"
                          style={{ verticalAlign: "middle" }}
                        >
                          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="#facc15" />
                          <text x="10" y="14" textAnchor="middle" fontSize="10" fill="#b45309" fontWeight="bold">€</text>
                        </svg>
                      )}
                      {item.trim().toLowerCase() === "adopción" && "💚 "}
                      {item.trim()}
                    </i>
                  </span>
                ))
          : null}
          
          <div className="detalles space-y-2 bg-gray-100 p-4 rounded-md">
            <p>
              <strong>Nombre:</strong> {animalInformacion.nombre}{" "}<br/>
            
            {/* Mostrar chenil solo si corresponde */}
            {animalInformacion.situacion === "Refugio" && animalInformacion.clase === "perro" && (
              <>
              
              <strong>Chenil:</strong>
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded">
                {numeroChenil !== null && numeroChenil !== undefined && numeroChenil !== 0
                  ? `${numeroChenil}`
                  : "ninguno"}
              </span>
              </>
            )}
            </p>
            <p>
              <strong>Clase:</strong> {animalInformacion.clase}{" "}
              <strong>Nivel:</strong> {animalInformacion.nivel}{" "}
              {esPerro()}
            </p>
            <p>
              <strong>Sexo:</strong> {animalInformacion.sexo}
            </p>
            <p>
              <strong>Desde:</strong> {animalInformacion.fecha_entrada}{" "}
            </p>
            <p>
              <strong>Nacimiento:</strong>{" "}
              {animalInformacion.fecha_nacimiento}{" "}
            </p>
            <p>
              <strong>Raza:</strong> {animalInformacion.raza}
            </p>
            <p>
              <strong>Tamaño:</strong> {animalInformacion.tamaño}{" "}
              <strong>Peso:</strong> {animalInformacion.peso} Kg
            </p>
            <p>
              <strong>Situación:</strong> {animalInformacion.situacion}<br/>
              <strong>Localidad:</strong> {animalInformacion.localidad}
            </p>
            
          </div>
        </div>
      </div>
      <div className="tabs-container border border-gray-300 rounded-md overflow-hidden mb-4 max-w-[800px] w-full">
        {/* Tabs */}
        <div className="tabs flex border-b border-gray-300 overflow-x-auto whitespace-nowrap no-scrollbar">
          {tabs.map((tab) => (
            muestraTabs(tab)
          ))}
        </div>
        {/* Contenido de las tabs */}
        <div className="tab-content mt-4">
          {activeTab === "salud" && (
            <div className="p-4">
              <h1>Información de tratamientos veterinarios</h1>
              {filtrarInfo("veterinario")}
            </div>
          )}

          {activeTab === "higiene" && (
            <div className="higiene p-4">
              <h1>Información de los baños y tratamientos de higiene</h1>
              {filtrarInfo("higiene")}
            </div>
          )}
          {esPerro2()}
          

          {activeTab === "alimentacion" && (
            <div className="p-4">
              <h1>Información de las dietas y alimentación</h1>
              {filtrarInfo("alimentacion")}
            </div>
          )}
          {activeTab === "socializacion" && (
            <div className="p-4">
              <strong>Socialización con personas y otros animales</strong>
              <div>
                {animalInformacion.socializacion}
              </div>
            </div>
          )}
          {activeTab === "otros" && (
            <div className="p-4">
              Otros datos del animal.
              <p>
                <strong>Comportamiento:</strong>{" "}
                {animalInformacion.comportamiento}
              </p>
              <p>
                <strong>Descripcion:</strong>{" "}
                {animalInformacion.descripcion}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row max-w-[800px] w-full">
        <div className="py-4">
          Padrinos, Voluntarios, Adoptantes
          {visualizaUsuariosCuidadores()}
        </div>

        <CalendarioDinamicoAnimal
          reportes={paseos}
          clase={animalInformacion.clase}
          crearPaseo={() => crearPaseo(animalInformacion.nombre)}
          crearReporteGato={() => crearReporteGato(animalInformacion.nombre)}
          onCrearReporte={()=>recargaReportes()}
        />
      </div>
      
      <Modal isOpen={modalsPaseo.crear}
        onClose={() => {
          gestionarModalPaseo("crear", false);
          recargaReportes();
          cargaUsuariosCuidadores(animalInformacion.id_animal);
          navigate(`/pagina-animal/${animalInformacion.id_animal}`);
        }}>
        <PaseoCrear
          animal={animalInformacion}
          voluntario={idUsuario}
          onClose={() => {
            gestionarModalPaseo("crear", false);
            recargaReportes();
            cargaUsuariosCuidadores(animalInformacion.id_animal);
            navigate(`/pagina-animal/${animalInformacion.id_animal}`);
          }}
        />
      </Modal>
      <Modal isOpen={modalsPaseo.consultar}
        onClose={() => gestionarModalPaseo("consultar", false)}>
        <PaseoConsultar paseoInformacion={paseoSeleccionado}
          onClose={() => gestionarModalPaseo("consultar", false)}/>
      </Modal>
      <Modal isOpen={modalsGato.crear}
        onClose={() => {
            gestionarModalGato("crear", false);
            recargaReportes();
            cargaUsuariosCuidadores(animalInformacion.id_animal);
            navigate(`/pagina-animal/${animalInformacion.id_animal}`);
          }}>
        <ReporteGatoCrear
          animal={animalInformacion}
          voluntario={idUsuario}
          onClose={() => {
            gestionarModalGato("crear", false);
            recargaReportes();
            cargaUsuariosCuidadores(animalInformacion.id_animal);
            navigate(`/pagina-animal/${animalInformacion.id_animal}`);
          }}/>
      </Modal>
      <Modal
        isOpen={modalsGato.consultar}
        onClose={() => gestionarModalGato("consultar", false)}>
        <ReporteGatoConsultar
          nombreAnimal={animalInformacion.nombre}
          voluntario={idUsuario}
          onClose={() => {gestionarModalGato("consultar", false)}}/>
      </Modal>
      <Modal isOpen={modalsAnimal.editar}
        onClose={() => gestionarModalAnimal("editar", false)}>
        <EditarAnimal animal={animalInformacion}
        onClose={()=>gestionarModalAnimal("editar",false)}/>
      </Modal>
     
    </div>
  );
};

export default PaginaAnimal;