import { Router } from 'express'
import { getAlumnosGrupo, getMaterias, postGrupo, postMateria } from '../controllers/materias.controller';
import { registro } from '../middlewares/validators/asignatura.validator';

const router = Router();

router.get('/', getMaterias);

router.post('/', registro , postMateria)

router.post('/:cod_asignatura', postGrupo)

router.get('/:cod_asignatura', getAlumnosGrupo)

export default router