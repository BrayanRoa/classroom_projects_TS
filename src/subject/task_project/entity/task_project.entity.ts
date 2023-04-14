import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProjectEntity } from "../../project/entity/project.entity";
import { TaskEntity } from "../../task/entity/task.entity";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "task_project" })
export class TaskProjectEntity extends BaseEntity {

    @Column({
        type: "varchar",
        nullable: false,
        default:"undelivered" //TODO: ESTADOS PERMITIDOS (SIN ENTREGAR, ENTREGADO)
    })
    state!: string

    @Column({
        type:"varchar",
        nullable:true,
    })
    link!:string

    @ManyToOne(() => ProjectEntity, (project) => project.task)
    @JoinColumn({ name: "project_id" })
    project!: ProjectEntity

    @ManyToOne(() => TaskEntity, (task) => task.project)
    @JoinColumn({ name: "task_id" })
    task!: TaskEntity

}