import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';
import { GroupPersonDTO } from '../dto/group_person.dto';


export class GroupPersonMiddleware extends SharedMiddleware {

    constructor() {
        super()
    }

    async groupPersonValidator(req: Request, res: Response, next: NextFunction) {
        let data = new GroupPersonDTO()
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