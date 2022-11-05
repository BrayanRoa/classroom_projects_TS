import { check, param } from "express-validator";
import { validarCampos } from "../validar-campos";
import { Request, Response } from 'express'
import { 
    existeCorreoInstitucional, 
    existeCodigo, 
    existeAsignatura, 
    existeGrupo} from '../../helpers/db-validators';

const crearPersona = [
  check("nombres", "Los nombres son requeridos").not().isEmpty(),
  check("apellidos", "Los apellidos son requeridos").not().isEmpty(),
  check("correo_institucional").custom((correo_int) => existeCorreoInstitucional(correo_int)),
  check("codigo").custom(codigo => existeCodigo(codigo)),
  check("cod_rol","el rol es requerido").notEmpty(),
  check('asignatura').custom(asignatura => existeAsignatura(asignatura)),
  check('grupo').custom((grupo:string) => existeGrupo(grupo)),
  (req: Request, res: Response, next: any) => {
    validarCampos(req, res, next);
  },
];

const inscribirAlumnosMateria = [
  param('asignatura').custom(asignatura => existeAsignatura(asignatura)),
  param('grupo').custom(grupo => existeGrupo(grupo)),
  (req: Request, res: Response, next: any) => {
    validarCampos(req, res, next);
  },
]

export { 
  crearPersona,
  inscribirAlumnosMateria
};
