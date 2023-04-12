import { Request, Response } from 'express';
import { TaskProjectService } from '../service/task_project.service';
import { HttpResponse } from '../../../shared/response/http-response';


export class TaskProjectController {

    constructor(
        private readonly taskProjectService: TaskProjectService = new TaskProjectService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async findTaskOfProject(req: Request, res: Response) {
        try {
            const { project_id, task_id } = req.params
            const task_project = await this.taskProjectService.findTaskOfProject(project_id, task_id);
            (!task_project)
                ? this.httpResponse.NotFound(res, `no tasks registered yet`)
                : this.httpResponse.Ok(res, task_project);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async addDelivery(req: Request, res: Response) {
        try {
            const {id} = req.params
            await this.taskProjectService.addDelivery(id, req.files?.archivo)
            this.httpResponse.Ok(res, `file upload successfully`)
        } catch (error:any) {
            this.httpResponse.NotFound(res, error.message);
        }
    }
}