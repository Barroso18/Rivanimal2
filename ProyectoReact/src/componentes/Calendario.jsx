import React, { useState } from "react";
import  Button  from './Button.jsx';
import { ArrowLeft, ArrowRight } from "lucide-react";

const Calendario = () => {
  const [week, setWeek] = useState(21);
  const [dates, setDates] = useState([
    { day: "Lunes", date: "12/23" },
    { day: "Martes", date: "12/24" },
    { day: "Miércoles", date: "12/25" },
    { day: "Jueves", date: "12/26" },
    { day: "Viernes", date: "12/27" },
    { day: "Sábado", date: "12/28", highlight: true },
    { day: "Domingo", date: "12/29", highlight: true },
  ]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setWeek(week - 1)} className="flex items-center text-gray-600">
          <ArrowLeft className="mr-2" /> Anterior
        </button>
        <h2 className="text-xl font-semibold">Semana {week}</h2>
        <button onClick={() => setWeek(week + 1)} className="flex items-center text-gray-600">
          Siguiente <ArrowRight className="ml-2" />
        </button>
      </div>
      <p className="text-center text-gray-500 mb-4">Del 23 al 29 de diciembre 2024</p>
      <table className="w-full border">
        <thead>
          <tr>
            {dates.map(({ day, date, highlight }) => (
              <th key={date} className={`p-2 border ${highlight ? "text-red-500" : "text-gray-800"}`}>
                {day} <br /> <span className="font-bold">{date}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2" colSpan={7}>Voluntarios</td>
          </tr>
          <tr>
            <td className="border p-2" colSpan={7}>TURNO MAÑANA</td>
          </tr>
          <tr>
            <td className="border p-2">Vol1</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
          <tr>
            <td className="border p-2" colSpan={7}>Padrinos y adoptantes</td>
          </tr>
          <tr>
            <td className="border p-2">Padrino Ohana</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
          <tr>
            <td className="border p-2" colSpan={7}>TURNO TARDE</td>
          </tr>
          <tr>
            <td className="border p-2">Vol1</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
            <td className="border p-2">Vol2</td>
            <td className="border p-2"></td>
            <td className="border p-2"></td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Button className="bg-purple-600 text-white px-4 py-2 rounded">APÚNTAME</Button>
      </div>
    </div>
  );
};


export default Calendario;
