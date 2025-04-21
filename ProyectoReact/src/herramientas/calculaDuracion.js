export function calculaDuracion(fecha_hora_inicio, fecha_hora_fin) {
    const inicio = new Date(fecha_hora_inicio);
    const fin = new Date(fecha_hora_fin);

    // Calcular la diferencia en milisegundos
    const diferencia = fin - inicio;

    // Convertir la diferencia a minutos
    const minutos = Math.floor(diferencia / 60000);

    return minutos;
}