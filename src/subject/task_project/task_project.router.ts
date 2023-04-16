import { BaseRouter } from "../../shared/router/router";
import { TaskProjectController } from "./controller/task_project.controller";
import { TaskProjectMiddleware } from "./middleware/task_project.middleware";

export class TaskProjectRouter extends BaseRouter<TaskProjectController, TaskProjectMiddleware>{

    constructor() {
        super(TaskProjectController, TaskProjectMiddleware)
    }

    routes(): void {
        this.router.get('/task_project/:project_id/:task_id',
            (req, res) => this.controller.findTaskOfProject(req, res)
        )

        // TODO: VALIDAR QUE VENGA EL ARCHIVO
        this.router.patch('/task_project/add_delivery/:id',
            (req, res, next) => this.middleware.existFile(req, res, next, ['pdf']),
            (req, res) => this.controller.addDelivery(req, res)
        )
    }

}