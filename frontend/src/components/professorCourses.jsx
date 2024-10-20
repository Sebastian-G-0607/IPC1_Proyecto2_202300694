export function ProfessorCourses({ codigo, nombreCurso, alumnos }) {
    return (
        <div className="course-container">
            <div className="course-cod">{codigo}</div>
            <div className="course-content">
                <div className="course-name">{nombreCurso}</div>
                <div className="course-students">{`Alumnos: ${alumnos}`}</div>
            </div>
            <div className="course-button"><p>VER</p></div>
        </div>
    );
}
