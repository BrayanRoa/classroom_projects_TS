import { Router } from "express";
import {
  actualizarFotoPerfil,
  actualizarPersona,
} from "../controllers/persona.controller";
// import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from "../middlewares/validar-jwt";
import { existeArchivo } from "../middlewares/existe-archivo";

const router = Router();

router.patch("/:correo", validarJWT, actualizarPersona);

//* 👀 PARA SUBIR IMAGEN DE PERFIL DE LA PERSONA
//* ⚠️ validar que venga el archivo en la petición
router.patch(
  "/uploadImage/:correo",
  [validarJWT, existeArchivo], //* 👮‍♀️ middlewares
  actualizarFotoPerfil
);

export default router;
