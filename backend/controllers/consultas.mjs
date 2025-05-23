//En este archivo están la "base de datos" que es una lista
let admins = {
    nombre: "Sebastian",
    apellido: "Gutierrez",
    codigo: "admin",
    contrasenia: "admin"
}
let students = []
let professors = []
let courses = []

export async function login(req, res) {
    
    try {
        const data = req.body;

        let student = students.find(temporal => (temporal.carnet === data.codigo && temporal.contrasenia === data.contrasenia));
        let prof = professors.find(temporal => (temporal.codigo === data.codigo && temporal.contrasenia === data.contrasenia));

        //validando si ingresa admin como User y como Password
        if(data.codigo == admins.codigo && data.contrasenia == admins.contrasenia){
            return res.status(200).json({ state: true, role: 0, info: admins});
        }
        //Validando se ingresa un estudiante correcto
        else if(student != undefined){
            return res.status(200).json({ "state": true, "role": 1, "info": student });
        }
        //Validando si se ingresa un profesor correcto
        else if(prof != undefined){
            return res.status(200).json({ "state": true, "role": 2, "info": prof });
        }
        else{
            return res.status(400).json({"state": false, "reason": "No matches found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({"state": 'Client error'})
    }
}

export async function getStudents(req, res){
    try {
        return res.status(200).json(students);
    } catch (error) {
        console.log(error, 'Error while getting students');
        return res.status(400).json({state: "Error"})
    }
}

export async function saveStudents(req, res){
    try {
        const reqBody = req.body;
        let band = true;
        for(let element of reqBody){
            if(element.carnet === undefined || element.nombre === undefined || element.correo === undefined || element.genero === undefined || element.contrasenia === undefined){
                band = false;
                break;
            }
        };
        if(band){
            reqBody.forEach(element => {
                element.cursos = [];
                students.push(element);
            });
            return res.status(200).json({state: true})
        }
        else{
            return res.status(400).json({state: false})
        }
    } catch (error) {
        console.log(error);
    }

}

export async function deleteStudent(req, res){
    try {
        const deletedStudent = req.params.carnet;
        const id = students.findIndex(stud => stud.carnet == deletedStudent);
        students.splice(id, 1);
        return res.status(200).json({state: true}) 
    } catch (error) {
        console.log(error);
    }

}

export async function updateStudent(req, res){
    try {
        const body = req.body;
        const carnet = req.params.carnet;
        const index = students.findIndex(student => student.carnet == carnet);

        students[index].nombre = body.nombre;
        students[index].correo = body.correo;
        students[index].genero = body.genero;
        students[index].contrasenia = body.contrasenia;
        
        return res.status(200).json({state: true})
    } catch (error) {
        console.log(error);
    }

}

export async function getProfessors(req, res){
    try {
        return res.status(200).json(professors);
    } catch (error) {
        console.log(error);
    }
}

export async function saveProfessors(req, res){
    try {
        const reqBody = req.body;
        let band = true;
        for(let element of reqBody){
            if(element.codigo === undefined || element.nombre === undefined || element.correo === undefined || element.genero === undefined || element.contrasenia === undefined){
                band = false;
                break;
            }
        };
        if(band){
            reqBody.forEach(prof => {
                prof.cursos = [];
                professors.push(prof);
            })
            return res.status(200).json({state: true})
        }
        else{
            return res.status(400).json({state: false})
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProfessor(req, res){
    try {
        const codigo = req.params.codigo;
        const index = professors.findIndex(prof => prof.codigo == codigo);
        professors.splice(index, 1);
        return res.status(200).json({state: true})
    } catch (error) {
        console.log(error);
    }
}

export async function updateProfessor(req, res){
    try {
        const body = req.body;
        const codigo = req.params.codigo;
        const index = professors.findIndex((prof) => prof.codigo == codigo);

        professors[index].nombre = body.nombre;
        professors[index].correo = body.correo;
        professors[index].genero = body.genero;
        professors[index].contrasenia = body.contrasenia;

        return res.status(200).json({state: true})

    } catch (error) {
        console.log(error);
        return res.status(400).json({state: false})
    }
}

export async function getCourses(req, res){
    try {
        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
    }
}

export async function saveCourses(req, res){
    try {
        const reqBody = req.body;
        let band = true;
        for(let element of reqBody){
            if(element.codigo === undefined || element.nombre === undefined || element.creditos === undefined || element.profesor === undefined){
                band = false;
                break;
            }
        };
        if(band){
            reqBody.forEach(course => {
                
                const index = professors.findIndex(prof => course.profesor == prof.codigo)
                
                if(index != -1){
                    professors[index].cursos.push(course)
                }
                course.alumnos = [];
                course.actividades = [];
                courses.push(course);
            })

            return res.status(200).json({state: true})
        }
        else{
            return res.status(400).json({state: false})
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCourses(req, res){
    try {
        const codigo = req.params.codigo;
        const index = courses.findIndex(course => course.codigo == codigo);
        courses.splice(index, 1);
        return res.status(200).json({state: true})
    } catch (error) {
        console.log(error);
    }
}

export async function updateCourse(req, res){
    try {
        const body = req.body;
        const codigo = req.params.codigo;
        const index = courses.findIndex((course) => course.codigo == codigo);

        courses[index].nombre = body.nombre;
        courses[index].creditos = body.creditos;
        courses[index].profesor = body.profesor;

        return res.status(200).json({state: true})

    } catch (error) {
        console.log(error);
        return res.status(400).json({state: false})
    }
}

export async function uploadActivities(req, res){
    try {
        const reqBody = req.body;
        const codCourse = req.params.course;
        const codProfessor = req.params.professor;
        let band = true;

        for(let element of reqBody){
            if(element.nombre === undefined || element.descripción === undefined || element.ponderación === undefined || element.profesor === undefined || element.notas === undefined){
                band = false;
                break;
            }
        };

        if (band){
            //Se encuentra el índice del curso dentro del back
            const index = courses.findIndex(course => course.codigo == codCourse);
            //Se insertan las actividades en el curso
            reqBody.forEach(activity => {
                courses[index].actividades.push(activity)});

            //Se busca el índice del profesor
            const indexProf = professors.findIndex(prof => prof.codigo == codProfessor);
            //Se busca busca el índice del curso dentro de la lista de cursos del profesor
            const indexNewCourse = professors[indexProf].cursos.findIndex(course => course.codigo == codCourse);
            //se actualiza el curso del profesor
            professors[indexProf].cursos[indexNewCourse] = courses[index];

            return res.status(200).json({state: true})
        }
        else{
            return res.status(400).json({state: false})
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({state: false})
    }
}

export async function getActivitiesAndStudents(req, res){
    try {
        const codCourse = req.params.course;
        const codProfessor = req.params.professor;
        let alumnos = [];

        const indexProf = professors.findIndex(prof => prof.codigo === codProfessor);
        const indexCourse = professors[indexProf].cursos.findIndex(course => course.codigo == codCourse);

        professors[indexProf].cursos[indexCourse].alumnos.forEach(student => {
            let temporal = students.find(std => std.carnet == student.carnet);
            student.nombre = temporal.nombre
        })


        return res.status(200).json({state: true, profe: professors[indexProf], cursos: professors[indexProf].cursos})
    } catch (error) {
        console.log(error);
        return res.status(400).json({state: false})
    }
}

export async function uploadStudents(req, res){
    try {
        const reqBody = req.body;
        const codCourse = req.params.course;
        const codProfessor = req.params.professor;
        let band = true;

        for(let element of reqBody){
            if(element.carnet === undefined){
                band = false;
                break;
            }
        };
        
        if(band){
            const indexProf = professors.findIndex(prof => prof.codigo === codProfessor);
            const index = courses.findIndex(course => course.codigo == codCourse);

            //Añadiendo a cada estudiante su curso asignado
            reqBody.forEach(alumno => {
                let indexStudent = students.findIndex(stud => stud.carnet == alumno.carnet);
                let indexCourse = courses.findIndex(course => course.codigo == codCourse);
                if(indexStudent != -1 && indexCourse != -1){
                students[indexStudent].cursos.push(courses[indexCourse]);
                courses[index].alumnos.push(alumno)}});
    
            const indexCourseProf = professors[indexProf].cursos.findIndex(curso => curso.codigo == codCourse)
    
            professors[indexProf].cursos[indexCourseProf] = courses[index];

            console.log("Estudiantes actualizados asignados a cursos:");
            
            return res.status(200).json({state: true, students: students})
        }
        else{
            return res.status(400).json({state: false})
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({state: false})
    }
}


export async function getStudentCourses(req, res){
    try {
        const carnet = req.params.carnet;
        const index = students.findIndex(student => student.carnet == carnet);

        return res.status(200).json({state: true, cursos: students[index].cursos, students: students})
    } catch (error) {
        console.log(error);
        return res.status(400).json({state: false})
    }
}