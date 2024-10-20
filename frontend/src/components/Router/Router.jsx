import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login.jsx';
import Admin from '../admin/Admin.jsx';
import AdminStudents from '../admin/AdminStudents.jsx';
import AdminProfessors from '../admin/AdminProfessors.jsx';
import AdminCourses from '../admin/AdminCourses.jsx';
import ProfessorHome from '../professor/professor_home.jsx';


function Router() {
    return (
       <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/admin/students' element={<AdminStudents />} />
                <Route path='/admin/professors' element={<AdminProfessors />} />
                <Route path='/admin/courses' element={<AdminCourses />} />
                <Route path='/professor/:codigo/home' element={<ProfessorHome />} />
                <Route path='/' element={<Navigate to='/login' />} />
            </Routes>
       </BrowserRouter>
    );
}

export default Router;