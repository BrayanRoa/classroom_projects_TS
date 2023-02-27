import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';
import { PersonDTO } from '../dto/person.dto';
import { UpdatePersonDTO } from '../dto/update.person.dto';

export class PersonMiddleware extends SharedMiddleware {

    constructor() {
        super()
    }

    async personValidator(req: Request, res: Response, next: NextFunction) {
        let data;
        if(req.method === "POST"){
            data = new PersonDTO()
        }else{
            data = new UpdatePersonDTO()
        }
        Object.assign(data, req.body)

        const errors = await validate(data,
            { whitelist: true, forbidNonWhitelisted: true }
        )
        if (errors.length > 0) {
            return this.httpResponse.BadRequest(res, errors)
        }
        next()
    }

    
}