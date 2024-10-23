//instancia del framework express
import express from 'express';

//Objeto para hacer rutas
export const router = express.Router();

//Importando los controladores
import { deleteCourses, deleteProfessor, deleteStudent, getActivitiesAndStudents, getCourses, getProfessors, getStudents, login, saveCourses, saveProfessors, saveStudents, updateCourse, updateProfessor, updateStudent, uploadActivities, uploadStudents } from '../controllers/consultas.mjs';

//Creando los endpoints

router.post('/login', login);
router.post('/admin/students', saveStudents)
router.post('/admin/professors', saveProfessors)
router.post('/admin/courses', saveCourses)
router.post('/professors/:professor/:course', uploadActivities)
router.post('/professors/:professor/:course/students', uploadStudents)
router.get('/admin/students', getStudents)
router.get('/admin/professors', getProfessors)
router.get('/admin/courses', getCourses)
router.get('/:professor/:course/activities', getActivitiesAndStudents)
router.delete('/admin/students/:carnet', deleteStudent)
router.delete('/admin/professors/:codigo', deleteProfessor)
router.delete('/admin/courses/:codigo', deleteCourses)
router.put('/admin/professors/edit/:codigo', updateProfessor)
router.put('/admin/students/edit/:carnet', updateStudent)
router.put('/admin/courses/edit/:codigo', updateCourse)

