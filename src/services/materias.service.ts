import { sequelize } from '../db/conexion';
import Asignatura from '../db/models/Asignatura';
import Grupo from '../db/models/Grupo';
import { InscribirMateria } from '../interfaces/materia-response.interface';


const obtenerAsignaturas = async():Promise<Asignatura[]>=>{
    const materias = await Asignatura.findAll({
        include:{
            model:Grupo,
            attributes:['cod_grupo', 'nombre']
        }
    });
    return materias
}

const crearAsignatura = async (materia:InscribirMateria)=>{
    console.log(materia.nombre);
    try {
        await sequelize.query('CALL Add_Materia_Grupo_Docente(?,?,?,?,?)',{
            replacements:[
              materia.nombre, 
              materia.cantidad_alumnos, 
              materia.correo_institucional, 
              materia.cod_asignatura, 
              materia.nombreGrupo]
          })
    } catch (error) {
        console.log(error);
        throw new Error(`j`)
    }
}


export {
    obtenerAsignaturas,
    crearAsignatura
}