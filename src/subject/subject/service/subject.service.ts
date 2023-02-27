import { BaseService } from '../../../config/base.service';
import { SubjectEntity } from '../entity/subject.entity';
import { SubjectDTO } from '../dto/subject.dto';
import { UpdateSubjectDTO } from '../dto/update.dto';


export class SubjectService extends BaseService<SubjectEntity>{

    constructor() {
        super(SubjectEntity)
    }

    async findAll(): Promise<SubjectEntity[] | undefined> {
        try {
            return (await this.execRepository).find()
                // .createQueryBuilder("subject")
                // .leftJoinAndSelect("subject.group","group")
                // .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findOneBy(code: string) {
        try {
            return (await this.execRepository)
                .createQueryBuilder("subject")
                .leftJoin("subject.group", "group")
                .where("subject.code = :code", { code })
                .select([
                    "subject.code",
                    "subject.name",
                    "subject.id",
                    "group.name",
                    "group.id"
                ])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(body: SubjectDTO): Promise<SubjectEntity | undefined> {
        try {
            return (await this.execRepository).save(body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async update(id: string, body: UpdateSubjectDTO) {
        try {
            return (await this.execRepository).update(id, body)
        } catch (error: any) {
            throw new Error(error)
        }
    }
}