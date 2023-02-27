import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';
import { DocumentTypeDTO } from '../dto/document_type.dto';


export class DocumentTypeMiddleware extends SharedMiddleware {

    constructor() {
        super()
    }

    async documentValidator(req: Request, res: Response, next: NextFunction) {
        const data = new DocumentTypeDTO()
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