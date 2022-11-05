// import { IPersona } from "../interfaces/persona.interface";
import Persona from "../db/models/Persona";
import { puedoMatricular } from "../helpers/validar-persona-materia";
import { sequelize } from "../db/conexion";
import { PersonaResponse } from "../interfaces/persona-response.interface";
import path from "path";
import readXlsxFile from "read-excel-file/node";
import { validarArchivo } from "../helpers/subir-archivo";
import fs from "fs";

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

//* TODO: ESTOY PASANDO UN FALSO POSITIVO EN EL CASO DE QUE EL ESTUDIANTE YA EXISTA EN LA MATERIA
const excelEstudiantes = async (
  file: any,
  cod_asignatura: string,
  grupo: string
) => {

  const nombreArchivo = await validarArchivo(file);
  const pathArchivo = path.join(__dirname, "../uploads/", nombreArchivo);

  readXlsxFile(pathArchivo)
    .then(async (rows) => {
      rows.shift();

      rows.forEach(async (alumno) => {
        const datos = {
          correo_institucional: alumno[0].toString(),
          asignatura: cod_asignatura,
        };

        const [data, info, _materia] = await puedoMatricular(
          datos.correo_institucional,
          datos.asignatura
        );

        const estudiante = {
          correo_institucional: alumno[0].toString(),
          nombres: alumno[1].toString(),
          apellidos: alumno[2].toString(),
          codigo: alumno[3].toString(),
          cod_rol:2
        };

        if (!data) {
          await Persona.create({ ...estudiante }); //* REGISTRO A LA PERSONA EN EL SISTEMA
        }

        if (arrayVacio(info)) {
          await sequelize.query("CALL Materia_Grupo_Estudiante(?,?,?)", {
            replacements: [
              estudiante.correo_institucional,
              grupo,
              cod_asignatura,
            ],
          });
        }
      });

      //* PREGUNTAMOS SI ESTE EXCEL EXISTE EN NUESTRO SERVIDOR Y LO BORRAMOS
      if (fs.existsSync(pathArchivo)) {
        fs.unlinkSync(pathArchivo);
      }
    })
    .catch((error) => {
      throw new Error(`No se pudo registrar los alumnos en la materia ${error}`);
    });
  };

export { authDocente, authPersona, excelEstudiantes };
