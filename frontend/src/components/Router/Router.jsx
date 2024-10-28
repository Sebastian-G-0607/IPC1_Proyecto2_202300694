import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login.jsx';
import Admin from '../admin/Admin.jsx';
import AdminStudents from '../admin/AdminStudents.jsx';
import AdminProfessors from '../admin/AdminProfessors.jsx';
import AdminCourses from '../admin/AdminCourses.jsx';
import ProfessorHome from '../professor/professor_home.jsx';
import ProfessorCourse from '../professor/professor_course.jsx';
import StudentHome from '../student/student_home.jsx';
import StudentCourse from '../student/student_course.jsx';
import Mejores5 from '../graphs/Mejores5.jsx';
import Peores5 from '../graphs/Peores5.jsx';
import Home from '../home/home.jsx';


function Router() {
    return (
       <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/admin/students' element={<AdminStudents />} />
                <Route path='/admin/professors' element={<AdminProfessors />} />
                <Route path='/admin/courses' element={<AdminCourses />} />
                <Route path='/professor/:codigo/home' element={<ProfessorHome />} />
                <Route path='/professor/:codigo/course/:codigoCurso' element={<ProfessorCourse />} />
                <Route path='/professor/:codigo/course/:codigoCurso/graphs/5b' element={<Mejores5 />} />
                <Route path='/professor/:codigo/course/:codigoCurso/graphs/5w' element={<Peores5 />} />
                <Route path='/student/:carnet/home' element={<StudentHome />}/>
                <Route path='/student/:carnet/course/:codigoCurso' element={<StudentCourse />}/>
                <Route path='/' element={<Navigate to='/home' />} />
            </Routes>
       </BrowserRouter>
    );
}

export default Router;