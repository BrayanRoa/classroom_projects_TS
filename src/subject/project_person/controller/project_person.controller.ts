import { Request, Response } from 'express';
import { ProjectPersonService } from '../service/project_person.service';
import { HttpResponse } from '../../../shared/response/http-response';
export class ProjectPersonController {


    constructor(
        private readonly projectPersonService: ProjectPersonService = new ProjectPersonService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async registerPersonInProject(req: Request, res: Response) {
        try {
            await this.projectPersonService.registerPersonInProject(req.body);
            await this.httpResponse.Created(res, `person registered in project`)
        } catch (error: any) {
            this.httpResponse.Custom(res, error);
        }
    }

    async findPersonsWithProject(req: Request, res: Response) {
        try {
            const { id } = req.params
            const project = await this.projectPersonService.findPersonsWithProject(id);
            (project.length === 0)
                ? this.httpResponse.NotFound(res, `project without persons`)
                : this.httpResponse.Ok(res, project);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }
}