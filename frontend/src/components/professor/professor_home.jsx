import React from 'react';
import { ProfessorCourses } from '../professorCourses.jsx';
import './course.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function ProfessorHome() {
    const [pageState, setPageState] = useState(true);
    const [listaCursos, setListaCursos] = useState([]);
    const [useCookie, setCookie, removeCookie] = useCookies(['professor'])
    const navigate = useNavigate();

    useEffect(() => {
        // fetch('http://localhost:4000/admin/courses', {
        //     method: "GET"
        // })
        // .then(response => response.json())
        // .then(res => {
        //     setListaCursos(res)
        // })
        setListaCursos(useCookie.professor.cursos)
        console.log(listaCursos);
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