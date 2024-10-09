//En este archivo están la "base de datos" que es una lista
let admins = {
    Nombre: "El viejo",
    Apellido: "administrador",
    User: "admin",
    Password: "admin"
}
let estudiantes = [
    {
        Nombre: "Sebastian",
        Apellido: "Gutierrez",
        User: "202300694",
        Password: "1234"
    },
    {
        Nombre: "Eduardo",
        Apellido: "Gutierrez",
        User: "202300594",
        Password: "contra"
    },
];
let profesores = [
    {
        "Nombre": "Rodolfo",
        "User": "202015565",
        "Password": "1234"
    },
    {
        "Nombre": "Josue",
        "User": "2022001095",
        "Password": "1234"
    },
]

export async function login(req, res) {
    
    try {
        const data = req.body;
        const student = estudiantes.find(temporal => (data.User === temporal.User && data.Password === temporal.Password));
        const prof = profesores.find(temporal => (data.User === temporal.User && data.Password === temporal.Password));

    
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
        return res.status(400).json({"response": 'Error del cliente'})
    }
}