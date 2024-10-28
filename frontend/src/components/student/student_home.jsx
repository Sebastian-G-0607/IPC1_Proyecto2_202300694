import React from 'react';
import { StudentCourses } from '../studentCourses.jsx';
import './studentHome.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function StudentHome() {
    const [useCookie, setCookie, removeCookie] = useCookies(['student'])
    const [pageState, setPageState] = useState(true);
    const [listaCursos, setListaCursos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/student/${useCookie.student.carnet}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                setListaCursos(res.cursos);
            })
            .catch(err => console.log(err));
    }, [pageState])

    function handleLogout(){
        removeCookie(['student']);
        navigate('/login')
    }

    return (
        <>
            <div className="header-container">
                <h1>{`Mis cursos asignados - ${useCookie.student.nombre}`}</h1>
                <button className="btn btn-outline-danger" type="button" onClick={() => handleLogout()}>
                    Cerrar sesión
                </button>
            </div>

            <div className="content-container">
                {listaCursos.map(curso => (
                    <StudentCourses key={curso.codigo} codigo={curso.codigo} nombreCurso={curso.nombre} profesor={curso.profesor} />
                ))}
            </div>
        </>
    )
}

export default StudentHome;