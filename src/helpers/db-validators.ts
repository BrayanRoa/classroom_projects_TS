import Asignatura  from "../db/models/Asignatura"
import Grupo  from "../db/models/Grupo"
import Persona  from "../db/models/Persona"

let auxCodAsig:string = '';

export const existeCorreoInstitucional = async (correo:string, condicion='')=>{
    const existe = await Persona.findByPk(correo)

    if((condicion === 'materia' || condicion === 'login') && !existe){
        throw new Error(`La persona con correo ${correo} no esta en la base de datos`)
    }else if(condicion === '' && existe){
        throw new Error(`Ya existe persona con correo ${correo}`)
    }
}

export const existeCodigo = async (codigo:string)=>{
    const existe = await Persona.findOne({
        where:{codigo}
    })
    if(existe){
        throw new Error(`Ya existe el código ${codigo}`)
    }
}

export const existeCorreoPersonal = async (correo_personal:string)=>{
    const existe = await Persona.findOne({
        where:{correo_personal}
    })
    if(existe){
        throw new Error(`Ya existe el correo ${correo_personal}`)
    }
}

export const existeDocumento = async (documento:string)=>{

    const existe = await Persona.findOne({
        where:{documento}
    })
    if(existe){
        throw new Error(`Ya existe el documento ${documento}`)
    }
}

export const existeAsignatura = async (codigo:string, condicion='')=>{
    auxCodAsig = codigo;
    const existe = await Asignatura.findByPk(codigo)

    if(condicion === 'materia' && existe){
        throw new Error(`Ya existe la materia con código ${codigo}`)
    }else if(condicion === '' && !existe){
        throw new Error(`No existe una asignatura con código ${codigo}`)
    }
}

export const existeGrupo = async(grupo:string, condicion='')=>{

    const existe = await Grupo.findOne({
        where:{
            nombre:grupo, 
            cod_asignatura:auxCodAsig
        }
    })

    if((condicion === 'materia' || condicion === 'grupo') && existe){
        throw new Error(`Ya existe el grupo ${existe.nombre} para la asignatura ${auxCodAsig} `)
    }else if(condicion ==='' && !existe){
        throw new Error(`No existe grupo con el código ${auxCodAsig}`)
    }
}

export const puedoAgregarGrupoMateria = async(codigo:string)=>{
    auxCodAsig = codigo;
    const existe = await Asignatura.findByPk(codigo);

    if(!existe){
        throw new Error(`No existe asignatura con codigo ${codigo}`)
    }
}
