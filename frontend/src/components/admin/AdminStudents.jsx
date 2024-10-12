import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function AdminStudents(){
    //Se recupera la cookie del login
    const [cookie, setCookie, removeCookie] = useCookies(['admin']);
    const navigate = useNavigate(); //Para navegar entre páginas
    const [pageState, setPageState] = useState(true); //Estado incial que va a cambiar para que se renderice la página
    const [studentList, setStudentList] = useState([]); //Array con la lista de estudiantes

    //Función que se ejecutará cada vez que se detecte un cambio y va a renderizar los componentes nuevamente
    useEffect(() => {
        fetch('http://localhost:4000/admin/students', {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                setStudentList(res);
            })
            .catch(err => console.log(err));
    }, [pageState])

    //Función para cerrar sesión:
    function handleLogout(){
        removeCookie('admin');
        navigate('/login');
    }

    const handleFileUpload = (event) => {
        let respuesta;

        event.preventDefault();
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText( file );
        reader.onload = () => {
            respuesta = JSON.parse(reader.result);
                fetch('http://localhost:4000/admin/students', {
                    method: "POST",
                    body: JSON.stringify(respuesta),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then(res => {
                    console.log(res.state);
                    if(res.state){
                        Swal.fire({
                            title: 'Ok',
                            text: `El archivo fue cargado correctamente`,
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        });   
                        setPageState(!pageState);
                    }
                    else{
                        Swal.fire({
                            title: 'Error',
                            text: `Uno de los elementos no cumple con el formato del archivo. Revise el archivo y vuelva a intentarlo`,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });  
                    }
                })
                .catch(err => console.log(err))
        }
        reader.onerror = () => {
            console.log( reader.error );
        }
    }

    function deleteStudent(CarnetStudent){
        studentList.find(element => element == CarnetStudent);
        fetch(`http://localhost:4000/admin/students/${CarnetStudent}`, {
            method: "DELETE",  
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(res => {
                setPageState(!pageState);
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/admin">Ecys</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/admin/professors">Profesores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/admin/students">Estudiantes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/admin/courses">Cursos</a>
                            </li>
                        </ul>
                        <button className="btn btn-outline-danger ms-auto" type="button" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mt-5 text-center">
                <h1 className="mb-4">ESTUDIANTES</h1>
            </div>

            <div className="container mb-4 d-flex justify-content-start">
                <label
                    htmlFor="file-upload"
                    style={{
                        display: 'inline-block',
                        padding: '7px 20px',
                        backgroundColor: '#006400',
                        color: 'white',
                        borderRadius: '7px',
                        cursor: 'pointer',
                        fontFamily: 'Arial, sans-serif',
                        marginRight: '10px'  
                    }}
                >
                    Carga Masiva
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept='.json'
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <button type="button" className="btn btn-info">Exportar Excel</button>
            </div>

            <div className="container">
                <table className="table table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col">Carnet</th>
                            <th scope="col">Nombres y apellidos</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Género</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map(student => (
                            <tr key={student.Carnet}>
                                <td>{student.Carnet}</td>
                                <td>{`${student.Nombre}`}</td>
                                <td>{student.Correo}</td>
                                <td>{student.Genero}</td>
                                <td>
                                    <button className="btn btn-warning me-2">Editar</button>
                                    <button className="btn btn-danger" onClick={() => deleteStudent(student.Carnet)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default AdminStudents;