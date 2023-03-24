import { BaseRouter } from '../../shared/router/router';
import { ProjectController } from './controller/project.controller';
import { ProjectMiddleware } from './middleware/project.middleware';


export class ProjectRouter extends BaseRouter<ProjectController, ProjectMiddleware>{

    constructor(){
        super(ProjectController, ProjectMiddleware)
    }

    routes(): void {
        this.router.post('/project/create',
            (req, res, next) => this.middleware.projectValidator(req, res, next),
            (req, res) => this.controller.create(req, res)
        )

        this.router.get('/project/:id',
            (req, res, next) => [this.middleware.uuidValidator(req, res, next)],
            (req, res) => this.controller.findOneBy(req, res)
        )

        this.router.post('/projects/excel/:id',
            (req, res) => this.controller.uploadExcelProjects(req, res)
        )
    }
}