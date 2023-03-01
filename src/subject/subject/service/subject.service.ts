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

    async findOneById(id:string): Promise<SubjectEntity | null> {
        try {
            return (await this.execRepository).findOneBy({id})
        } catch (error:any) {
            throw new Error(error)
        }
    }

    //* 👀 AQUI VEO SOLO LOS GRUPOS QUE TIENEN DOCENTES ASIGNADOS
    async findOneWithteachers(id: string) {
        try {
            return (await this.execRepository)
                .createQueryBuilder("subject")
                .innerJoinAndSelect("subject.group", "group")
                .innerJoinAndSelect("group.persons", "persons")
                .innerJoinAndSelect("persons.person", "person")
                .innerJoinAndSelect("person.role", "role")
                .where("subject.id = :id AND role.name = :rol", { id, rol:"docente" })
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