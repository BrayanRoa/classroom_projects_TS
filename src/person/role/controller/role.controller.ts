import { RoleService } from '../service/role.service';
import { HttpResponse } from '../../../shared/response/http-response';
import { Request, Response } from 'express';
import { UpdateResult, DeleteResult } from 'typeorm';

export class RoleController {

    constructor(
        private readonly roleService: RoleService = new RoleService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async findAll(_req: Request, res: Response) {
        try {
            const roles = await this.roleService.findAll();
            (!roles)
                ? this.httpResponse.NotFound(res, "no registered roles yet")
                : this.httpResponse.Ok(res, roles)
        } catch (e) {
            this.httpResponse.Error(res, e)
        }
    }

    async findOneById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const role = await this.roleService.findById(id);
            (!role)
                ? this.httpResponse.NotFound(res, `Rol with id ${id} not found`)
                : this.httpResponse.Ok(res, role)
        } catch (e) {
            this.httpResponse.Error(res, e)
        }
    }

    async findByIdWithPersons(req: Request, res: Response) {
        try {
            const { id } = req.params
            const role = await this.roleService.findByIdWithPersons(id);
            (!role)
                ? this.httpResponse.NotFound(res, `Rol with id ${id} not found`)
                : this.httpResponse.Ok(res, role)
        } catch (e) {
            this.httpResponse.Error(res, e)
        }
    }

    async create(req: Request, res: Response) {
        try {
            const body = req.body
            const newRole = await this.roleService.create(body);
            this.httpResponse.Created(res, newRole)
        } catch (e: any) {
            this.httpResponse.Custom(res, e)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { name } = req.body
            const newRole: UpdateResult | undefined = await this.roleService.update(id, name);
            (newRole?.affected === 0 || newRole === undefined)
                ? this.httpResponse.NotFound(res, `role with id ${id} not found`)
                : this.httpResponse.Ok(res, `Role updated successfully`)
        } catch (e: any) {
            this.httpResponse.Custom(res, e)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const deleteRole: DeleteResult | undefined = await this.roleService.delete(id);
            (deleteRole?.affected === 0)
                ? this.httpResponse.BadRequest(res, `role with id ${id} not found`)
                : this.httpResponse.Ok(res, `Role deleted sucessfully`)
        } catch (e: any) {
            this.httpResponse.Custom(res, e)
        }
    }

}