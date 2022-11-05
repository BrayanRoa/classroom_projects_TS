const path = require('path') 
const { v4: uuidv4} = require('uuid')
uuidv4();

export const validarArchivo =(file:any, extValidas = ['csv', 'xlsx']):Promise<string>=>{

    return new Promise((resolve, reject)=>{
        const { alumnos } = file;

        const nombreCortado = alumnos.name.split('.');
    
        const extension = nombreCortado[nombreCortado.length-1];
    
        if(!extValidas.includes(extension)){
            return reject(`Extension ${extension} no es válida - ${extValidas} -> Permitidas`)
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

        alumnos.mv(uploadPath, (err:any)=>{
            if(err){
                reject(err)
            }
            resolve(nombreTemp)
        })


    })
    
}

