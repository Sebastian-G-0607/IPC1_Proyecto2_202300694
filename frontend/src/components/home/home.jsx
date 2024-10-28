// eslint-disable-next-line no-unused-vars
import React from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

const Home = () => { 

    const navigate = useNavigate();

    const goLogin = () => {
        navigate('/login');
      };
      

    return (
        <div className="homePage-background">
            <div className="home-container text-center mt-5">
                <header className="header-box p-4 rounded shadow d-flex align-items-center justify-content-center">
                    <h1 className="header-title me-3">Sistema ECYS</h1>
                    <img src='./ecys.png' alt="Logo" className="header-logo img-fluid mb-4"/>
                </header>
                
                <div className="content-box mt-5 p-4 rounded shadow">
                    <section>
                        <h2 className="content-heading">Descripción</h2>
                        <p className="content-text">
                        ¡Bienvenido a la Plataforma ECYS! Aquí, facilitamos la gestión educativa al permitir que profesores y estudiantes interactúen de manera eficiente. En esta página, los profesores encuentran sus cursos asignados y pueden añadir estudiantes a ellos, además de gestionar actividades y evaluar el rendimiento académico de cada alumno. Los estudiantes tienen acceso a sus notas y pueden revisar sus actividades, manteniendo así un registro constante de su progreso.
                        </p>
                        <br />
                        <p className="content-text">
                        La Plataforma ECYS está diseñada para simplificar el día a día en el ámbito académico, convirtiéndose en una herramienta indispensable tanto para profesores como para estudiantes. ¡Explora cada sección y disfruta de la facilidad que ECYS trae al aprendizaje!
                        </p>
                    </section>

                    <section className="mt-5">
                        <h2 className="content-heading">Acerca de</h2>
                        <p className="content-text">
                            La "Plataforma ECYS" es una iniciativa innovadora de la Escuela de Ciencias y Sistemas (ECYS) de la Facultad de Ingeniería de la Universidad de San Carlos de Guatemala (USAC), orientada a la gestión académica para facilitar el trabajo de profesores y estudiantes en el ámbito educativo. La Universidad de San Carlos, con más de tres siglos de historia y siendo la única universidad pública en Guatemala, mantiene su compromiso con la educación de calidad y el desarrollo integral del país. A través de la Facultad de Ingeniería, específicamente en la ECYS, la universidad fomenta el avance en tecnologías de la información y ciencias computacionales, áreas fundamentales en la formación de los futuros ingenieros en sistemas y ciencias de la computación.
                            La plataforma permite a los profesores asignar estudiantes a cursos, supervisar su rendimiento, y administrar actividades académicas, facilitando la interacción y seguimiento en un entorno organizado. Este sistema responde a la misión de la ECYS de promover un enfoque educativo que integra tecnología y conocimientos de ingeniería en sistemas, reforzando la visión de la USAC de formar profesionales éticos y capacitados que contribuyan al desarrollo del país.
                        </p>
                    </section>

                    <section className="mt-5">
                        <h2 className="content-heading">Soporte</h2>
                        <p className="content-text">
                            Creador: Eduardo Sebastian Gutierrez Felipe <br />
                            Email: 3000172270101@ingenieria.usac.edu.gt <br />
                            Teléfono: +502 3436-4024
                        </p>
                    </section>
                </div>

                <button onClick={goLogin} className="btonLogin rounded position-fixed">
                    <i className="fas fa-sign-in-alt me-2"></i> 
                    <img src="inicio.png" className="image-inicio" alt="Iniciar"/>
                    <p className="login-text">Iniciar sesión</p>
                </button>
            </div>
        </div>    
      );
    };
    

export default Home;