import { Request, Response } from "express";
import { AuthService } from '../service/auth.service';
import { HttpResponse } from '../../shared/response/http-response';

export class AuthController {

    constructor(
        private authService: AuthService = new AuthService(),
        private httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const resp = await this.authService.login(email, password);
            this.httpResponse.Ok(res, resp)
        } catch (error: any) {
            this.httpResponse.NotFound(res, error.message);
        }
    }
}