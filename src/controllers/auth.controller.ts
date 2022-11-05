import { request, response } from "express";
import { authPersona, authDocente } from "../services/auth.service";

const registroDocente = async (req = request, res = response) => {
  try {
    const docente = await authDocente(req.body);
    res.status(201).json({
      docente
    });
  } catch (error) {
    res.status(400).json({
      error: `No se pudo registrar el docente ${error}`,
    });
    console.log(error);
  }
};

const registroPersona = async (req = request, res = response)=>{
  try{
    const {asignatura, grupo, ...alumno} = req.body
    const persona = await authPersona(alumno, asignatura, grupo)
    res.status(201).json({
      persona
    })
  }catch(error){
    res.status(400).json({error})
    console.log(error);
  }
}


export { 
  registroDocente,
  registroPersona
};
