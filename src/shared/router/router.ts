import { Router } from "express"

export class BaseRouter<T, U>{

    public readonly router: Router
    public readonly controller: T
    public readonly middleware: U

    constructor(TController: { new(): T }, UMiddleware: { new(): U }) {
        this.router = Router()
        this.controller = new TController()
        this.middleware = new UMiddleware()
        this.routes()
    }

    routes() { }
}