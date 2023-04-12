import { BaseRouter } from '../../shared/router/router';
import { TaskController } from './controller/task.controller';
import { TaskMiddleware } from './middleware/task.middleware';

export class TaskRouter extends BaseRouter<TaskController, TaskMiddleware>{

    constructor() {
        super(TaskController, TaskMiddleware)
    }

    routes(): void {

        //* ✅
        this.router.get('/tasks/:group_id',
            (req, res) => this.controller.findAllOfGroup(req, res)
        )

        //* ✅
        this.router.get('/task/:id',
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.findOneBy(req, res)
        )

        //* ✅
        this.router.post(
            '/task/create',
            (req, res, next) => this.middleware.taskValidator(req, res, next),
            (req, res) => this.controller.create(req, res)
        )

        //* ✅
        // this.router.patch(
        //     "/task/change_state/:id/:state",
        //     (req, res, next) => this.middleware.statusValidator(req, res, next),
        //     (req, res) => this.controller.changeStateTask(req, res)
        // )

        //* ✅
        this.router.patch(
            '/task/update/:id',
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.update(req, res)
        )

        /*
         * returns the number of tasks that are active in a group
         */
        this.router.get('/task/active/:id',
            (req, res) => this.controller.countTasks(req, res)
        )

        // TODO: 👀 ESTE VEO QUE YA ESTA BIEN
        this.router.get('/task/:group/:project',
            (req, res) => this.controller.findAllTaskOfProject(req, res)
        )
    }
}