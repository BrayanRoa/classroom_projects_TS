import { Router } from 'express'
import { getAlumnosGrupo, getMaterias, postGrupo, postMateria } from '../controllers/materias.controller';
import { registro } from '../middlewares/validators/asignatura.validator';

const router = Router();

//* TODO: COLOCAR QUE EL LISTADO SOLO LO VEAN LOS PROFESORES
router.get('/',  getMaterias);

router.post('/', registro , postMateria)

//* TODO: AGREGARLO GRUPO A UNA ASIGNATURA
router.post('/:cod_asignatura', postGrupo)

//* OBTENER LOS ALUMNOS DE UNA ASIGNATURA
router.get('/:cod_asignatura/:grupo', getAlumnosGrupo)

export default router