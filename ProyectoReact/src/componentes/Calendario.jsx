import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "./Modal.jsx";
import ReporteDiarioCrear from "./ReporteDiarioCrear.jsx";
const Calendario = () => {
  const [fechaBase, setFechaBase] = useState(new Date());
  //Aqui se inicializa la variable para los reportes
  const [reportesDia, setReportesDia] = useState([]);

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
      return nuevaFecha;
    });
    
  };

  const semanaActual = obtenerSemana(fechaBase);
  const [numeroSemana, setNumeroSemana] = useState(0);
  //Cargamos los reportes de la semana actual
  const enviarDatos = async () => {
    const funcion = "reportesdiario";
    const datosEnviar = {
      funcion,
      fecha_inicial: `${semanaActual[0].año}-${String(semanaActual[0].mesnum).padStart(2, '0')}-${String(semanaActual[0].diaMes).padStart(2, '0')}`, // Formato YYYY-MM-DD
      fecha_final: `${semanaActual[6].año}-${String(semanaActual[6].mesnum).padStart(2, '0')}-${String(semanaActual[6].diaMes).padStart(2, '0')}` // Formato YYYY-MM-DD
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
      console.log("Respuesta del servidor:", data);
  
      if (Array.isArray(data)) {
        setReportesDia(data); // Actualizar el estado con los datos recibidos
      } else {
        console.error("La respuesta no tiene el formato esperado:", data);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  useEffect(() => {
    enviarDatos(); // Llamar a la función dentro de useEffect
    //console.log("reportesDia: ",reportesDia);
  }, []);
    /*
    const obtenerNumeroSemana = (fecha) => {
      const añoInicio = new Date(fecha.getFullYear(), 0, 1);
      const primerJueves = new Date(fecha.getFullYear(), 0, 4); // Primer jueves del año
      const diferencia = fecha - primerJueves;
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      return Math.ceil((dias + primerJueves.getDay() + 1) / 7);
    };
    */
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
      console.log("diaFormateado: ",diaFormateado);
      console.log(reportesDia.find((reporte) => reporte.fecha === diaFormateado  && reporte.horario === turno));
      const reportesEncontrados = reportesDia.filter(
        (reporte) => reporte.fecha === diaFormateado && reporte.horario === turno
      );
      //const usuarioEncontrado = buscarUsuarioPorId(reporteEncontrado.usuario? reporteEncontrado.usuario:0);
      //console.log("usuarioEncontrado: ",usuarioEncontrado);
      return (
        <td key={index} className={`border p-2 h-24 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'}`}>
          {reportesEncontrados.length > 0 ? (
              // Renderiza todos los reportes encontrados
              reportesEncontrados.map((reporte, i) => (
                <div key={i}>
                  <p>{reporte.nombre_usuario}</p>
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
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => cambiarSemana(-7)}
          className="flex items-center text-gray-600"
        >
          <ArrowLeft className="mr-2" /> Anterior
        </button>
        <h2 className="text-xl font-semibold">Semana {numeroSemana}</h2>
        <button
          onClick={() => cambiarSemana(7)}
          className="flex items-center text-gray-600"
        >
          Siguiente <ArrowRight className="ml-2" />
        </button>
      </div>
      <p className="text-center text-gray-500 mb-4">
        {semanaActual.length > 0 &&
          `Del ${semanaActual[0].diaSemana} ${semanaActual[0].diaMes} de ${semanaActual[0].mes} al ${semanaActual[6].diaSemana} ${semanaActual[6].diaMes} de ${semanaActual[6].mes} del ${semanaActual[6].año}`}
      </p>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Turnos</th>
            <th className="p-2 border w-24">Personal</th>
            {semanaActual.map(({ diaSemana, diaMes, mesnum }, index) => (
              <th key={index} className={`p-2 border text-gray-800 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'}`}>
                {diaSemana} <br /> <span className="font-bold">{diaMes}/{mesnum}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {["MAÑANA", "TARDE"].map((turno, i) => (
            <React.Fragment key={turno}>
              <tr key={`${turno}-1`}>
                <td className="border p-2 h-24" rowSpan={2}>{turno}</td>
                <td className="border p-2 h-24 w-24">Voluntarios</td>
                {semanaActual.map(({  diaMes, mesnum,año }, index) => (
                  compruebaReporte(  diaMes, mesnum,año ,turno,index)
                  //<td key={index} className={`border p-2 h-24 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'}`}>{diaMes}</td>
                ))}
              </tr>
              <tr key={`${turno}-2`}>
                <td className="border p-2 h-24 w-24">Padrinos y adoptantes</td>
                {semanaActual.map((_, index) => (
                  <td key={index} className={`border p-2 h-24 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'}`}></td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Button className="bg-purple-600 text-white px-4 py-2 rounded">
          APÚNTAME
        </Button>
      </div>
      <Modal isOpen={modals.crear} onClose={()=>gestionarModal("crear",false)}>      
          <ReporteDiarioCrear onClose={()=>gestionarModal("crear",false)} />
      </Modal>    
    </div>
  );
};

export default Calendario;
