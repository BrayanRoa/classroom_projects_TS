export class MailService {

    constructor(){}

    async mailValido(correo: string): Promise<boolean> {
        const aux = correo.split("@")
        if (aux[1] !== 'ufps.edu.co') {
            return false
        }
        return true
    }
}