import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';
import { SubjectDTO } from '../dto/subject.dto';
import { UpdateSubjectDTO } from '../dto/update.dto';


export class SubjectMiddleware extends SharedMiddleware{

    constructor(){
        super()
    }

    async subjectValidator(req: Request, res: Response, next: NextFunction) {
        let data;
        if(req.method === "POST"){
            data = new SubjectDTO()
        }else{
            data = new UpdateSubjectDTO()
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