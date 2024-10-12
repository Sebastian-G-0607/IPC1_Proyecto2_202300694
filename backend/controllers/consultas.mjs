//En este archivo están la "base de datos" que es una lista
let admins = {
    Nombre: "Sebastian",
    Apellido: "Gutierrez",
    User: "admin",
    Password: "admin"
}
let students = []
let professors = []
let courses = []

export async function login(req, res) {
    
    try {
        const data = req.body;
        const student = students.find(temporal => (data.User === temporal.Carnet && data.Password === temporal.Password));
        const prof = professors.find(temporal => (data.User === temporal.Codigo && data.Password === temporal.Password));

    
        //validando si ingresa admin como User y como Password
        if(data.User == "admin" && data.Password == "admin"){
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
            if(element.Carnet === undefined || element.Nombre === undefined || element.Correo === undefined || element.Genero === undefined || element.Contrasenia === undefined){
                band = false;
                break;
            }
        };
        if(band){
            reqBody.forEach(element => {
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
        const id = students.findIndex(stud => stud.Carnet == deletedStudent);
        students.splice(id, 1);
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
            if(element.Codigo === undefined || element.Nombre === undefined || element.Correo === undefined || element.Genero === undefined || element.Contrasenia === undefined){
                band = false;
                break;
            }
        };
        if(band){
            reqBody.forEach(prof => {
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
        const carnet = req.params.codigo;
        const index = professors.findIndex(prof => prof.Codigo == carnet);
        professors.splice(index, 1);
        return res.status(200).json({state: true})
    } catch (error) {
        console.log(error);
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
            if(element.Codigo === undefined || element.Nombre === undefined || element.Creditos === undefined || element.Profesor === undefined){
                band = false;
                break;
            }
        };
        if(band){
            reqBody.forEach(course => {
                course.Alumnos = 0;
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
        const index = courses.findIndex(course => course.Codigo == codigo);
        courses.splice(index, 1);
        return res.status(200).json({state: true})
    } catch (error) {
        console.log(error);
    }
}