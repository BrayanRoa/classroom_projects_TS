import { BaseEntity } from '../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProjectEntity } from '../../project/entity/project.entity';

@Entity({ name: "advances" })
export class AdvanceEntity extends BaseEntity {

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
        type: "varchar",
        length: 300,
        nullable: false
    })
    link!: string

    @Column({
        type: "boolean",
        default: true
    })
    active!: boolean

    @Column({
        type: "date",
        nullable: false
    })
    delivery_date!: Date

    @ManyToOne(() => ProjectEntity, (project) => project.advance)
    @JoinColumn({ name: "project_id" })
    project!: ProjectEntity
}