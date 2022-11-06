import { Request, Response } from 'express';
import { check } from 'express-validator';
import { existeAsignatura, existeCorreoInstitucional, existeGrupo } from '../../helpers/db-validators';
import { validarCampos } from '../validar-campos';


//* TODO: FALTA VALIDAR QUE SEA UN PROFESOR
export const registro = [
    check('correo_institucional').custom(correo => existeCorreoInstitucional(correo, 'materia')),
    check('cod_asignatura').custom(cod => existeAsignatura(cod, 'materia')),
    check('nombreGrupo').custom(nomGrupo => existeGrupo(nomGrupo, 'materia')),  
    (req: Request, res: Response, next: any)=>{
        validarCampos(req, res, next);
    }  
]

//* TODO: VALIDAR QUE EL QUE VEA EL LISTADO SEA UN PROFESOR
export const verMaterias = [
    
]