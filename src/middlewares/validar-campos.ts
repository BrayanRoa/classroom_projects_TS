import { validationResult } from 'express-validator';
import { Request, Response} from 'express'

const validarCampos = (req:Request, res:Response, next:any) => {
	//* VALIDO SI HAY ERRORES A LA HORA DE RECIBIR LOS DATOS
	const errors = validationResult(req);
	console.log('soy yo de nuevo');
	if (!errors.isEmpty()) {
		return res.status(400).json(errors);
	}
	next();
};

export {validarCampos}
