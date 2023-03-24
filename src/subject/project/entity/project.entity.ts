import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { GroupEntity } from '../../group/entity/group.entity';
import { AdvanceEntity } from '../../advance/entity/advance.entity';
import { ProjectPersonEntity } from '../../project_person/entity/project_person.entity';

@Entity({ name: "projects" })
export class ProjectEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 30,
        unique: true,
        nullable: false
    })
    name!: string

    @Column({
        type: "varchar",
        length: 500,
        nullable: false
    })
    description!: string

    @Column({
        type: "boolean",
        default: true
    })
    active!: boolean

    @Column({
        type: "varchar",
        length: 20,
        nullable: false
    })
    state!: string

    @Column({
        type: "int",
        nullable: false
    })
    number_of_students!: number

    @Column({
        type:"int",
        default:0
    })
    registeredPersons!:number

    @Column({
        type: "boolean",
        default: false
    })
    full!: boolean

    @ManyToOne(() => GroupEntity, (group) => group.project)
    @JoinColumn({ name: "group_id" })
    group!: GroupEntity

    @OneToMany(() => AdvanceEntity, (advance) => advance.project)
    advance!: AdvanceEntity[]

    @OneToMany(() => ProjectPersonEntity, (project_person) => project_person.person )
    persons!:ProjectPersonEntity[]
}