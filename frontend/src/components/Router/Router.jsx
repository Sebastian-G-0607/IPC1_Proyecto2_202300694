import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../Login.jsx'
import Admin from '../Admin.jsx'


function Router() {
    return (
       <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/' element={<Navigate to='/login' />} />
            </Routes>
       </BrowserRouter>
    );
}

export default Router;