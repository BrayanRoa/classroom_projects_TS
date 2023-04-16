import { BaseService } from '../../../config/base.service';
import { TaskEntity } from '../entity/task.entity';
import { GroupService } from '../../group/service/group.service';
import { TaskDTO } from '../dto/task.dto';
import { UpdateResult } from 'typeorm';
import { UpdateTaskDTO } from '../dto/update.tro';
import { TaskProjectService } from '../../task_project/service/task_project.service';
import { TaskProjectDTO } from '../../task_project/dto/task_project.dto';


export class TaskService extends BaseService<TaskEntity>{

    constructor(
        private readonly groupService: GroupService = new GroupService(),
        private readonly taskProjectService: TaskProjectService = new TaskProjectService()
    ) {
        super(TaskEntity)
    }

    async findAllOfGroup(group_id:string): Promise<TaskEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("tasks")
                .where("tasks.group_id = :group_id", {group_id})
                .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findOneBy(id: string): Promise<TaskEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("task")
                .leftJoin("task.group", "group")
                .leftJoin("group.subject", "subject")
                .where("task.id =:id", { id })
                .select(["task", "group.name", "subject.name", "subject.code"])
                .getOne()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    // TODO: SERIA INTERESANTE ENVIAR CORREO A CADA PERSONA DEL GRUPO CUANDO SE CREE UNA NUEVA TAREA 
    async create(body: TaskDTO) {
        try {
            const group = await this.groupService.findOneBy(body.group)
            if (group) {
                const newTask = (await this.execRepository).create(body)
                newTask.group = group;
                (await this.execRepository).save(newTask)
                const projects = await this.groupService.seeGroupProjects(body.group)
                for (const project of projects?.project!) {
                    const bod = new TaskProjectDTO()
                    bod.state = "undelivered"
                    await this.taskProjectService.create(newTask, project, bod)
                }
            } else {
                throw new Error(`group with id ${body.group} not found`)
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async update(id: string, body: UpdateTaskDTO): Promise<UpdateResult> {
        try {
            return (await this.execRepository).update(id, body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    // async changeStateTask(id: string, state: string): Promise<UpdateResult> {
    //     try {
    //         return (await this.execRepository).update(id,
    //             { active: (state === "activate") ? true : false }
    //         )
    //     } catch (error: any) {
    //         throw new Error(error)
    //     }
    // }

    async findAllTaskOfProject(group_id: string, project_id: string) {
        try {
            return (await this.execRepository).createQueryBuilder("task")
                .leftJoinAndSelect("task.project", "task_project")
                .where("task.group_id = :group_id AND task_project.project_id = :project_id", { group_id, project_id })
                .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async countTasks(id: string): Promise<number> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("task")
                .where("task.active = :term AND task.group_id = :id", { term: true, id })
                .getCount()
        } catch (error: any) {
            throw new Error(error)
        }
    }
}