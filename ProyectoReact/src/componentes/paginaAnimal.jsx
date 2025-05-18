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
import { buscaReportePorFecha } from "../herramientas/buscaReportePorFecha.js";
import ListaReportesGatos from "./ListaReportesGatos.jsx";
import ListaReportesPaseos from "./ListaReportesPaseos.jsx";
import Roles from "./Roles.jsx";

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
    }
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
  // Asegúrate de que las fechas estén en formato YYYY-MM-DD para los inputs y para mostrar
  function formateaFecha(fecha) {
    if (!fecha) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
    const d = new Date(fecha);
    if (isNaN(d)) return '';
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }
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
  function filtrarInfo(filtro) {
    if (tratamientos != null) {
      if(buscaTratamientoTipo(filtro, tratamientos) != null){
        const tratamientosFiltrado = buscaTratamientoTipo(filtro, tratamientos);
        //return tratamientosFiltrado;
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
      }
      
    }
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
  }

  async function cargaUsuariosCuidadores(id_animal){
        await ServicioAnimales.buscaUsuariosPorAnimal(id_animal)
        .then((response) => {
          //Hay que controlar si no existen registros
          console.log ("Usuarios: ", response.data);
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
        return <p>No hay usuarios cuidadores.</p>;
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
      return (<button className="add-info-btn" onClick={() => editarAnimal()}>Editar</button> );
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
      <div className="ficha-container bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">
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
        {muestraBotonEditar()}
          <h1 className="titulo text-xl font-semibold text-red-700 mb-2">
            Ficha de <span className="nombre">{animalInformacion.nombre}</span>
          </h1>
          <span className="adopcion inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded mb-4">
            <i>💚 En adopción</i>
          </span>
          
          <div className="detalles space-y-2 bg-gray-100 p-4 rounded-md">
            <p>
              <strong>Nombre:</strong> {animalInformacion.nombre}{" "}
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
              <strong>Fecha de nacimiento:</strong>{" "}
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
              <strong>Situación:</strong> {animalInformacion.situacion}
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
            <div>
              {filtrarInfo("veterinario")}
            </div>
          )}

          {activeTab === "higiene" && (
            <div className="higiene">Información de la higiene del animal.</div>
          )}
          {esPerro2()}
          

          {activeTab === "alimentacion" && (
            <div>{filtrarInfo("alimentacion")}</div>
          )}
          {activeTab === "socializacion" && (
            <div>Socialización con personas y otros animales.</div>
          )}
          {activeTab === "otros" && (
            <div>
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
      <div>
        Padrinos, Voluntarios, Adoptantes
        {visualizaUsuariosCuidadores()}
      </div>
      {agregarBotonesReportes()}
      
      <Modal isOpen={modalsPaseo.crear}
        onClose={() => gestionarModalPaseo("crear", false)}>
        <PaseoCrear nombreAnimal={animalInformacion.nombre}
          voluntario={idUsuario}
          onClose={() => gestionarModalPaseo("crear", false)}/>
      </Modal>
      <Modal isOpen={modalsPaseo.consultar}
        onClose={() => gestionarModalPaseo("consultar", false)}>
        <PaseoConsultar paseoInformacion={paseoSeleccionado}
          onClose={() => gestionarModalPaseo("consultar", false)}/>
      </Modal>
      <Modal isOpen={modalsGato.crear}
        onClose={() => gestionarModalGato("crear", false)}>
        <ReporteGatoCrear
          nombreAnimal={animalInformacion.nombre}
          voluntario={idUsuario}
          onClose={() => gestionarModalGato("crear", false)}/>
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