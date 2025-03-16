import { useEffect, useState } from "react";
import LocalStorageServicio from "./LocalStorageServicio";

function useStateStorage(clave, valorInicial) {

    const [state, setState] = useState(() => {

        console.log("Entras")

        const valorGuardado = LocalStorageServicio.get(clave)

        return valorGuardado !== null ? valorGuardado : valorInicial;

    });

    useEffect(() => {
        console.log(" y aqui tamcien Entras")
        LocalStorageServicio.set(clave, state)
    }, [state])

    return [state, setState]
}



export default useStateStorage
