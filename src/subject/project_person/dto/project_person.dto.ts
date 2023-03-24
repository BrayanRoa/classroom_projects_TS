import { IsNotEmpty, IsUUID, IsBoolean } from 'class-validator';

export class ProjectPersonDTO{

    @IsNotEmpty()
    @IsUUID()
    person_id!:string

    @IsNotEmpty()
    @IsUUID()
    project_id!:string

    @IsNotEmpty()
    @IsBoolean()
    state!:boolean
}