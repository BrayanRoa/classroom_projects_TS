import { ProjectPersonController } from './controller/project_person.controller';
import { ProjectPersonMiddleware } from './middleware/project_person.middleware';
import { BaseRouter } from '../../shared/router/router';

export class ProjectPersonRouter extends BaseRouter<ProjectPersonController, ProjectPersonMiddleware>{

    constructor() {
        super(ProjectPersonController, ProjectPersonMiddleware)
    }

    routes(): void {
        this.router.post(
            "/project_person/create",
            (req, res) => this.controller.registerPersonInProject(req, res)
        )

        // TODO: 👀 ESTE LO ESTOY USANDO?
        this.router.get(
            '/project_person/persons/:id',
            (req, res) => this.controller.findPersonsWithProject(req, res)
        )
    }
}