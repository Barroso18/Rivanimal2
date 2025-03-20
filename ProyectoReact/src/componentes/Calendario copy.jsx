import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState,useEffect, React } from 'react';
const Calendario = () => {
    /*new Calendar(container, {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        },
        selectable: true,
        events: [
          {id: 1, title: "Event 1", start:"2023-09-05", end:"2023-09-10"},
          {id: 2, title: "Event 2", start:"2023-09-12", end:"2023-09-14"}],
        eventClick: (eventInfo)=>{console.log('Click on Event')},
        select: (dateRange)=>{console.log("Selected date range in calendar")},
      });
    return (
        <div id="calendario"></div>
    );*/

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const [events, setEvents] = useState({});
  
    const handleAddEvent = (day) => {
      const event = prompt(`Agregar evento para ${day}:`);
      if (event) {
        setEvents((prev) => ({
          ...prev,
          [day]: [...(prev[day] || []), event],
        }));
      }
    };
  
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Calendario Semanal</h2>
        <table style={{ width: "80%", margin: "0 auto", borderCollapse: "collapse" }}>
        <thead>
            
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px", background: "#f4f4f4" }}>
                Turnos
            </th>
            {daysOfWeek.map((day) => (
              <th key={day} style={{ border: "1px solid #ddd", padding: "10px", background: "#f4f4f4" }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "10px", verticalAlign: "top" }}>
                <tr>
                    Mañana
                    <tr>
                        Voluntarios
                    </tr>
                    <tr>
                        Padrinos
                    </tr>
                </tr>
                <tr>
                    Tarde
                    <tr>
                        <td style={{ border: "1px solid #ddd", padding: "10px", verticalAlign: "top" }}>
                            Voluntarios
                        </td>
                        
                    </tr>
                    <tr>
                        Padrinos
                    </tr>
                </tr>
            </td>
            {daysOfWeek.map((day) => (
              <td key={day} style={{ border: "1px solid #ddd", padding: "10px", verticalAlign: "top" }}>
                <button onClick={() => handleAddEvent(day)}>Agregar Evento</button>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {(events[day] || []).map((event, index) => (
                    <li key={index} style={{ padding: "5px", background: "#e3e3e3", margin: "5px 0" }}>{event}</li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      </div>
    );
}

export default Calendario;
