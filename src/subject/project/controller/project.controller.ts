import { ProjectService } from '../service/project.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { Request, Response } from 'express';


export class ProjectController {

    constructor(
        private readonly projectService: ProjectService = new ProjectService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async findOneBy(req: Request, res: Response) {
        try {
            const { id } = req.params
            const project = await this.projectService.findOneBy(id);
            (!project)
                ? this.httpResponse.NotFound(res, `Project with id ${id} not found`)
                : this.httpResponse.Ok(res, project);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            await this.projectService.create(req.body);
            this.httpResponse.Created(res, `project created successfully`)
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }
}