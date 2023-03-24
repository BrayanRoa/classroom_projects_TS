import { Request, Response } from 'express';
import { ProjectPersonService } from '../service/project_person.service';
import { HttpResponse } from '../../../shared/response/http-response';
export class ProjectPersonController{


    constructor(
        private readonly projectPersonService:ProjectPersonService = new ProjectPersonService(),
        private readonly httpResponse:HttpResponse = new HttpResponse()
    ){}

    async registerPersonInProject(req: Request, res: Response) {
        try {
            await this.projectPersonService.registerPersonInProject(req.body);
            await this.httpResponse.Created(res, `person registered in project`)
        } catch (error:any) {
            this.httpResponse.Custom(res, error);
        }
    }
}