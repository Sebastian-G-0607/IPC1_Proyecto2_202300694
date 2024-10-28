import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import ReporteBar from '../Barchart.jsx';
import './chart.css'

function Mejores5(){
    const [ cookie, setCookie, removeCookie ] = useCookies('professor');
    let { codigoCurso } = useParams();
    let curso = cookie.professor.cursos.find(curso => curso.codigo == codigoCurso);
    const [ pageState, setPageState ] = useState(true);
    const [ mejores5, setMejores5 ] = useState([]);

    const indexCourse = cookie.professor.cursos.findIndex(curso => curso.codigo == codigoCurso);

    useEffect(() => {
        let promedios = [];
        fetch(`http://localhost:4000/${cookie.professor.codigo}/${codigoCurso}/activities`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                console.log(res);
                promedios = res.cursos[indexCourse].actividades[0].notas;
                promedios.forEach(estudiante => estudiante.promedio = 0);
                console.log(promedios);

                promedios.forEach(estudiante => {
                    let promedio = 0;
                    res.cursos[indexCourse].actividades.forEach(actividad => {
                        if(actividad.notas.findIndex(student => student.carnet == estudiante.carnet) != -1){
                            promedio += ((actividad.notas.find(student => student.carnet == estudiante.carnet).nota)/100 * actividad.ponderación)
                    }})
                    estudiante.promedio = promedio;
                })
                setMejores5(promedios.sort((a, b) => b.promedio - a.promedio).slice(0,5));
            })
            .catch(err => console.log(err));
    }, [pageState])

    return(
        <>
            <div className="page-container">
                <h1 className="page-title">Mejores 5 estudiantes</h1>
                <div className="chart-container">
                    <ReporteBar BarData={mejores5} />
                </div>
            </div>
        </>
    );
}

export default Mejores5;