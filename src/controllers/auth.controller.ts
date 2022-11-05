import { Request, Response } from "express";
import {
  authPersona,
  // authDocente,
  excelEstudiantes,
} from "../services/auth.service";

// const registroDocente = async (req: Request, res: Response) => {
//   try {
//     const docente = await authDocente(req.body);
//     res.status(201).json({
//       docente,
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: `No se pudo registrar el docente ${error}`,
//     });
//     console.log(error);
//   }
// };

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
    await excelEstudiantes(req.files, asignatura, grupo);
    res.status(201).json({
      Alumnos: `Alumnos inscritos con exito`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export { 
  // registroDocente, 
  registroPersona, 
  cargarExcelAlumnos
};
