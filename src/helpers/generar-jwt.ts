import jwt from 'jsonwebtoken';

export const generarJWT = (uuid:string = '', rol:number = 0)=>{

    return new Promise((resolve, reject)=>{
        const payload = {uuid, rol};
        jwt.sign(payload, process.env.SECRET_JWT || '',{
            expiresIn:'4h'
        },(err, token)=>{
            if(err){
                reject(`No se pudo generar el JWT`)
            }else{
                resolve(token)
            }
        })
    })

}
