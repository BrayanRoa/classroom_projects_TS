import { Request, Response } from "express";
import {
  crearAsignatura,
  estudiantesAsignatura,
  obtenerAsignaturas,
} from "../services/materias.service";

const getMaterias = async (_req: Request, res: Response) => {
  try {
    const materias = await obtenerAsignaturas();
    res.status(200).json({
      materias,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: `No se pudo mostrar las materias`,
    });
  }
};

const postMateria = async (req: Request, res: Response) => {
  try {
    await crearAsignatura(req.body);
    res.status(201).json({
      msg:`Asignatura ${req.body.cod_asignatura} creada con exito!!!`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
        msg:`Ǹo se pudo inscribir la asignatura`
    })
  }
};

const postGrupo = () => {};

const getAlumnosGrupo = async(req:Request, res:Response) => {

  try {
    const {count, rows} = await estudiantesAsignatura(req.params.cod_asignatura, req.params.grupo)
    res.status(200).json({
      total:count,
      alumnos:rows
    })
  } catch (error) {
    console.log(error);
    res.json({
      error
    })
  }
};

export { getMaterias, postMateria, postGrupo, getAlumnosGrupo };
