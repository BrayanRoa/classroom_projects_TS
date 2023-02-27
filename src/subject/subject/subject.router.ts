import { BaseRouter } from '../../shared/router/router';
import { SubjectController } from './controller/subject.controller';
import { SubjectMiddleware } from './middleware/subject.middleware';


export class SubjectRouter extends BaseRouter<SubjectController, SubjectMiddleware> {

    constructor() {
        super(SubjectController, SubjectMiddleware)
    }

    routes(): void {
        this.router.get('/subjects',
            (req, res) => this.controller.findAll(req, res)
        )

        this.router.get('/subject/:code',
            // (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.findOneBy(req, res)
        )

        this.router.post('/subject/create',
            (req, res, next) => this.middleware.subjectValidator(req, res, next),
            (req, res) => this.controller.create(req, res)
        )

        this.router.patch('/subject/update/:code',
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res, next) => this.middleware.subjectValidator(req, res, next),
            (req, res) => this.controller.update(req, res)
        )
    }
}