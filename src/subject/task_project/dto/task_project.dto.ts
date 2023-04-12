import { IsNotEmpty, IsOptional } from "class-validator"

export class TaskProjectDTO{

    // @IsNotEmpty()
    // expired_date!: Date

    @IsOptional()
    id!:string

    @IsNotEmpty()
    state!: string

    @IsNotEmpty()
    project_id!: string

    @IsNotEmpty()
    task_id!: string

    @IsOptional()
    link?:string
}