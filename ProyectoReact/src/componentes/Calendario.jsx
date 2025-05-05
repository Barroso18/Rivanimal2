import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "./Modales/Modal.jsx";
import ReporteDiarioCrear from "./Modales/ReporteDiarioCrear.jsx";
import { useAuth } from '../Login/AuthProvider';
import ReporteDiarioConsultar from "./Modales/ReporteDiarioConsultar.jsx";


const Calendario = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const { user, logout } = useAuth();// user?.data.usuario
  const [fechaBase, setFechaBase] = useState(new Date());
  //Aqui se inicializa la variable para los reportes
  const [reportesDia, setReportesDia] = useState([]);
//console.log("idUsuario ",user?.data.id);
  const obtenerSemana = (fecha) => {
    const diaSemana = fecha.getDay(); // 0 (Dom) - 6 (Sáb)
    const inicioSemana = new Date(fecha);
    inicioSemana.setDate(fecha.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1)); // Ajustar al lunes

    return Array.from({ length: 7 }, (_, i) => {
      const nuevaFecha = new Date(inicioSemana);
      nuevaFecha.setDate(inicioSemana.getDate() + i);
      return {
        diaSemana: nuevaFecha.toLocaleDateString("es-ES", { weekday: "long" }),
        diaMes: nuevaFecha.getDate(),
        mes: nuevaFecha.toLocaleDateString("es-ES", { month: "long" }),
        mesnum: nuevaFecha.getMonth() + 1,
        año: nuevaFecha.getFullYear(),
      };
    });
  };
