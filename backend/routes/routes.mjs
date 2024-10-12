//instancia del framework express
import express from 'express';

//Objeto para hacer rutas
export const router = express.Router();

//Importando los controladores
import { deleteCourses, deleteProfessor, deleteStudent, getCourses, getProfessors, getStudents, login, saveCourses, saveProfessors, saveStudents } from '../controllers/consultas.mjs';

//Creando los endpoints

router.post('/login', login);
router.post('/admin/students', saveStudents)
router.post('/admin/professors', saveProfessors)
router.post('/admin/courses', saveCourses)
router.get('/admin/students', getStudents)
router.get('/admin/professors', getProfessors)
router.get('/admin/courses', getCourses)
router.delete('/admin/students/:carnet', deleteStudent)
router.delete('/admin/professors/:codigo', deleteProfessor)
router.delete('/admin/courses/:codigo', deleteCourses)
