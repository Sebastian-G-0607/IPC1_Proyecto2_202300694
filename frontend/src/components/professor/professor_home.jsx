import React from 'react';
import { ProfessorCourses } from '../professorCourses.jsx';
import './professorHome.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function ProfessorHome() {
    const [pageState, setPageState] = useState(true);
    const [listaCursos, setListaCursos] = useState([]);
    const [useCookie, setCookie, removeCookie] = useCookies(['professor'])
    const navigate = useNavigate();

    useEffect(() => {
        setListaCursos(useCookie.professor.cursos)
    }, [pageState])

    function handleLogout(){
        removeCookie(['professor']);
        navigate('/login')
    }

    return (
        <>
            <div className="header-container">
                <h1>{`Mis cursos impartidos - ${useCookie.professor.nombre}`}</h1>
                <button className="btn btn-outline-danger" type="button" onClick={() => handleLogout()}>
                    Cerrar sesión
                </button>
            </div>

            <div className="content-container">
                {listaCursos.map(curso => (
                    <ProfessorCourses key={curso.codigo} codigo={curso.codigo} nombreCurso={curso.nombre} alumnos={curso.alumnos} />
                ))}
            </div>
        </>
    )
}

export default ProfessorHome;