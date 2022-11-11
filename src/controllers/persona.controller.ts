import { Request, Response } from "express";
import { patchPersona, cargarFotoPerfil } from '../services/persona.service';


const actualizarPersona = async(req:Request, res:Response)=>{
    try {
        //* 👀 validó que no sea otra persona actualizando el perfil de otro
        if(req.params.correo !== req.uid){
            return res.status(401).json({
                msg:`No puede realizar esta acción - No tiene los permisos necesarios`
            })
        }

        const update = await patchPersona(req.params.correo, req.body)
        res.status(200).json({
            res:(update[0]===1)
                ?`Se actualizaron los datos correctamente`
                :`No se actualizo ningún campo`
        })

    } catch (error) {
        res.status(400).json({
            msg:`No se pudo actualizar los datos de ${req.params.correo}`
        })
    }
}


const actualizarFotoPerfil = async (req:Request, res:Response)=>{

    try {
        const subirImagen = await cargarFotoPerfil(req.params.correo, req.files?.archivo)

        res.status(200).json({
            msg:`ok`,
            subirImagen
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            error:error
        })
    }
}

export {actualizarPersona, actualizarFotoPerfil}