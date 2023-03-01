import { BaseService } from '../../../config/base.service';
import { TaskEntity } from '../entity/task.entity';
import { GroupService } from '../../group/service/group.service';
import { TaskDTO } from '../dto/task.dto';
import { UpdateResult } from 'typeorm';
import { UpdateTaskDTO } from '../dto/update.tro';


export class TaskService extends BaseService<TaskEntity>{

    constructor(
        private readonly groupService: GroupService = new GroupService()
    ) {
        super(TaskEntity)
    }

    async findAll(): Promise<TaskEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("task")
                .leftJoin("task.group", "group")
                .leftJoin("group.subject", "subject")
                .select(["task", "group.name", "subject.name", "subject.code"])
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

    async create(body: TaskDTO): Promise<TaskEntity | undefined> {
        try {
            const group = await this.groupService.findOneBy(body.group)
            if (group) {
                const newTask = (await this.execRepository).create(body)
                newTask.group = group
                return (await this.execRepository).save(newTask)
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

    async changeStateTask(id: string, state: string): Promise<UpdateResult> {
        try {
            return (await this.execRepository).update(id,
                { active: (state === "activate") ? true : false }
            )
        } catch (error: any) {
            throw new Error(error)
        }
    }
}