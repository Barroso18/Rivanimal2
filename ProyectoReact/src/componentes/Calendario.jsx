import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
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
      });*/
    return (
        <div id="calendario"></div>
    );
}

export default Calendario;
