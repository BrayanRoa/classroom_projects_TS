import { AuthController } from './controller/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { BaseRouter } from '../shared/router/router';

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {

    constructor() {
        super(AuthController, AuthMiddleware)
    }

    routes(): void {
        this.router.post('/auth/login',
            (req, res, next) => [this.middleware.existPerson(req, res, next)],
            (req, res) => this.controller.login(req, res)
        )
    }

}