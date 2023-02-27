
import { BaseRouter } from '../../shared/router/router';
import { RoleController } from './controller/role.controller';
import { RoleMiddleware } from './middleware/role.middleware';

export class RoleRouter extends BaseRouter<RoleController, RoleMiddleware>{

    constructor() {
        super(RoleController, RoleMiddleware)
    }

    routes(): void {
        this.router.get(
            "/roles",
            (req, res) => this.controller.findAll(req, res))

        this.router.get(
            "/role/:id",
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.findOneById(req, res))

        this.router.get(
            "/roleWithPersons/:id",
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.findByIdWithPersons(req, res)
        )

        this.router.post(
            "/role/create",
            (req, res, next) => [this.middleware.roleValidator(req, res, next)],
            (req, res) => this.controller.create(req, res))

        this.router.patch(
            "/role/update/:id",
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.update(req, res))

        this.router.delete(
            "/role/delete/:id",
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.delete(req, res))
    }
}