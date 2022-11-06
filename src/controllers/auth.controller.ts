import { Request, Response } from "express";
import {
  authPersona,
  // authDocente,
  excelEstudiantes,
  loginPersona,
} from "../services/auth.service";

const login = async (req: Request, res: Response) => {
  const { correo_institucional } = req.body;
  try {
    const [persona, token] = await loginPersona(correo_institucional);
    if (!persona) {
      return res.status(400).json({
        msg: `No existe persona con correo ${correo_institucional}`,
      });
    }
    res.status(200).json({
      persona,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

const registroPersona = async (req: Request, res: Response) => {
  let respuesta = {};
  try {
    const { asignatura, grupo, ...alumno } = req.body;
    respuesta = await authPersona(alumno, asignatura, grupo);
    res.status(201).json({
      respuesta,
    });
  } catch (error) {
    res.status(400).json({
      error,
      respuesta,
    });
    console.log(error);
  }
};

const cargarExcelAlumnos = async (req: Request, res: Response) => {
  try {
    const { asignatura, grupo } = req.params;
    const resp = await excelEstudiantes(req.files, asignatura, grupo);
    res.status(201).json({
      resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export { login, registroPersona, cargarExcelAlumnos };
