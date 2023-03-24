import path from "path"
import { v4 as uuidv4 } from "uuid"
// import { HttpResponse } from '../response/http-response';


export class UtilService {
    constructor(
        // private httpResponse:HttpResponse = new HttpResponse()
    ) { }

    validateFileExcel(file: any) {
        const extValidas = ['csv', 'xlsx']

        return new Promise((resolve, reject) => {
            const { archivo } = file;
            const nombreCortado = archivo.name.split('.');
            const extension = nombreCortado[nombreCortado.length - 1];

            if (!extValidas.includes(extension)) {
                return reject(`Extension ${extension} no es válida - ${extValidas} -> Permitidas`)
            }

            const nombreTemp = uuidv4() + '.' + extension;

            const uploadPath = path.join(__dirname, '../../uploads/', nombreTemp);

            archivo.mv(uploadPath, (err: any) => {
                if (err) {
                    reject(err)
                }
                resolve(nombreTemp)
            })
        })
    }
}