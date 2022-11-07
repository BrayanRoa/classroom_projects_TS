import { validationResult } from 'express-validator';
import { NextFunction, Request, Response} from 'express'

const validarCampos = (req:Request, res:Response, next:NextFunction) => {
	//* VALIDO SI HAY ERRORES A LA HORA DE RECIBIR LOS DATOS
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	next();
};

const validarRolDocente = (req:Request, res:Response, next:NextFunction)=>{
	console.log(req.persona.cod_rol);
	if(req.persona.cod_rol !== 1){
        return res.status(401).json({
            msg:`No es un Docente - No tiene los permisos necesarios`
        })
    }
    next()
}

export {
	validarCampos,
	validarRolDocente
}
