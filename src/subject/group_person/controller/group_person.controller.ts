import { GroupPersonService } from '../service/group_person.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { Request, Response } from 'express';


export class GroupPersonControlle {

    constructor(
        private readonly groupPersonService: GroupPersonService = new GroupPersonService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }


    async registerPerson(req: Request, res: Response) {
        try {
            await this.groupPersonService.registerPerson(req.body);
            this.httpResponse.Created(res, `successfully registered person`)
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }

    async changeTheStatus(req: Request, res: Response) {
        try {
            await this.groupPersonService.changeTheStatus(req.body);
            this.httpResponse.Ok(res, `group ${req.body.state} successfully`)
        } catch (error:any) {
            console.log(error.message);
            this.httpResponse.Custom(res, error.message);
        }
    }

}