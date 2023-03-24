import { BaseService } from '../../../config/base.service';
import { GroupEntity } from '../entity/group.entity';
import { GroupDTO } from '../dto/group.dto';
import { UpdateGroupDTO } from '../dto/update.dto';
import { SubjectService } from '../../subject/service/subject.service';
// import { v2 as cloudinary } from 'cloudinary'

export class GroupService extends BaseService<GroupEntity>{

    constructor(
        private readonly subjectService: SubjectService = new SubjectService(),
    ) {
        super(GroupEntity)
    }

    async findAll(): Promise<GroupEntity[] | undefined> {
        try {
            return (await this.execRepository).find()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findOneBy(id: string): Promise<GroupEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .leftJoin("group.subject", "subject")
                .where("group.id = :id", { id })
                .select(["group", "subject.name", "subject.code"])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(body: GroupDTO): Promise<GroupEntity> {
        const subject = await this.subjectService.findOneById(body.subject_code)
        if (!subject) throw new Error(`Subject does not exist`)
        const exist = await this.exist(body.name, body.subject_code)
        if (exist) throw new Error(`Group already exist in subject`)
        try {
            const newGroup = (await this.execRepository).create(body)
            newGroup.subject = subject;
            newGroup.name = newGroup.name.toUpperCase()
            return (await this.execRepository).save(newGroup)
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async update(id: string, body: UpdateGroupDTO) {
        try {
            return (await this.execRepository).update(id, body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async delete(id: string) {
        try {
            return (await this.execRepository).update(id, { active: false })
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async seeGroupTasks(id: string): Promise<GroupEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .leftJoin("group.task", "task")
                .where("group.id =:id", { id })
                .select(["group.name", "group.active", "task"])
                .getOne()
        } catch (error: any) {
            throw error.message
        }
    }

    async seeGroupProjects(id: string): Promise<GroupEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .leftJoin("group.project", "project")
                .where("group.id =:id", { id })
                .select(["group.name", "group.active", "project"])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    // TODO: COLOCAR LA PROMISE
    async seeGroupsWithoutTeachers() {
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .innerJoin("group.persons", "persons")
                .leftJoin("persons.person", "person")
                .getOne()

        } catch (error: any) {
            throw new Error(error)
        }
    }

    async exist(name: string, code: string): Promise<GroupEntity | null> {
        name = name.toUpperCase()
        try {
            return (await this.execRepository)
                .createQueryBuilder("group")
                .where("group.name = :name AND group.subject_code = :code", { name, code })
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }
}