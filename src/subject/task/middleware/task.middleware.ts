import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';
import { TaskDTO } from '../dto/task.dto';

export enum STATUS{
    activate="activate",
    deactivate="deactivate"
}

export class TaskMiddleware extends SharedMiddleware {

    constructor() {
        super()
    }

    async taskValidator(req: Request, res: Response, next: NextFunction) {
        const data = new TaskDTO()
        Object.assign(data, req.body)
        const errors = await validate(
            { whitelist: true, forbidNonWhitelisted: true }
        )
        if (errors.length > 0) {
            return this.httpResponse.BadRequest(res, errors)
        }
        next()
    }

    async statusValidator(req: Request, res: Response, next: NextFunction){
        const status = ["activate", "deactivate"]
        if(!status.includes(req.params.state)){
            return this.httpResponse.BadRequest(res, `allowed values ​​in state - ${status}`)
        }
        next()
    }
}