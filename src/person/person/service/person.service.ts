import { BaseService } from '../../../config/base.service';
import { PersonEntity } from '../entity/person.entity';
import { PersonDTO } from '../dto/person.dto';
import { RoleService } from '../../role/service/role.service';
import { DocumentTypeService } from '../../document_type/service/document_type.service';
import { UpdatePersonDTO } from '../dto/update.person.dto';
import { UpdateResult } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary'

import bcrypt from 'bcrypt';


export class PersonService extends BaseService<PersonEntity>{

    constructor(
        private readonly roleService: RoleService = new RoleService(),
        private readonly documentService: DocumentTypeService = new DocumentTypeService(),
    ) {
        super(PersonEntity)
    }

    async findAll(): Promise<PersonEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.document_type", "document")
                .leftJoin("person.role", "role")
                .select([
                    "person",
                    "document.name",
                    "role.name"
                ])
                .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async getPeopleByRole(role: string): Promise<PersonEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.role", "role")
                .where("role.name = :name", { name: role })
                .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async getAllPersonOfGroup(group_id: string): Promise<PersonEntity[] | undefined> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.groups", "group")
                .leftJoin("person.role", "role")
                .where("group.group_id = :group_id and group.state = :state", { group_id, state: "in progress" })
                .select(["person", "group", "role.name"])
                .getMany()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findOneById(id: string): Promise<PersonEntity | null> {
        try {
            return (await this.execRepository).findOneBy({ id })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findOneByEmail(institutional_mail: string): Promise<PersonEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .addSelect("person.password")
                .where({ institutional_mail })
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findOneBy(term: string): Promise<PersonEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.role", "role")
                .leftJoin("person.document_type", "document")
                .where(
                    ` 
                    person.code = :term OR 
                    person.institutional_mail = :term`,
                    { term })
                .select([
                    "person",
                    "document.name",
                    "role.name"
                ])
                .getOne()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async create(person: PersonDTO): Promise<PersonEntity> {
        try {
            const document = await this.documentService.findById(person.document_id)
            const role = await this.roleService.findById(person.role_id)
            if (document && role) {
                const newPerson = (await this.execRepository).create(person)
                newPerson.password = await bcrypt.hash(newPerson.password, 10)
                newPerson.role = role
                newPerson.document_type = document
                return (await this.execRepository).save(newPerson)
            } else {
                throw new Error(`verify id of document and role`)
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async update(id: string, body: UpdatePersonDTO): Promise<UpdateResult> {
        try {
            return (await this.execRepository).update(id, body)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async delete(id: string): Promise<UpdateResult> {
        try {
            return (await this.execRepository).update(id, { active: false })
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async mySubjects(institutional_mail: string): Promise<PersonEntity | null> {
        try {
            return (await this.execRepository)
                .createQueryBuilder("person")
                .leftJoin("person.groups", "groups")
                .leftJoin("groups.group", "group")
                .leftJoin("group.subject", "subject")
                .where("person.institutional_mail = :institutional_mail", { institutional_mail })
                .select([
                    "person.names",
                    "person.id",
                    "groups.state",
                    "group",
                    "subject.name",
                    "subject.code"])
                .getOne()
        } catch (error: any) {
            throw error.message
        }
    }


    async uploadImage(id: string, image:any) {
        try {
            const person = await this.findOneById(id)
            if(!person) throw new Error(`person not found`)
            if (person?.img) {
                const nombreArray = person.img.split('/')
                const nombre = nombreArray.pop()
                const [public_id] = nombre!.split('.')
                await cloudinary.uploader.destroy(`ayd-folder-pruebas/${public_id}`) //* 👀 no lo esta borrando de cloudinary revisar
            }

            const { tempFilePath } = image
            const subida = await cloudinary.uploader.upload(tempFilePath, {
                folder: `ayd-folder-pruebas`
            })

            const { secure_url } = subida
            return (await this.execRepository).update(id, {img:secure_url})
        } catch (error: any) {
            throw new Error(error)
        }
    }
}