import { sequelize } from "../db/conexion"
import Grupo from "../db/models/Grupo"
import Persona from "../db/models/Persona"


const puedoMatricular = async(correo_institucional:string, asignatura:string)=>{
    // const {correo_institucional, asignatura} = data
    const [data, existe, materia] = await Promise.all([
        Persona.findByPk(correo_institucional), // ESTE Y EL TERCERO NO ES LO MISMO?
        sequelize.query('CALL Existe_Alumno_Asignatura(?,?)',{
            replacements:[correo_institucional, asignatura]
        }),
        Persona.findByPk(correo_institucional,{
            include:[{
                model:Grupo,
                required:true,
                attributes:['nombre', 'cod_asignatura'],
                through:{
                    attributes:[]
                }
            }]
        })
    ])

    return [data, existe, materia]
}

export {puedoMatricular}