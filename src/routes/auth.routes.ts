import { Router } from 'express'
import { cargarExcelAlumnos, registroPersona } from '../controllers/auth.controller'
import { crearPersona, inscribirAlumnosMateria } from '../middlewares/validators/auth.validator'

const router = Router()

//* CON ESTE ENDPOINT REGISTRO PROFESORES Y ALUMNOS
router.post('/registroPersona', crearPersona,  registroPersona)

router.post('/registroAlumnos/:asignatura/:grupo', inscribirAlumnosMateria, cargarExcelAlumnos)

export default router