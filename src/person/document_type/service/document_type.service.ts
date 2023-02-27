import { BaseService } from '../../../config/base.service';
import { DocumentTypeEntity } from '../entity/document_type.entity';
import { DocumentTypeDTO } from '../dto/document_type.dto';


export class DocumentTypeService extends BaseService<DocumentTypeEntity>{

    constructor() {
        super(DocumentTypeEntity)
    }

    async findAll(): Promise<DocumentTypeEntity[] | undefined> {
        try {
            return (await this.execRepository).find();
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async findById(id: string):Promise<DocumentTypeEntity | null> {
        try {
            return (await this.execRepository).findOneBy({id})
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async findByIdWithPersons(id:string){
        try {
            return (await this.execRepository)
                .createQueryBuilder("document")
                .leftJoin("document.person", "person")
                .where("document.id = :id", { id })
                .select([
                    "document.name",
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

    async create(body: DocumentTypeDTO) {
        try {
            return (await this.execRepository).save(body);
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async update(id: string, name: string) {
        try {
            return (await this.execRepository).update(id, { name });
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async delete(id: string) {
        try {
            return (await this.execRepository).update(id, {state:false});
        } catch (error: any) {
            throw new Error(error)
        }
    }
}