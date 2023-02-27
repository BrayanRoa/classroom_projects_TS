import { IsOptional, IsString, Length } from "class-validator"

export class UpdateSubjectDTO {

    @IsOptional()
    @IsString()
    @Length(3, 50)
    name!: string

    @IsOptional()
    @IsString()
    @Length(7, 8)
    code!: string
}