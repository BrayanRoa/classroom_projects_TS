import * as dotenv from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"
import swaggerJSDoc from 'swagger-jsdoc';


export abstract class ConfigServer {

    constructor() {
        const nodeEnv = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeEnv
        })
    }

    public getEnvironment(k: string): string | undefined {
        return process.env[k] // process.env["PORT"]
    }

    public getNumberEnv(k: string): number | undefined {
        return +process.env[k]!
    }

    public get nodeEnv(): string {
        return this.getEnvironment("NODE_ENV")?.trim() ?? ""
    }

    public createPathEnv(path: string): string {
        const pathEnv: string[] = ["env"]
        if (path.length > 0) {
            const stringToArray = path.split(".")
            pathEnv.unshift(...stringToArray)
        }
        return `.${pathEnv.join(".")}`
    }

    public get typeOrmConfig(): DataSourceOptions {
        return {
            type: "postgres",
            host: this.getEnvironment("DB_HOST"),
            port: this.getNumberEnv("DB_PORT"),
            username: this.getEnvironment("DB_USER"),
            password: this.getEnvironment("DB_PASSWORD"),
            database: this.getEnvironment("DB_NAME"),
            entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            synchronize: true,
        }
    }

    async db(){
        try {
            return await new DataSource(this.typeOrmConfig).initialize()
        } catch (error) {
            console.log(error);
        }
    }

    swagger() {
        const options = {
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'User API',
                    version: '1.0.0',
                    description: 'API for managing users'
                },
                servers: [
                    {
                        url: 'http://localhost:3000/api',
                        description: 'Local server'
                    }
                ],
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT'
                        }
                    }
                }
            },
            apis: ['./swagger.yml']
        };
        return swaggerJSDoc(options);
    }
}