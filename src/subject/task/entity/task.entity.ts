import { Column, JoinColumn, ManyToOne, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { GroupEntity } from '../../group/entity/group.entity';
import { TaskProjectEntity } from '../../task_project/entity/task_project.entity';

@Entity({name:"taks"})
export class TaskEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 30,
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
        type: "date",
        nullable: false
    })
    expired_date!: Date

    // @Column({
    //     type: "boolean",
    //     default: true
    // })
    // active!: boolean

    @ManyToOne(()=> GroupEntity, (group)=> group.task)
    @JoinColumn({name:"group_id"})
    group!:GroupEntity

    @OneToMany(()=> TaskProjectEntity, (task_project) => task_project.task)
    project!:TaskProjectEntity[]
}