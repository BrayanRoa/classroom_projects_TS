import { BaseEntity } from '../../../config/base.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SubjectEntity } from '../../subject/entity/subject.entity';
import { GroupPersonEntity } from '../../group_person/entity/group_person.entity';
import { TaskEntity } from '../../task/entity/task.entity';
import { ProjectEntity } from '../../project/entity/project.entity';

@Entity({ name: "group" })
export class GroupEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 2,
        nullable: false
    })
    name!: string

    @Column({
        type: "boolean",
        default: true
    })
    active!: boolean

    @ManyToOne(() => SubjectEntity, (subject) => subject.group)
    @JoinColumn({ name: "subject_code" })
    subject!: SubjectEntity

    @OneToMany(() => GroupPersonEntity, (group_person) => group_person.group)
    persons!: GroupPersonEntity[]

    @OneToMany(() => TaskEntity, (task) => task.group)
    task!: TaskEntity[]

    @OneToMany(() => ProjectEntity, (project)=>project.group)
    project!:ProjectEntity[]

    @BeforeInsert()
    toLowerCase() {
        this.name = this.name.toUpperCase()
    }
}