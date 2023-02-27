import { PersonService } from '../../person/person/service/person.service';
import { TokenService } from '../../shared/service/token.service';
import bcrypt from 'bcrypt';

export class AuthService{

    constructor(
        private readonly personService:PersonService = new PersonService(),
        private tokenService:TokenService=new TokenService()
    ){}

    async login(email:string, password:string){
        try {
            const person = await this.personService.findOneByEmail(email)
            const isMatch = await bcrypt.compare(password, person!.password)
            if(!isMatch){
                throw new Error(`Password invalid for email - ${email}`)
            }
            return this.tokenService.generateJwt(email)
        } catch (error:any) {
            throw error
        }
    }


}