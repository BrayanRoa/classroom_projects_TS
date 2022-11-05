import express, { Application } from 'express'
import { sequelize } from '../db/conexion';
import authRouter from '../routes/auth.routes'
import '../db/relaciones'

export class Server{

    private app:Application;
    private PORT:string
    private rutas;

    constructor(){
        this.app = express()
        this.PORT = process.env.PORT || '3000'
        this.rutas={
            auth:'/api/auth/'
        }

        this.db()
        this.middlewares()
        this.routes()
    }

    async db(){
        try {
            await sequelize.sync({force:false})
            console.log('Conexión a BD exitosa!!!');
        } catch (error) {
            console.error(`No se pudo conectar BD ${error}`);
        }
    }

    middlewares(){
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.rutas.auth, authRouter)
    }

    listen(){
        this.app.listen(this.PORT, ()=> {
            console.log(`Server running on port ${this.PORT}`)
        })
    }
}
