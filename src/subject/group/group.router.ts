import { BaseRouter } from '../../shared/router/router';
import { GroupController } from './controller/group.controller';
import { GroupMiddleware } from './middleware/group.middleware';


export class GroupRouter extends BaseRouter<GroupController, GroupMiddleware>{

    constructor() {
        super(GroupController, GroupMiddleware)
    }

    routes(): void {
        //* ✅
        this.router.get('/groups',
            (req, res) => this.controller.findAll(req, res)
        )

        //* ✅
        this.router.get('/group/:id',
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.findOneBy(req, res)
        )

        //* ✅
        this.router.post('/group/create',
            (req, res, next) => this.middleware.groupValidator(req, res, next),
            (req, res) => this.controller.create(req, res)
        )
        
        this.router.patch("/group/update/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res, next) => this.middleware.groupValidator(req, res, next),
            (req, res) => this.controller.update(req, res)
        )

        this.router.get('/group/tasks/:id',
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.seeGroupTasks(req, res)
        )

        this.router.get('/group/projects/:id',
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.seeGroupProjects(req, res)
        )
    }
}