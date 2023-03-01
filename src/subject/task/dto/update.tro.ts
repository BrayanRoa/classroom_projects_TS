import { IsDate, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDTO{
    
    @IsString()
    @Length(5,30)
    @IsOptional()
    name?: string

    @IsString()
    @Length(5,500)
    @IsOptional()
    description?: string

    @IsDate()
    @IsOptional()
    expired_date?: Date
}