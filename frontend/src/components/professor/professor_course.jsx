import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './professorCourse.css';
import Swal from 'sweetalert2'

function ProfessorCourse(){
    const [cookie, setCookie, removeCookie] = useCookies(['professor']);
    let { codigoCurso } = useParams();
    let curso = cookie.professor.cursos.find(curso => curso.codigo == codigoCurso);
    const [ pageState, setPageState ] = useState(true);
    const [ studentsList, setStudentsList ] = useState([]);
    const [ activitiesList, setActivitiesList ] = useState([]);
    const [ ponderacion, setPonderacion ] = useState();

    const indexCourse = cookie.professor.cursos.findIndex(curso => curso.codigo == codigoCurso);

    const suma = (lista) => {
        let resultado = 0;
        lista.forEach(actividad => resultado += actividad.ponderación);
        return resultado;
    }

    useEffect(() => {

        fetch(`http://localhost:4000/${cookie.professor.codigo}/${codigoCurso}/activities`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                setActivitiesList(res.cursos[indexCourse].actividades);
                setStudentsList(res.cursos[indexCourse].alumnos);
                setPonderacion(suma(res.cursos[indexCourse].actividades));

                setCookie('professor', {nombre: res.profe.nombre, codigo: res.profe.codigo, cursos: res.cursos}, { path: '/professor'})
            })
            .catch(err => console.log(err));
    }, [pageState])



    const handleUploadActivities = (event) => {
        let res;
        event.preventDefault();
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText( file );
        reader.onload = () => {
            res = JSON.parse(reader.result);
            fetch(`http://localhost:4000/professors/${cookie.professor.codigo}/${codigoCurso}`, {
                method: "POST",
                body: JSON.stringify(res),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(res => {
                if(res.state){
                    Swal.fire({
                        title: 'Completado',
                        text: `El archivo de actividades fue cargado correctamente`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    setPageState(!pageState);
                }
                else{
                    Swal.fire({
                        title: 'Error',
                        text: `Error al subir el archivo. Por favor vuelva a intentarlo`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });  
                }
            })
            .catch(err => console.log(err))
        }
    }
    
    const handleUploadStudents = (event) => {
        let res;
        event.preventDefault();
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText( file );
        reader.onload = () => {
            res = JSON.parse(reader.result);
            fetch(`http://localhost:4000/professors/${cookie.professor.codigo}/${codigoCurso}/students`, {
                method: "POST",
                body: JSON.stringify(res),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(res => {
                if(res.state){
                    Swal.fire({
                        title: 'Completado',
                        text: `El archivo de estudiantes fue cargado correctamente`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    setPageState(!pageState);
                }
                else{
                    Swal.fire({
                        title: 'Error',
                        text: `Error al subir el archivo. Por favor vuelva a intentarlo`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });  
                }
            })
            .catch(err => console.log(err))
        }
    }

    return(
        <>
            <div className="course-info">
                <h2>CURSO:</h2>
                <p>{curso.nombre}</p>
            </div>
            <div className="course-info">
                <h2>CODIGO:</h2>
                <p>{codigoCurso}</p>
            </div>

            <div className="container-prof-course">
                <div className="left-section-prof-course">
                    <h2>Listado de alumnos</h2>
                        <table className="table-prof-course-left">
                            <thead>
                                <tr>
                                    <th className="th-prof-course">Carnet</th>
                                    <th className="th-prof-course">Nombre completo</th>
                                </tr>
                                {studentsList.map(student => (
                                    <tr key={student.carnet}>
                                        <td>{student.carnet}</td>
                                        <td>{student.nombre}</td>
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                </div>

                <div className="right-section-prof-course">
                    <div className="right-header">
                        <h2>Listado de actividades</h2>
                        <p>{`Acumulado ${ponderacion}/100`}</p>
                    </div>
                    <div className="table-container">
                        <table className="table-prof-course-right">
                            <thead>
                                <tr>
                                    <th className="th-prof-course">Nombre</th>
                                    <th className="th-prof-course">Descripción</th>
                                    <th className="th-prof-course">Ponderación</th>
                                    <th className="th-prof-course">Promedio</th>
                                </tr>
                                {activitiesList.map((actividad, index ) => (
                                    <tr key={index}>
                                        <td>{actividad.nombre}</td>
                                        <td>{actividad.descripción}</td>
                                        <td>{actividad.ponderación}</td>
                                        <td>100</td>
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div className="button-container">
                        <input type="file" className="cargar-a" id="cargar-actividades" onChange={handleUploadActivities} />
                        <label htmlFor="cargar-actividades" className="cargar-a">Cargar actividades</label>

                        <input type="file" className="cargar-a" id="cargar-alumnos" onChange={handleUploadStudents} />
                        <label htmlFor="cargar-alumnos" className="cargar-a">Cargar alumnos</label>
                    </div>

                </div>
            </div>
        </>

    )
}

export default ProfessorCourse;