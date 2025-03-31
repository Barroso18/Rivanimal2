import React, { useState, useEffect } from "react";
import Button from "./Button.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  
    const obtenerNumeroSemana = (fecha) => {
      const añoInicio = new Date(fecha.getFullYear(), 0, 1);
      const primerJueves = new Date(fecha.getFullYear(), 0, 4); // Primer jueves del año
      const diferencia = fecha - primerJueves;
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      return Math.ceil((dias + primerJueves.getDay() + 1) / 7);
    };
    useEffect(() => {
      setNumeroSemana(obtenerNumeroSemana(fechaBase));
     }, []);
     /* SIN TERMINAR!!! */
    const compruebaReporte = (dia) => {
      const diaFormateado = `${dia.diaMes}/${dia.mesnum}/${dia.año}`;
      return (
        <td key={index} className={`border p-2 h-24 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'}`}>
          {reportesDia.some((reporte) => reporte.fecha === diaFormateado)/*SIN TERMINAR*/ }
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
            <>
              <tr key={`${turno}-1`}>
                <td className="border p-2 h-24" rowSpan={2}>{turno}</td>
                <td className="border p-2 h-24 w-24">Voluntarios</td>
                {semanaActual.map((_, index) => (
                  <td key={index} className={`border p-2 h-24 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'}`}></td>
                ))}
              </tr>
              <tr key={`${turno}-2`}>
                <td className="border p-2 h-24 w-24">Padrinos y adoptantes</td>
                {semanaActual.map((_, index) => (
                  <td key={index} className={`border p-2 h-24 ${index >= 0 && index <= 8 ? 'w-32' : 'w-auto'}`}></td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Button className="bg-purple-600 text-white px-4 py-2 rounded">
          APÚNTAME
        </Button>
      </div>
    </div>
  );
};

export default Calendario;
