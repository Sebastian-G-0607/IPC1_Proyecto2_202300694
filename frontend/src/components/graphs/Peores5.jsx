import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import ReporteBar from '../Barchart.jsx';
import './chart.css'

function Peores5(){
    const [ cookie, setCookie, removeCookie ] = useCookies('professor');
    let { codigoCurso } = useParams();
    let curso = cookie.professor.cursos.find(curso => curso.codigo == codigoCurso);
    const [ pageState, setPageState ] = useState(true);
    const [ peores5, setPeores5 ] = useState([]);

    const indexCourse = cookie.professor.cursos.findIndex(curso => curso.codigo == codigoCurso);

    useEffect(() => {
        let promedios = [];
        fetch(`http://localhost:4000/${cookie.professor.codigo}/${codigoCurso}/activities`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                promedios = res.cursos[indexCourse].actividades[0].notas;
                promedios.forEach(estudiante => estudiante.promedio = 0);

                promedios.forEach(estudiante => {
                    let promedio = 0;
                    res.cursos[indexCourse].actividades.forEach(actividad => {
                        if(actividad.notas.findIndex(student => student.carnet == estudiante.carnet) != -1){
                            promedio += ((actividad.notas.find(student => student.carnet == estudiante.carnet).nota)/100 * actividad.ponderación)
                    }})
                    estudiante.promedio = promedio;
                })
                console.log(promedios.sort((a, b) => b.promedio - a.promedio));
                setPeores5(promedios.sort((a, b) => a.promedio - b.promedio).slice(0,5));
            })
            .catch(err => console.log(err));
    }, [pageState])

    return(
        <>
            <div className="page-container">
                <h1 className="page-title">Peores 5 estudiantes</h1>
                <div className="chart-container">
                    <ReporteBar BarData={peores5} />
                </div>
            </div>
        </>
    );
}

export default Peores5;