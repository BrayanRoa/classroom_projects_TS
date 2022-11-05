// import { IPersona } from "../interfaces/persona.interface";
import Persona from "../db/models/Persona";
import { puedoMatricular } from "../helpers/validar-persona-materia";
import { sequelize } from "../db/conexion";
import { PersonaResponse } from '../interfaces/persona-response.interface';

const authDocente = async (docente: PersonaResponse): Promise<Persona> => {
  docente.nombres = docente.nombres.toLowerCase();
  docente.apellidos = docente.apellidos.toLowerCase();

  const persona = await Persona.create({ ...docente });
  return persona;
};

const authPersona = async (
  persona: PersonaResponse,
  asignatura: string,
  _grupo: string
): Promise<string> => {

  persona.nombres = persona.nombres.toLowerCase();
  persona.apellidos = persona.apellidos.toLowerCase();

  const [data, info, materia] = await puedoMatricular(
    persona.correo_institucional,
    asignatura
  );
    console.log(materia);
  let msg = `El alumno ya se encuentra registrado en la materia ${asignatura} grupo: ${materia}`;

  if (!data) {
    await Persona.create({ ...persona }); //* REGISTRO A LA PERSONA EN EL SISTEMA
  }


  if (arrayVacio(info)) {
    await sequelize.query("CALL Materia_Grupo_Estudiante(?,?,?)", {
      replacements: [persona.correo_institucional, _grupo, asignatura],
    });
    msg = `Àlumno registrado con exito en la materia ${asignatura} grupo: ${_grupo}`;
  }
  return msg;
};

const arrayVacio = (arr: any) => !Array.isArray(arr) || arr.length === 0;

export { authDocente, authPersona };
