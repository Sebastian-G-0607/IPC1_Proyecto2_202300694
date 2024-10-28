import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function StudentCourses({ codigo, nombreCurso, profesor }) {
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies(['student']);
    return (
        <div className="course-container">
            <div className="course-cod">{codigo}</div>
            <div className="course-content">
                <div className="course-name">{nombreCurso}</div>
                <div className="course-students">{`Profesor: ${profesor}`}</div>
            </div>
            <div className="course-button" onClick={() => {navigate(`/student/${cookie.student.carnet}/course/${codigo}`)}}><p>VER</p></div>
        </div>
    );
}