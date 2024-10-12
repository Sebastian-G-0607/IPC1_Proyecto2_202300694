import React, { useState } from "react";
import './Styles/Login.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login(){
    //Variable que almacenará el carnet ingresado
    const [carnet, setCarnet] = useState('');

    //Variable que almacenará el password ingresado
    const [password, setPassword] = useState(''); 

    //Guardamos la cookie en caso el login sea exitoso
    const [cookieUser, setCookieUser] = useCookies([]);
    
    //Se crea el objeto para navegar entre rutas
    const navigate = useNavigate();

    //Se crea el método encargado de recuperar los datos ingresados en el formulario de inicio de sesión
    const Submit_button = (event) =>{
        //con este método evitamos que al darle al botón, se recargue la página
        event.preventDefault();
        //Se guardan los datos, como el valor de las variables carnet y password se actualiza en tiempo
        //real, entonces lo almacenamos en un objeto de tipo json
        const data = {
            User: carnet,
            Password: password
        }

        //Ahora utilizo la función fetch para comunicarme con el backend, enviado el método http, el cuerpo de la petición
        //y las cabeceras
        fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        })
            //Promesa que obtiene la respuesta del backend y la transforma en objeto json
            .then((response) => response.json())
            //Promesa que ejecuta acciones con la respuesta del backend
            .then((res) => {
                console.log(res);
                if(res.state){
                    if(res.role == 0){
                        Swal.fire({
                            title: 'Login!',
                            text: `Welcome: ${res.info.Nombre} ${res.info.Apellido}`,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });
                        
                        setCookieUser('admin', {Nombre: res.info.Nombre, Apellido: res.info.Apellido, User: res.info.User});
                        navigate('/admin');
                    }
                    if(res.role == 1){
                        // Swal.fire({
                        //     title: 'Login!',
                        //     text: `Welcome: ${res.info.Nombre} ${res.info.Apellido}`,
                        //     icon: 'success',
                        //     confirmButtonText: 'Ok'
                        // });
                        setCookieUser('student', {Nombre: res.info.Nombre, Apellido: res.info.Apellido, User: res.info.User});
                        //navigate('/student');
                    }
                    if(res.role == 2){
                        // Swal.fire({
                        //     title: 'Login!',
                        //     text: `Welcome: ${res.info.Nombre} ${res.info.Apellido}`,
                        //     icon: 'success',
                        //     confirmButtonText: 'Ok'
                        // });
                        setCookieUser('professor', {Nombre: res.info.Nombre, Apellido: res.info.Apellido, User: res.info.User});
                        //navigate('/professor');
                    }
                }
                else{
                    Swal.fire({
                        title: 'Error!',
                        text: `Carnet and/or password incorrect.`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    setCarnet("");
                    setPassword("");
                }
            }).catch(err => console.log(err, 'error en la respuesta'));
    }

    return (
        <div className="login-background">
            <div className="container-fluid h-100">
                <div className="row align-items-center h-100">
                    <div className="col-md-6 mx-auto">
                        <h2 className="SistemaEcys mb-5">SISTEMA ECYS</h2>
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Inicio de Sesión</h2>
                                <form onSubmit={Submit_button} className='form-signin w-100 m-auto'>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="texty"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="202400000"
                                            onChange={(e) => setCarnet(e.target.value)}
                                            value={carnet}
                                        />
                                        <label htmlFor="floatingInput">Carnet</label>
                                    </div>
                                    <div className="form-floating" style={{ width: "100%" }}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-primary btn-lg">Iniciar Sesión</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;