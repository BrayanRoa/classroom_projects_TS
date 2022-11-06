import { Router } from 'express'
import { cargarExcelAlumnos, login, registroPersona } from '../controllers/auth.controller'
import { crearPersona, inscribirAlumnosMateria } from '../middlewares/validators/auth.validator'

const router = Router()

router.post('/login', login);

//* CON ESTE ENDPOINT REGISTRO PROFESORES Y ALUMNOS
router.post('/registroPersona', crearPersona,  registroPersona)

router.post('/registroAlumnos/:asignatura/:grupo', inscribirAlumnosMateria, cargarExcelAlumnos)

export default router