import { Router } from "express";
import {
  getAlumnosGrupo,
  getMaterias,
  postGrupo,
  postMateria,
} from "../controllers/materias.controller";
import { validarRolDocente } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";
import {
  registro,
  registroGrupo,
} from "../middlewares/validators/asignatura.validator";

const router = Router();

//* ✅ TODAS LAS MATERIAS
router.get("/", [validarJWT, validarRolDocente], getMaterias);

//* ✅ REGISTRO DE UNA MATERIA CON SU GRUPO 
router.post("/", [validarJWT, validarRolDocente], registro, postMateria);

//* ✅ AGREGARLE GRUPO A UNA ASIGNATURA 
router.post(
  "/:cod_asignatura",
  [validarJWT, validarRolDocente],
  registroGrupo,
  postGrupo
);

//* ✅ OBTENER LOS ALUMNOS DE UNA ASIGNATURA
router.get(
  "/:cod_asignatura/:grupo",
  [validarJWT, validarRolDocente],
  getAlumnosGrupo
);

export default router;
