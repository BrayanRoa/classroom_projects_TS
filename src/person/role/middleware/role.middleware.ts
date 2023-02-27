import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { RoleDTO } from '../dto/role.dto';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';

export class RoleMiddleware extends SharedMiddleware {

    constructor() {
        super()
    }

    async roleValidator(req: Request, res: Response, next: NextFunction) {
        const data = new RoleDTO()

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