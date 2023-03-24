import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAR_SERVER_ERROR = 500
}

export class HttpResponse {

    constructor(){}

    Ok(res: Response, data: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: "SUCCESS",
            data
        })
    }

    Created(res: Response, data: any): Response {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMsg: "CREATED",
            data
        })
    }

    NoContent(res: Response, data: any): Response{
        return res.status(HttpStatus.NO_CONTENT).json({
            status: HttpStatus.NO_CONTENT,
            statusMsg: "NO CONTENT",
            data
        })
    }

    BadRequest(res: Response, data: any): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            statusMsg: "BAD REQUEST",
            data
        })
    }

    Unauthorized(res: Response, data: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "UNAUTHORIZED",
            data
        })
    }

    NotFound(res: Response, data: any): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: "NOT FOUND",
            data
        })
    }

    Error(res: Response, data: any): Response {
        return res.status(HttpStatus.INTERNAR_SERVER_ERROR).json({
            status: HttpStatus.INTERNAR_SERVER_ERROR,
            statusMsg: "INTERNAL_SERVER_ERROR",
            data:data
        })
    }

    Custom(res: Response, data: any){
        if(data.code === "23505"){
            this.BadRequest(res, data.detail)
        }
        else{
            this.BadRequest(res, data.message)
        }
    }
}