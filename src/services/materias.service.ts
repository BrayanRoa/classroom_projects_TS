import { sequelize } from '../db/conexion';
import Asignatura from '../db/models/Asignatura';
import Grupo from '../db/models/Grupo';
import { InscribirMateria } from '../interfaces/materia-response.interface';
import Persona from '../db/models/Persona';


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

const estudiantesAsignatura = async (cod_asignatura:string, grupo:string)=>{
    const alumnos = await Persona.findAndCountAll({
        attributes:['nombres', 'apellidos'],
        where:{cod_rol:2},
        include:[{
          model:Grupo,
          required:true, //* ESTA PROPIEDAD EN TRUE HACE QUE INTERNAMENTE SE HAGA UN INNER JOIN ENTRE LA TABLA GRUPO Y PERSONA
          attributes:['nombre','cod_asignatura'],
          where:{nombre:grupo, cod_asignatura:cod_asignatura},
          through:{
            attributes:[] //* IMPORTANTE ESTAS TRES LINEAS HACEN QUE NO SE VEA LA TABLA INTERMEDIA
          },
          include:[{
            model:Asignatura,
            required:false,
            attributes:['nombre'],
            where:{cod_asignatura:'1155719'},
          }]
        }]
      })
    return alumnos
}


export {
    obtenerAsignaturas,
    crearAsignatura,
    estudiantesAsignatura
}