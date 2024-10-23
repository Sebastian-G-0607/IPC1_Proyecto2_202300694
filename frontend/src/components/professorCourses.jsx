import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function ProfessorCourses({ codigo, nombreCurso, alumnos }) {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['professor']);
    return (
        <div className="course-container">
            <div className="course-cod">{codigo}</div>
            <div className="course-content">
                <div className="course-name">{nombreCurso}</div>
                <div className="course-students">{`Alumnos: ${alumnos.length}`}</div>
            </div>
            <div className="course-button" onClick={() => {navigate(`/professor/${cookie.professor.codigo}/course/${codigo}`)}}><p>VER</p></div>
        </div>
    );
}