/*
  useEffect(() => {
    let funcion= "reportesdiario";
    fetch(`http://localhost/Rivanimal2/FuncionesPHP/calendario.php?funcion=${funcion}`) // Asegúrate de que la URL es correcta
      .then((response) => response.json())
      .then((data) => setReportesDia(data))
      .catch((error) => console.error("Error al obtener los animales:", error));
  }, []);
*/


  
  //Constantes para gestionar los modales
  const [modals, setModals] = useState({
      crear: false,
      consultar: false,
      editar: false,
  });
  const gestionarModal = (tipoModal, estadoAbierto) => {
    setModals((previoModals) => ({ ...previoModals, [tipoModal]: estadoAbierto }));
  };
  const cambiarSemana = (dias) => {
    setFechaBase((prevFecha) => {
      const nuevaFecha = new Date(prevFecha);
      nuevaFecha.setDate(prevFecha.getDate() + dias);
      setNumeroSemana(obtenerNumeroSemana(nuevaFecha));
  
      // Calcular la nueva semana y cargar los reportes
      const nuevaSemana = obtenerSemana(nuevaFecha);
      enviarDatos(nuevaSemana);
  
      return nuevaFecha;
    });
  };

  const crearReporteDiario = () => {
    //setAnimalSeleccionado(animal) 

    gestionarModal("crear",true)
  };
  const consultarReporteDiario = (reporte) => {
    setReporteSeleccionado(reporte);
    gestionarModal("consultar",true)
  };
  const semanaActual = obtenerSemana(fechaBase);
  const [numeroSemana, setNumeroSemana] = useState(0);
  //Cargamos los reportes de la semana actual
  const enviarDatos = async (semana) => {
    const funcion = "reportesdiario";
    const datosEnviar = {
      funcion,
      fecha_inicial: `${semana[0].año}-${String(semana[0].mesnum).padStart(2, '0')}-${String(semana[0].diaMes).padStart(2, '0')}`, // Formato YYYY-MM-DD
      fecha_final: `${semana[6].año}-${String(semana[6].mesnum).padStart(2, '0')}-${String(semana[6].diaMes).padStart(2, '0')}` // Formato YYYY-MM-DD
    };
    try {
      const response = await fetch('http://localhost/Rivanimal2/FuncionesPHP/calendario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido JSON
        },
        body: JSON.stringify(datosEnviar), // Convertir los datos a JSON
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Obtener el texto del error para depuración
        throw new Error(`Error en la solicitud: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json(); // Convertir la respuesta a JSON
      //console.log("Respuesta del servidor:", data);
  
      if (Array.isArray(data)) {
        setReportesDia(data); // Actualizar el estado con los datos recibidos
      } else {
        if(data.error != 1 && data.error != 2){ 
          console.error("La respuesta no tiene el formato esperado:", data);
        }
        
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  
  const abrDiaSemana = (dia) => {
    const mapa = {
      lunes: 'L',
      martes: 'M',
      miércoles: 'X',
      jueves: 'J',
      viernes: 'V',
      sábado: 'S',
      domingo: 'D',
    };
    return mapa[dia] || dia.charAt(0); // fallback por si acaso
  };

  const recargaDatos = () =>{
    const semana = obtenerSemana(fechaBase);
    enviarDatos(semana);
    gestionarModal("crear", false);
  }

  useEffect(() => {
    const semana = obtenerSemana(fechaBase);
    enviarDatos(semana);// Llamar a la función dentro de useEffect
  }, [fechaBase]);
    
    const obtenerNumeroSemana = (fecha) => {
      const inicioAño = new Date(fecha.getFullYear(), 0, 1); // 1 de enero del año dado
      // Días transcurridos desde el inicio del año
      const diferenciaDias = Math.floor((fecha - inicioAño) / (1000 * 60 * 60 * 24));
      // Número de la semana (dividimos los días transcurridos por 7)
      const numeroSemana = Math.ceil((diferenciaDias + 1) / 7); // +1 para incluir el primer día
      return numeroSemana;
    };
    useEffect(() => {
      setNumeroSemana(obtenerNumeroSemana(fechaBase));
     }, []);
     /* SIN TERMINAR!!! */
    const compruebaReporte = (diaMes, mesnum,año,turno,index) => {
      //console.log("reportesSemana: ",reportesDia);
      const diaFormateado = `${año}-${String(mesnum).padStart(2, '0')}-${String(diaMes).padStart(2, '0')}`;
      //console.log("diaFormateado: ",diaFormateado);
      //console.log(reportesDia.find((reporte) => reporte.fecha === diaFormateado  && reporte.horario === turno));
      const reportesEncontrados = reportesDia.filter(
        (reporte) => reporte.fecha === diaFormateado && reporte.horario === turno
      );
      
      return (
        <td key={index} className={`border p-2 h-36 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'} text-center`}>
          {reportesEncontrados.length > 0 ? (
              // Renderiza todos los reportes encontrados
              reportesEncontrados.map((reporte, i) => (
                <div key={i}className="p-2 truncate text-center" >
                  <button
                    className="text-black-500 hover:underline hover:text-orange-500 font-semibold"
                    onClick={() => consultarReporteDiario(reporte)}
                  >{reporte.nombre_usuario}</button>
                </div>
              ))
              ) : (
              // Si no hay reportes, muestra un texto vacío
              <></>)}
        </td>
      );
      //reportesDia.some((reporte) => reporte.fecha === diaFormateado);
    }
  return (
    <div className="p-4 max-w-4xl mx-auto">
  {/* Cabecera responsive  flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 */}
  <div className="flex flex-row justify-between items-center gap-2 mb-4">
    <button
      onClick={() => cambiarSemana(-7)}
      className="flex items-center text-gray-600 justify-center"
    >
      <ArrowLeft className="mr-2" />
    </button>
    <h2 className="text-lg sm:text-xl font-semibold text-center">Semana {numeroSemana}</h2>
    <button
      onClick={() => cambiarSemana(7)}
      className="flex items-center text-gray-600 justify-center"
    >
      <ArrowRight className="ml-2" />
    </button>
  </div>

  {/* Rango de fechas */}
  <p className="text-center text-gray-500 text-sm sm:text-base mb-4">
    {semanaActual.length > 0 &&
      `Del ${semanaActual[0].diaSemana} ${semanaActual[0].diaMes} de ${semanaActual[0].mes} al ${semanaActual[6].diaSemana} ${semanaActual[6].diaMes} de ${semanaActual[6].mes} del ${semanaActual[6].año}`}
  </p>

  {/* Tabla scrolleable en mobile */}
  <div className="max-xl:overflow-x-auto">
  <table className="w-full h-full border text-xs sm:text-sm lg:text-base">
    <thead>
      <tr>
        <th className="border p-1 sm:p-2 lg:p-3 w-2/12">Turnos</th>
        <th className="border p-1 sm:p-2 lg:p-3 w-2/12">Personal</th>
        {semanaActual.map(({ diaSemana, diaMes, mesnum }, index) => (
          <th
            key={index}
            className="border text-gray-800 text-center truncate whitespace-nowrap w-1/12 p-1 sm:p-2 lg:p-3"
          >
            {/* Escritorio: nombre completo */}
            <span className="hidden lg:block">
              {diaSemana}
              <br />
              <span className="font-bold">{diaMes}/{mesnum}</span>
            </span>
            {/* Intermedia y móvil: abreviado */}
            <span className="block lg:hidden uppercase">
              {abrDiaSemana(diaSemana)}
              <br />
              <span className="font-bold">{diaMes}/{mesnum}</span>
            </span>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {["MAÑANA", "TARDE"].map((turno) => (
        <React.Fragment key={turno}>
          <tr>
            <td className="border p-1 sm:p-2 lg:p-3 h-16 sm:h-20 lg:h-24" rowSpan={2}>
              {turno}
            </td>
            <td className="border p-1 sm:p-2 lg:p-3">Voluntarios</td>
            {semanaActual.map(({ diaMes, mesnum, año }, index) =>
              compruebaReporte(diaMes, mesnum, año, turno, index)
            )}
          </tr>
          <tr>
            <td className="border p-1 sm:p-2 lg:p-3">Padrinos y adoptantes</td>
            {semanaActual.map((_, index) => (
              <td key={index} className="border p-1 sm:p-2 lg:p-3 h-36 sm:h-36 lg:h-36 truncate whitespace-nowrap"></td>
            ))}
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>



  {/* Botón de acción */}
  <div className="flex justify-center mt-4">
    <button
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      onClick={() => crearReporteDiario()}
    >
      APÚNTAME
    </button>
  </div>

  {/* Modal */}
  <Modal isOpen={modals.crear} onClose={() => recargaDatos()}>
    <ReporteDiarioCrear onClose={() => recargaDatos()} />
  </Modal>
  <Modal isOpen={modals.consultar} onClose={() => gestionarModal("consultar", false)}>
    <ReporteDiarioConsultar reporte={reporteSeleccionado}/>
  </Modal>
</div>

  );
};

export default Calendario;
