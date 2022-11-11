import Persona from "../db/models/Persona";
import { PersonaResponse } from "../interfaces/persona-response.interface";

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config( process.env.CLOUDINARY_URL || '' )


export const patchPersona = async(correo_institucional:string, data:PersonaResponse)=>{
    const persona = await Persona.update(data,{
        where:{correo_institucional},
    })
    return persona
}

export const cargarFotoPerfil = async(correo_institucional:string, imagen:any)=>{

    const persona = await Persona.findByPk(correo_institucional);

    if(persona?.img){
        const nombreArray = persona.img.split('/')
        const nombre = nombreArray.pop()
        const [public_id] = nombre!.split('.')
        await cloudinary.uploader.destroy(`ayd-folder-pruebas/${public_id}`) //* 👀 no lo esta borrando de cloudinary revisar
    }
    const {tempFilePath} = imagen
    const subida = await cloudinary.uploader.upload(tempFilePath,{
        folder:`ayd-folder-pruebas`
    })

    const {secure_url} = subida
    await persona?.update({img:secure_url},{
        where:{correo_institucional}
    })

    return persona
}

