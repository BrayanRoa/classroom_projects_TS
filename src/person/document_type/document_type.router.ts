import { BaseRouter } from '../../shared/router/router';
import { DocumentTypeController } from './controller/document_type.controller';
import { DocumentTypeMiddleware } from './middleware/document_type.middleware';

export class DocumentTypeRouter extends BaseRouter<DocumentTypeController, DocumentTypeMiddleware>{

    constructor() {
        super(DocumentTypeController, DocumentTypeMiddleware)
    }

    routes(): void {
        this.router.get(
            "/documents",
            (req, res) => this.controller.findAll(req, res)
        )

        this.router.get(
            "/document/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.findOneBy(req, res)
        )

        this.router.get(
            "/documentWithPersons/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.findOneByWithPersons(req, res)
        )

        this.router.post(
            "/document/create",
            (req, res, next) => this.middleware.documentValidator(req, res, next),
            (req, res) => this.controller.create(req, res)
        )

        this.router.patch(
            "/document/update/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.update(req, res)
        )

        this.router.delete(
            "/document/delete/:id",
            (req, res, next) => this.middleware.uuidValidator(req, res, next),
            (req, res) => this.controller.delete(req, res)
        )
    }

}