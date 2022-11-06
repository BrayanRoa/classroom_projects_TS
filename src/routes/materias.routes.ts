import { Router } from "express";
import {
  getAlumnosGrupo,
  getMaterias,
  postGrupo,
  postMateria,
} from "../controllers/materias.controller";
import { validarJWT } from "../middlewares/validar-jwt";
import {
  registro,
  registroGrupo,
} from "../middlewares/validators/asignatura.validator";

const router = Router();

//* TODO: COLOCAR QUE EL LISTADO SOLO LO VEAN LOS PROFESORES
router.get("/", getMaterias);

//* REGISTRO DE UNA MATERIA CON SU GRUPO
router.post("/", registro, postMateria);

//* AGREGARLE GRUPO A UNA ASIGNATURA - TODO: OJO CREO QUE ESTA FUNCIONANDO BIEEN PERO HACER PRUEBAS CON EL ENVIO DEL JWT
router.post("/:cod_asignatura", registroGrupo, validarJWT, postGrupo);

//* OBTENER LOS ALUMNOS DE UNA ASIGNATURA - YA TENGO UN MIDDELWARE SOLO FALTA COLOCAR LO DE JWT
router.get("/:cod_asignatura/:grupo", getAlumnosGrupo);

export default router;
