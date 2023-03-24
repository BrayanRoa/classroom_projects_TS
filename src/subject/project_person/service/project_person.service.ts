import { ProjectService } from '../../project/service/project.service';
import { ProjectPersonEntity } from '../entity/project_person.entity';
import { BaseService } from '../../../config/base.service';
import { ProjectPersonDTO } from '../dto/project_person.dto';
import { PersonService } from '../../../person/person/service/person.service';
import { UpdateProjectDTO } from '../../project/dto/update_project.dto';
// import { HttpResponse } from '../../../shared/response/http-response';

export class ProjectPersonService extends BaseService<ProjectPersonEntity>{


    constructor(
        private readonly projectService:ProjectService = new ProjectService(),
        private readonly personService: PersonService = new PersonService(),
    ){
        super(ProjectPersonEntity)
    }

    async registerPersonInProject(body:ProjectPersonDTO) {
        try {
            const exist = await this.existPersonInProject(body.person_id, body.project_id)
            if(exist){
                throw new Error(`Person already exist in project`)
            }else{
                const project = await this.projectService.findOneById(body.project_id)
                const person = await this.personService.findOneById(body.person_id)
                if(project && person && project.registeredPersons < project.number_of_students){
                    let projectUpdate = new UpdateProjectDTO()
                    projectUpdate.registeredPersons = ++project.registeredPersons
                    await this.projectService.update(body.project_id, projectUpdate)
                    const newPersonInProject = (await this.execRepository).create(body)
                    newPersonInProject.project = project
                    newPersonInProject.person = person!                
                    return (await this.execRepository).save(newPersonInProject)
                }else{
                    throw new Error(`Project full`)
                }
            }
        } catch (error:any) {
            throw new Error(error)
        }
    }

    private async existPersonInProject(person:string, project:string):Promise<ProjectPersonEntity | null>{
        try {
            return (await this.execRepository)
                .createQueryBuilder("project")
                .where("project.person = :person AND project.project = :project", {person, project})
                .getOne()
        } catch (error:any) {
            throw new Error(error)
        }
    }


}