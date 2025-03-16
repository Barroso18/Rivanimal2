class LocalStorageServicio {

    static get(clave) {

        const item = localStorage.getItem(clave)
        try {
        return item ? JSON.parse(item) : null;

        // Es lo mismo que lo de arriba 
        // if (item === undefined) {
        //  return null
        //} else {
        // return JSON.parse(item)
        //}

        } catch(error) {
            console.log(`Error leyendo el parámetro ${clave}, más detalle ${error}`)
            return null
        }
    }

    static set(clave, valor) {
        try {
            localStorage.setItem(clave, JSON.stringify(valor))
        
        } catch(error) {
            console.log(`Error GUARDANDO el parámetro ${clave} más detalle ${error}`)
            return null
        }
    }

}
export default LocalStorageServicio
