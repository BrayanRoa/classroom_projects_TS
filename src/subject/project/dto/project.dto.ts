import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from '../../../config/base.entity';

export enum STATE_PROJECT{
    in_progress = "in progress",
    on_hold = "on hold",
    finished = "finished"
}

export class ProjectDTO extends BaseEntity{

    @IsNotEmpty()
    @IsString()    
    name!: string

    @IsNotEmpty()
    @IsString() 
    description!: string

    //* in progress, on hold, finished, 
    @IsEnum(STATE_PROJECT)
    @IsNotEmpty()
    state!: string

    @IsNotEmpty()
    @IsNumber() 
    number_of_students!: number

    @IsUUID()
    @IsNotEmpty()
    @IsString()
    group!: string
}