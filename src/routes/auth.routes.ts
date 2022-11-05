import { Router } from 'express'
import { registroPersona } from '../controllers/auth.controller'
import { crearPersona } from '../middlewares/validators/auth.validator'

const router = Router()

// router.post('/registroDocente', datosDocente(), registroDocente)
router.post('/registroPersona', crearPersona,  registroPersona)

export default router