import { IsNotEmpty, IsString, Length } from "class-validator"


export class SubjectDTO {

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name!: string

    @IsNotEmpty()
    @IsString()
    @Length(7, 8)
    code!: string
}