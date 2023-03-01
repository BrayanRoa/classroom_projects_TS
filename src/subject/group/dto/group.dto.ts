import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator"


export class GroupDTO {

    @IsNotEmpty()
    @IsString()
    @Length(1, 2)
    name!: string

    @IsBoolean()
    @IsOptional()
    active!: boolean

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    subject_code!: string

}