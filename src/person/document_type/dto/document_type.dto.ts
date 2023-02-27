import { IsBoolean, IsNotEmpty, IsString, IsOptional } from "class-validator"
// import { BaseDTO } from '../../../config/base.dto';


export class DocumentTypeDTO {
    
    @IsString()
    @IsNotEmpty()
    name!:string

    @IsBoolean()
    @IsOptional()
    state?:boolean
}