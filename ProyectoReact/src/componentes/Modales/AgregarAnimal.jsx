import React, {useEffect,useState} from "react";
import Swal from "sweetalert2";
import servicioAnimales from "../../servicios/servicioAnimales";

const AgregarAnimal = ({onClose})=>{


    const [foto, setFoto] = useState('');
    //Manejador de imagenes
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFoto(file);
            setPreview(URL.createObjectURL(file)); // Mostrar vista previa de la imagen
        }
    };

    const controlaRegistro = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    };

    return(
        <div>
            <form onSubmit={controlaRegistro}>

            </form>
        </div>
    );
}
export default AgregarAnimal;