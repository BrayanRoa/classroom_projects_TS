import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { ConfigServer } from './config';
import { BaseEntity } from './base.entity';


export class BaseService<T extends BaseEntity> extends ConfigServer{

    public execRepository:Promise<Repository<T>>

    constructor(entity:EntityTarget<T>){
        super()
        this.execRepository = this.initRepository(entity)
    }

    async initRepository<T extends ObjectLiteral>(entity:EntityTarget<T>):Promise<Repository<T>>{
        const getConn = await this.db()
        return getConn!.getRepository(entity)
    }
}