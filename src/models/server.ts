import express, { Application } from "express";
import { sequelize } from "../db/conexion";
import fileUpload from "express-fileupload";
import cors from 'cors'

//* IMPORTACIONES INTERNAS
import authRouter from "../routes/auth.routes";
import "../db/relaciones";
import materiasRouter from "../routes/materias.routes"
import "../helpers/expandir-express"
import personasRouter from "../routes/persona.routes";

export class Server {
  private app: Application;
  private PORT: string;
  private rutas;

  
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || "3000";
    this.rutas = {
      auth: "/api/auth/",
      materias: '/api/materias/',
      personas: '/api/personas/'
    };

    this.db();
    this.middlewares();
    this.routes();
  }

  async db() {
    try {
      await sequelize.sync({ force: false });
      console.log("Conexión a BD exitosa!!!");
    } catch (error) {
      console.error(`No se pudo conectar BD ${error}`);
    }
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors())
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    );
  }

  routes() {
    this.app.use(this.rutas.auth, authRouter);
    this.app.use(this.rutas.materias, materiasRouter)
    this.app.use(this.rutas.personas, personasRouter)
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    });
  }

}
