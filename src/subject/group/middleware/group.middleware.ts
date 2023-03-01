import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { SharedMiddleware } from '../../../shared/middleware/shared.middleware';
import { GroupDTO } from '../dto/group.dto';
import { UpdateGroupDTO } from '../dto/update.dto';

export class GroupMiddleware extends SharedMiddleware {
    constructor() {
        super()
    }

    async groupValidator(req: Request, res: Response, next: NextFunction) {
        let data;
        if (req.method === "POST") {
            data = new GroupDTO()
        } else {
            data = new UpdateGroupDTO()
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