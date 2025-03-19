import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/servicioUsuarios';
import bcrypt from 'bcryptjs';
import axios from 'axios';
//import "../estilos/login.css";
// import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [encryptedPassword, setEncryptedPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const cifrarPassword = () => {
    // Sal (coste de encriptación), el valor 10 es un valor común
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    setEncryptedPassword(hash);
    console.log(hash);
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    //cifrarPassword();
    // David 1234
    // Alex 456
    // ServicioUsuario.login(usuario,password)
    /*ServicioUsuario.login(usuario)
      .then((response) => {
       if(response.data.length !== 0 ){        
        const usuario = response.data[0];
        const hashUsuario = usuario.pass
        const esCorrecta = bcrypt.compareSync(password,hashUsuario);
        if(esCorrecta){
          login(usuario.nombre);
          navigate('/'); 
        }else{
          setError("COntraseña incorrecta");
        }
       }else {
        
        setError("Usuario no es correcto");
       }
      })
      .catch((error) => {   
        alert(error)                 
       navigate('/login'); 
      });  */
      const datosLogin = {
        usuario: usuario,
        contrasena: contrasena,
      };
      axios.post('http://localhost/FuncionesPHP/login.php', datosLogin)
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem('token', response.data.jwt);
          setMensaje('Login exitoso');
        } else {
          setMensaje(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error al autenticar:', error);
        setMensaje('Error en el login');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><strong>Usuario: </strong></label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label><strong>Password: </strong></label>
          {/*
            <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          */}
          <input
            type="password"
            value={password}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {mensaje && <p>{mensaje}</p>}
        <button type="submit">Login</button>
        <Link to="/registro">
          <button>Registro</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
