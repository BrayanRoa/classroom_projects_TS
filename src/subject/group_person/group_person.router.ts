import { GroupPersonMiddleware } from './middleware/group_person.middleware';
import { BaseRouter } from '../../shared/router/router';
import { GroupPersonControlle } from './controller/group_person.controller';


export class GroupPersonRouter extends BaseRouter<GroupPersonControlle, GroupPersonMiddleware>{

    constructor() {
        super(GroupPersonControlle, GroupPersonMiddleware)
    }

    routes(): void {
        this.router.post(
            '/group_person/create',
            (req, res, next) => this.middleware.groupPersonValidator(req, res, next),
            (req, res) => this.controller.registerPerson(req, res)
        )

        this.router.patch(
            "/group_person/change_status",
            (req, res, next) => this.middleware.groupPersonValidator(req, res, next),
            (req, res) => this.controller.changeTheStatus(req, res)
        )
    }
}