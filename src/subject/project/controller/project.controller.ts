import { ProjectService } from '../service/project.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { Request, Response } from 'express';
import { UtilService } from '../../../shared/service/util.service';


export class ProjectController {

    constructor(
        private readonly projectService: ProjectService = new ProjectService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        private readonly utilService:UtilService = new UtilService()
    ) { }

    async findOneBy(req: Request, res: Response) {
        try {
            const { id } = req.params
            const project = await this.projectService.findOneById(id);
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
        } catch (error: any) {
            this.httpResponse.Custom(res, error);
        }
    }

    async uploadExcelProjects(req: Request, res: Response) {
        try {
            const { id } = req.params
            const fileName = await this.utilService.validateFileExcel(req.files) as string
            const resp = await this.projectService.uploadExcelProjects(id, fileName);
            this.httpResponse.Ok(res, resp)
        } catch (error) {
            console.log(error);
            this.httpResponse.Error(res, error);
        }
    }
}