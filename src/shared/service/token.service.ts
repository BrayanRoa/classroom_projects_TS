import * as jwt from "jsonwebtoken";
import { PersonService } from '../../person/person/service/person.service';
// import { PersonInterface } from '../interface/person.interface';
import { PersonEntity } from '../../person/person/entity/person.entity';
interface JwtPayload {
    uuid: string;
}

export class TokenService {

    private readonly jwtInstance;
    private readonly personService: PersonService

    constructor() {
        this.jwtInstance = jwt
        this.personService = new PersonService()
    }

    private sign(payload: jwt.JwtPayload, secret: any) {
        return this.jwtInstance.sign(payload, secret);
    }

    public async generateJwt(mail: string): Promise<{ accessToken: string, email: string, role: string }> {
        const consultPerson = await this.personService.findOneBy(
            mail
        );

        const payload = {
            uuid: consultPerson!.institutional_mail,
            rol: consultPerson!.role.name,
        };

        return {
            accessToken: this.sign(payload, process.env.SECRET_JWT),
            email: consultPerson!.institutional_mail,
            role: consultPerson!.role.name
        };
    }

    public async verifyToken(data: any): Promise<boolean | PersonEntity> {
        const { uuid } = this.jwtInstance.verify(
            data, process.env.SECRET_JWT!
        ) as JwtPayload;

        const person = await this.personService.findOneBy(uuid);

        if (!person) {
            return false;
        }
        return person;
    }

}