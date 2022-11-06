import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Persona from "../db/models/Persona";

interface JwtPayload {
	uuid: string
}

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: `No hay token en la petición`,
    });
  }

  try {
    const {uuid} = jwt.verify(token, process.env.SECRET_JWT!) as JwtPayload;
    const persona = await Persona.findByPk(uuid)

    if (!persona) {
      return res.status(401).json({
        msg: `Token no válido - pongase en contacto con el administrador`,
      });
    }

    req.persona = persona!;
    req.uid = uuid.toString();
    next();
  } catch (error) {
    res.status(401).json({
        msg:'Token no valido',
        error
    });
  }
};
