import { DeleteResult } from 'typeorm';
import { BaseService } from '../../../config/base.service';
import { RoleDTO } from '../dto/role.dto';
import { RoleEntity } from '../entity/role.entity';

export class RoleService extends BaseService<RoleEntity>{

    constructor() {
        super(RoleEntity)
    }

    async findAll(): Promise<RoleEntity[] | undefined> {
        try {
            return (await this.execRepository).find()
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async findById(id: string):Promise<RoleEntity | null> {
        try {
            return (await this.execRepository).findOneBy({id})
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async findByIdWithPersons(id: string): Promise<RoleEntity | undefined | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("role")
                .leftJoin("role.person", "person")
                .where("role.id = :id", { id:id })
                .select([
                    "role.name",
                    "person.names",
                    "person.lastnames",
                    "person.institutional_mail",
                    "person.code"
                ])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(body: RoleDTO): Promise<RoleEntity | undefined> {
        try {
            return (await this.execRepository).save(body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async delete(id: string): Promise<DeleteResult | undefined> {
        try {
            return (await this.execRepository).update(id, {state:false})
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async update(id: string, name: string) {
        try {
            return (await this.execRepository).update(id, { name })
        } catch (error:any) {
            throw new Error(error)
        }
    }
}