import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { BaseDTO } from '../../../config/base.dto';

export class RoleDTO {

    @IsString()
    @IsNotEmpty()    
    name!:string
    
    @IsBoolean()
    @IsOptional()
    state?:boolean
}