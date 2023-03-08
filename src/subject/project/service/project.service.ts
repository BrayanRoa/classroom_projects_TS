import { BaseService } from '../../../config/base.service';
import { ProjectEntity } from '../entity/project.entity';
import { GroupService } from '../../group/service/group.service';
import { ProjectDTO } from '../dto/project.dto';

export class ProjectService extends BaseService<ProjectEntity>{
    
    constructor(
        private readonly groupService: GroupService = new GroupService()
    ){
        super(ProjectEntity)
    }

    async findOneBy(id:string): Promise<ProjectEntity | null> {
        try {
            return (await this.execRepository).findOneBy({id})
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async create(body:ProjectDTO){
        try {
            const group = await this.groupService.findOneBy(body.group)
            if(group){
                const newProject = (await this.execRepository).create(body)
                newProject.group = group
                return (await this.execRepository).save(newProject)
            }
        } catch (error:any) {
            throw new Error(error)
        }
    }
}