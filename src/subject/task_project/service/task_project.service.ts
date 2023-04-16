import { BaseService } from "../../../config/base.service"
import { ProjectEntity } from "../../project/entity/project.entity"
import { TaskEntity } from "../../task/entity/task.entity"
import { TaskProjectDTO } from "../dto/task_project.dto"
import { TaskProjectEntity } from "../entity/task_project.entity"
import { v2 as cloudinary } from 'cloudinary'


export class TaskProjectService extends BaseService<TaskProjectEntity>{

    constructor() {
        super(TaskProjectEntity)
    }

    async findOneBy(id:string):Promise<TaskProjectEntity | null> {
        try {
            // return (await this.execRepository)
            //     .createQueryBuilder("task_project")
            //     .where("task_project.project_id = :project AND task_project.task_id = :task", { project, task })
            //     .getOne()
            return (await this.execRepository).findOneBy({id})
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(task: TaskEntity, project: ProjectEntity, body: TaskProjectDTO) {
        try {
            const newTaskProject = (await this.execRepository).create(body)
            newTaskProject.project = project
            newTaskProject.task = task;
            return (await this.execRepository).save(newTaskProject)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findTaskOfProject(project: string, task: string) {
        try {
            console.log(project);
            return (await this.execRepository)
                .createQueryBuilder("task_project")
                .leftJoin("task_project.task", "task")
                .leftJoin("task_project.project", "project")
                .where("task_project.project_id = :project AND task_project.task_id = :task", { project, task })
                .select(["task_project", "task", "project"])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async addDelivery(id:string, file: any) {
        try {
            // TODO: BUSCAR EL REGISTRO CON EL TASK ID Y EL PROJECT ID
            // TODO: VALIDAR SI YA SE HIZO UNA ENTREGA POR SU LA QUIERE SOBREESCRIBIR
            const task_project = await this.findOneBy(id)
            if (!task_project) throw new Error(`there are not task`)
            console.log(task_project.link);
            console.log(file);
            if (task_project.link !== null) {
                const nombreArray = task_project.link.split('/')
                const nombre = nombreArray.pop()
                const [public_id] = nombre!.split('.')
                await cloudinary.uploader.destroy(`ayd-folder-pruebas/${public_id}`) //* 👀 no lo esta borrando de cloudinary revisar
            }

            const { tempFilePath } = file
            const subida = await cloudinary.uploader.upload(tempFilePath, {
                folder: `ayd-folder-pruebas`
            })

            const { secure_url } = subida
            return (await this.execRepository).update(id, { link: secure_url, state:"delivered" })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}