import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
import { PersonEntity } from '../../../person/person/entity/person.entity';
import { GroupEntity } from '../../group/entity/group.entity';
import { BaseEntity } from '../../../config/base.entity';


@Entity({name:"group_person"})
export class GroupPersonEntity extends BaseEntity{

    @ManyToOne(() => PersonEntity, (person) => person.groups)
    @JoinColumn({name:"person_id"})
    person!:PersonEntity

    @ManyToOne(()=> GroupEntity, (group)=> group.persons)
    @JoinColumn({name:"group_id"})
    group!:GroupEntity

    @Column({
        type:"varchar",
        length:30
    })
    state!:string
}