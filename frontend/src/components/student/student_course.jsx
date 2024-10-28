import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './studentCourse.css';
import * as XLSX from 'xlsx';

function StudentCourse(){
    const [cookie, setCookie, removeCookie] = useCookies(['student']);
    let { codigoCurso } = useParams();
    let { carnet } = useParams();

    const [ pageState, setPageState ] = useState(true);
    const [ curso, setCurso ] = useState({});
    const [ actividades, setActividades ] = useState([]);
    const [ ponderacion, setPonderacion ] = useState(0);
    const [ notaObtenida, setNotaObtenida ] = useState(0);

    function setNotaTotal(lista){
        let total = 0;
        lista.forEach(actividad => {
            total += (((actividad.notas.find(stud => stud.carnet == carnet).nota)/100) * actividad.ponderación)
        });
        return total;
    }

    function setPonderacionTotal(lista){
        let total = 0;
        lista.forEach(actividad => (total += actividad.ponderación))
        return total;
    }

    useEffect(() => {
        fetch(`http://localhost:4000/student/${cookie.student.carnet}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {      
                console.log(res.students);
                setCurso(res.cursos.find(curso => curso.codigo == codigoCurso));
                setActividades(res.cursos.find(curso => curso.codigo == codigoCurso).actividades)
                setPonderacion(setPonderacionTotal(res.cursos.find(curso => curso.codigo == codigoCurso).actividades))
                setNotaObtenida(setNotaTotal(res.cursos.find(curso => curso.codigo == codigoCurso).actividades))
            })
            .catch(err => console.log(err));
    }, [pageState])

    const handleFileExport = () => {
        let parametro = actividades;
        parametro.forEach(activity => {
            activity.notas = activity.notas.find(student => student.carnet == carnet).nota
        })

        const libro = XLSX.utils.book_new();
        const hoja = XLSX.utils.json_to_sheet(parametro);

        XLSX.utils.book_append_sheet(libro, hoja, "Actividades");
        let nombre = `${cookie.student.carnet}_${codigoCurso}_Actividades.xlsx`

        XLSX.writeFile(libro, nombre);
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

            <div className="activities-section">
                <h4>Listado de actividades</h4>
                <div className="table-container">
                    <table className="activities-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Ponderación</th>
                                <th>Nota obtenida</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="scrollable-body">
                        <table className="activities-table">
                            <tbody>
                                {actividades.map((activity, index) => (
                                    <tr key={index}>
                                        <td>{activity.nombre}</td>
                                        <td>{activity.descripción}</td>
                                        <td>{activity.ponderación}</td>
                                        <td>{activity.notas.find(student => student.carnet == carnet).nota}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <table className="activities-table total-row">
                        <tbody>
                            <tr>
                                <td></td>
                                <td><strong>TOTAL</strong></td>
                                <td>{ponderacion}</td>
                                <td>{notaObtenida}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="export-button-container">
                    <button className="export-notes-button" onClick={handleFileExport}>Exportar mis notas</button>
                </div>
            </div>



    </>
    )
}

export default StudentCourse;