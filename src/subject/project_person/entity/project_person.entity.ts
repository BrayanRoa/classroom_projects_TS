import { BaseEntity } from '../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PersonEntity } from '../../../person/person/entity/person.entity';
import { ProjectEntity } from '../../project/entity/project.entity';

@Entity({name:"project_person"})
export class ProjectPersonEntity extends BaseEntity{


    @ManyToOne(() => PersonEntity, (person) => person.projects)
    @JoinColumn({name:"person_id"})
    person!:PersonEntity

    @ManyToOne(() => ProjectEntity, (project) => project.persons)
    @JoinColumn({name:"project_id"})
    project!:PersonEntity

    @Column({
        type:"boolean"
    })
    state!:boolean

}