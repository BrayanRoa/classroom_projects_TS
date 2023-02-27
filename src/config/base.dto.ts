import { IsDate, IsOptional} from "class-validator";


export class BaseDTO{
    
    // @IsUUID()
    // @IsOptional()
    // id?:string
    
    @IsDate()
    @IsOptional()
    created_at?:Date
    
    @IsDate()
    @IsOptional()
    updated_at?:Date

}