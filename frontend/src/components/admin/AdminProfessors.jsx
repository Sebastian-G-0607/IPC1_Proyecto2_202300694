import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function AdminProfessors(){
    //Se recupera la cookie del login
    const [cookie, setCookie, removeCookie] = useCookies(['admin']);
    const navigate = useNavigate(); //Para navegar entre páginas
    const [selectedprofessor, setSelectedProfessor] = useState(null);
    const [pageState, setPageState] = useState(true); //Estado incial que va a cambiar para que se renderice la página
    const [professorList, setProfessorList] = useState([]); //Array con la lista de estudiantes
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [genero, setGenero] = useState("");
    const [contrasenia, setContrasenia] = useState("");


    //Función que se ejecutará cada vez que se detecte un cambio y va a renderizar los componentes nuevamente
    useEffect(() => {
        fetch('http://localhost:4000/admin/professors', {
            method: "GET"
        })
            .then(response => response.json())
            .then(res => {
                setProfessorList(res);
            })
            .catch(err => console.log(err));
    }, [pageState])

    //Función para cerrar sesión:
    function handleLogout(){
        removeCookie(['admin']);
        navigate('/login');
    }

    const handleFileUpload = (event) => {
        let res;

        event.preventDefault();
        let file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText( file );
        reader.onload = () => {
            res = JSON.parse(reader.result);
                fetch('http://localhost:4000/admin/professors', {
                    method: "POST",
                    body: JSON.stringify(res),
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

    function deleteProfessor(idProfessor){
        fetch(`http://localhost:4000/admin/professors/${idProfessor}`, {
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
    
    function selectedProfessor(idProfessor){
        setSelectedProfessor(idProfessor);
        setNombre(idProfessor.nombre);
        setCorreo(idProfessor.correo);
        setGenero(idProfessor.genero);
        setContrasenia(idProfessor.contrasenia);
    }

    function updateProfessor(){

        let data = {
            nombre: nombre,
            correo: correo,
            genero: genero,
            contrasenia: contrasenia
        }

        fetch(`http://localhost:4000/admin/professors/edit/${selectedprofessor.codigo}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json ())
        .then(res => {
            if(res.state){
                Swal.fire({
                    title: 'Completado',
                    text: `El profesor fue actualizado correctamente`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });   
                setPageState(!pageState); 
                setSelectedProfessor(null);
            }
            else{
                Swal.fire({
                    title: 'Error',
                    text: `No se pudo actualizar el profesor`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });  
            }
        })
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
                <h1 className="mb-4">PROFESORES</h1>
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
                            <th scope="col">Código</th>
                            <th scope="col">Nombres y apellidos</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Género</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professorList.map(professor => (
                            <tr key={professor.codigo}>
                                <td>{professor.codigo}</td>
                                <td>{`${professor.nombre}`}</td>
                                <td>{professor.correo}</td>
                                <td>{professor.genero}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => selectedProfessor(professor)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => deleteProfessor(professor.codigo)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedprofessor && (
                <Modal show={true} onHide={() => setSelectedProfessor(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar profesor</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 style={{ margin: '0 10px 0 0', fontSize: '22px' }}>Codigo</h2>
                            <input 
                                type="text" 
                                value={selectedprofessor.codigo} 
                                readOnly 
                                style={{ flex: 1, padding: '5px', border: '1px solid #d3d3d3', borderRadius: '4px' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 style={{ margin: '0 10px 0 0', fontSize: '22px' }}>Nombre</h2>
                            <input 
                                type="text" 
                                placeholder='Nombre del profesor'
                                style={{ flex: 1, padding: '5px', border: '1px solid #d3d3d3', borderRadius: '4px' }} 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 style={{ margin: '0 10px 0 0', fontSize: '22px' }}>Correo</h2>
                            <input 
                                type="text" 
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                style={{ flex: 1, padding: '5px', border: '1px solid #d3d3d3', borderRadius: '4px' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 style={{ margin: '0 10px 0 0', fontSize: '22px' }}>Genero</h2>
                            <input 
                                type="text" 
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                style={{ flex: 1, padding: '5px', border: '1px solid #d3d3d3', borderRadius: '4px' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 style={{ margin: '0 10px 0 0', fontSize: '22px' }}>Contraseña</h2>
                            <input 
                                type="text" 
                                value={contrasenia}
                                onChange={(e) => setContrasenia(e.target.value)}
                                style={{ flex: 1, padding: '5px', border: '1px solid #d3d3d3', borderRadius: '4px' }} 
                            />
                        </div>
                    </Modal.Body>


                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedProfessor(null)}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={() => updateProfessor()}>
                            Guardar cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>

    )
}

export default AdminProfessors;