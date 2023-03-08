import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';
import { ProjectDTO } from '../dto/project.dto';

export class ProjectMiddleware extends SharedMiddleware{

    constructor(){
        super()
    }

    async projectValidator(req:Request, res:Response, next:NextFunction){
        let data = new ProjectDTO()
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