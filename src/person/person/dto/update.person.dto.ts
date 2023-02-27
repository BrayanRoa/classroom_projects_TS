import { IsEmail, IsOptional, IsString, Length } from 'class-validator';


export class UpdatePersonDTO{

    @IsEmail()
    @IsOptional()
    @IsString()
    institutional_mail?:string

    @IsOptional()
    @IsString()
    names?:string

    @IsOptional()
    @IsString()
    lastnames?:string

    @IsOptional()
    @IsString()
    code?:string

    @IsString()
    @IsOptional()
    @Length(7, 12)
    num_document?:string

    @IsOptional()
    @IsString()
    img?:string

}