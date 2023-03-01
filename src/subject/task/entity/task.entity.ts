import { Column, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { GroupEntity } from '../../group/entity/group.entity';

@Entity({name:"taks"})
export class TaskEntity extends BaseEntity {

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
        type: "date",
        nullable: false
    })
    expired_date!: Date

    @Column({
        type: "boolean",
        default: true
    })
    active!: boolean

    @ManyToOne(()=> GroupEntity, (group)=> group.task)
    @JoinColumn({name:"group_id"})
    group!:GroupEntity
}