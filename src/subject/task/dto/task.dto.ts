import { IsDate, IsNotEmpty, IsString, IsUUID, Length } from "class-validator"


export class TaskDTO{

    @IsNotEmpty()
    @IsString()
    @Length(5,30)
    name!: string

    @IsNotEmpty()
    @IsString()
    @Length(5,500)
    description!: string

    @IsDate()
    @IsNotEmpty()
    expired_date!: Date

    @IsUUID()
    @IsNotEmpty()
    group!:string
}