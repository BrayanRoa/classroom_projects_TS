import { Request, Response, NextFunction } from "express";
import { validate as uuidValid } from "uuid"
import { HttpResponse } from '../response/http-response';
import { TokenService } from '../service/token.service';

export class SharedMiddleware {

    public readonly httpResponse: HttpResponse;
    public readonly tokenService: TokenService

    constructor() {
        this.httpResponse = new HttpResponse()
        this.tokenService = new TokenService()
    }

    async uuidValidator(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        if (!uuidValid(id)) {
            return this.httpResponse.BadRequest(res, `the id "${id}" is not valid`)
        }
        next()
    }

    async validarJwt(req: Request, res: Response, next: NextFunction) {
        const token = req.header("x-token");
        if (!token) {
            return this.httpResponse.Unauthorized(res, `No hay token en la petición`);
        }

        try {
            const data = await this.tokenService.verifyToken(token);
            if (!data) {
                return this.httpResponse.Unauthorized(
                    res,
                    `Token no válido - pongase en contacto con el administrador`
                );
            }
            //   req.persona = data as Persona;
            //   req.uid = req.persona.correo_institucional;
            next();

        } catch (error: any) {
            this.httpResponse.Unauthorized(res, error)
        }
    }
}