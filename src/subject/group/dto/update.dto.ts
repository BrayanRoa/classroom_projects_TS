import { IsBoolean, IsOptional, IsString, Length } from "class-validator"

export class UpdateGroupDTO {

    @IsOptional()
    @IsString()
    @Length(1, 2)
    name?: string

    @IsBoolean()
    @IsOptional()
    active?: boolean
}