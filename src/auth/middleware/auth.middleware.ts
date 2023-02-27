import { PersonService } from "../../person/person/service/person.service"
import { MailService } from "../../shared/mail/mail.service"
import { HttpResponse } from "../../shared/response/http-response"
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware {

    private mailService: MailService
    private httpResponse: HttpResponse
    private personService: PersonService

    constructor() {
        this.mailService = new MailService()
        this.httpResponse = new HttpResponse()
        this.personService = new PersonService()
    }

    async existPerson(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body
        const mailValido = await this.mailService.mailValido(email)

        if (!mailValido) {
            return this.httpResponse.NotFound(res, `It is not a valid institutional email`)
        }
        const person = await this.personService.findOneByEmail(email)
        if (!person) {
            return this.httpResponse.NotFound(res, `There is no person with email ${email}`)
        }
        next()
    }
}