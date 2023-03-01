import { Request, Response } from "express";
import { UpdateResult } from "typeorm";
import { HttpResponse } from "../../../shared/response/http-response";
import { GroupService } from '../service/group.service';


export class GroupController {

    constructor(
        private readonly groupService: GroupService = new GroupService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }

    async findAll(_req: Request, res: Response) {
        try {
            const groups = await this.groupService.findAll();
            (groups?.length === 0)
                ? this.httpResponse.NotFound(res, `no registered groups yet`)
                : this.httpResponse.Ok(res, groups);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async findOneBy(req: Request, res: Response) {
        try {
            const { id } = req.params
            const group = await this.groupService.findOneBy(id);
            (!group)
                ? this.httpResponse.NotFound(res, `group with id ${id} not found`)
                : this.httpResponse.Ok(res, group);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newGroup = await this.groupService.create(req.body);
            this.httpResponse.Created(res, newGroup);
        } catch (error: any) {
            this.httpResponse.Custom(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const group: UpdateResult = await this.groupService.update(id, req.body);
            (group.affected === 0)
                ? this.httpResponse.NotFound(res, `group with ${id} not found`)
                : this.httpResponse.Ok(res, `group update successfully`);
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async seeGroupTasks(req: Request, res: Response) {
        try {
            const { id } = req.params
            const tasks = await this.groupService.seeGroupTasks(id);
            (!tasks)
                ? this.httpResponse.NotFound(res, `Group with id ${id} not found`)
                : this.httpResponse.Ok(res, tasks)
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }

    async seeGroupProjects(req: Request, res: Response) {
        try {
            const { id } = req.params
            const projects = await this.groupService.seeGroupProjects(id);
            (!projects)
                ? this.httpResponse.NotFound(res, `Group with id ${id} not found`)
                : this.httpResponse.Ok(res, projects)
        } catch (error) {
            this.httpResponse.Error(res, error);
        }
    }
}