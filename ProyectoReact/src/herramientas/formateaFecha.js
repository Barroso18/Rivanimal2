// Asegúrate de que las fechas estén en formato YYYY-MM-DD para los inputs y para mostrar
  export function formateaFecha(fecha) {
    if (!fecha) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
    const d = new Date(fecha);
    if (isNaN(d)) return '';
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }