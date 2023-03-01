import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator"

export enum STATE{
    cancelled = "cancelled",
    approved = "approved",
    in_progress = "in progress"
}   


export class GroupPersonDTO{

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    person!:string

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    group!:string

    @IsEnum(STATE)
    @IsNotEmpty()
    state!:STATE
}