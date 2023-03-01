import { Request, Response } from 'express';
import { TaskService } from '../service/task.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { UpdateResult } from 'typeorm';

export class TaskController {

    constructor(
        private readonly taskService: TaskService = new TaskService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async findAll(_req: Request, res: Response) {
        try {
            const tasks = await this.taskService.findAll();
            (!tasks)
                ? this.httpResponse.NotFound(res, `no registered tasks yet`)
                : this.httpResponse.Ok(res, tasks);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async findOneBy(req: Request, res: Response) {
        try {
            const { id } = req.params
            const task = await this.taskService.findOneBy(id);
            (!task)
                ? this.httpResponse.NotFound(res, `Task with id ${id} not found`)
                : this.httpResponse.Ok(res, task);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            await this.taskService.create(req.body);
            this.httpResponse.Created(res, `task created successfully`);
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const task = await this.taskService.update(id, req.body);
            (task.affected === 0)
                ? this.httpResponse.NotFound(res, `task with id ${id} not found`)
                : this.httpResponse.Ok(res, `task update successfully`);
        } catch (error) {
            this.httpResponse.Custom(res, error);
        }
    }

    async changeStateTask(req: Request, res: Response) {
        try {
            const { id, state } = req.params
            const task: UpdateResult = await this.taskService.changeStateTask(id, state);
            (task.affected === 0)
                ? this.httpResponse.NotFound(res, `task with id ${id} not found`)
                : this.httpResponse.Ok(res, `task update successfully`);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }
}