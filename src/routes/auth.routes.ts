import { Router } from "express";
import {
  cargarExcelAlumnos,
  login,
  registroPersona,
} from "../controllers/auth.controller";
import { validarRolDocente } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import {
  crearPersona,
  inscribirAlumnosMateria,
} from "../middlewares/validators/auth.validator";

const router = Router();

router.post("/login", login);

//* ✅ CON ESTE ENDPOINT REGISTRO PROFESORES Y ALUMNOS 
router.post(
  "/registroPersona",
  [validarJWT, validarRolDocente],
  crearPersona,
  registroPersona
);

//* ✅ CON ESTE ENDPOINT CARGO EXCEL DE ESTUDIANTES
router.post(
  "/registroAlumnos/:asignatura/:grupo",
  inscribirAlumnosMateria,
  cargarExcelAlumnos
);

export default router;
