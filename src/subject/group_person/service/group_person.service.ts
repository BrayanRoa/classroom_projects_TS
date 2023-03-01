import { BaseService } from '../../../config/base.service';
import { GroupPersonEntity } from '../entity/group_person.entity';
import { PersonService } from '../../../person/person/service/person.service';
import { GroupService } from '../../group/service/group.service';
import { GroupPersonDTO } from '../dto/group_person.dto';


export class GroupPersonService extends BaseService<GroupPersonEntity>{

    constructor(
        private readonly personService: PersonService = new PersonService(),
        private readonly groupService: GroupService = new GroupService()
    ) {
        super(GroupPersonEntity)
    }

    async findOneBy(person:string, group:string):Promise<GroupPersonEntity | null>{
        try {
            return (await this.execRepository)
                .createQueryBuilder("group_person")
                .where("group_person.person = :person AND group_person.group = :group",{person, group})
                .getOne()
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async registerPerson(body: GroupPersonDTO): Promise<GroupPersonEntity | undefined> {
        try {
            const person = await this.personService.findOneById(body.person)
            const group = await this.groupService.findOneBy(body.group)
            if (person && group) {
                await this.existPersonInGroup(person.id, group.id)
                const group_person = (await this.execRepository).create(body)
                group_person.person = person
                group_person.group = group
                return (await this.execRepository).save(group_person)
            } else {
                throw new Error(`Person or group not found`)
            }
        } catch (error: any) {
            throw error
        }
    }

    async changeTheStatus(body:GroupPersonDTO) {
        try {
            const info = await this.findOneBy(body.person, body.group);
            if(info === null){
                throw new Error(`person or group not found`)
            }else{
                return (await this.execRepository)
                    .update({id:info?.id},{state:body.state})
            }
        } catch (error:any) {
            throw error
        }
    }

    async existPersonInGroup(person_id: string, group_id: string) {
        try {
            const exist = (await this.execRepository)
                .createQueryBuilder("group_person")
                .where(`
                    group_person.person_id = :person_id AND group_person.group_id = :group_id`, { person_id, group_id })
                .getOne();
            if(await exist){
                throw new Error(`Person already exist in group`)
            }
        } catch (error:any) {
            throw error
        }
    }
}