import * as dotenv from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"
import swaggerJSDoc from 'swagger-jsdoc';
import { PersonEntity } from '../person/person/entity/person.entity';
import { DocumentTypeEntity } from '../person/document_type/entity/document_type.entity';
import { RoleEntity } from '../person/role/entity/role.entity';
import { SubjectEntity } from '../subject/subject/entity/subject.entity';
// import { AdvanceEntity } from '../subject/advance/entity/advance.entity';
import { GroupEntity } from '../subject/group/entity/group.entity';
import { GroupPersonEntity } from '../subject/group_person/entity/group_person.entity';
import { ProjectEntity } from '../subject/project/entity/project.entity';
import { ProjectPersonEntity } from '../subject/project_person/entity/project_person.entity';
import { TaskEntity } from '../subject/task/entity/task.entity';
import { TaskProjectEntity } from "../subject/task_project/entity/task_project.entity";


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
            entities: [
                PersonEntity, 
                DocumentTypeEntity, 
                RoleEntity, 
                SubjectEntity, 
                // AdvanceEntity, 
                GroupEntity, 
                GroupPersonEntity, 
                ProjectEntity, 
                ProjectPersonEntity, 
                TaskEntity,
                TaskProjectEntity
            ],
            // entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            synchronize: false,
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