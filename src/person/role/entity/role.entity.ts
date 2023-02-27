import { Column, Entity, OneToMany, BeforeInsert } from 'typeorm';
import { BaseEntity } from "../../../config/base.entity";
import { PersonEntity } from '../../person/entity/person.entity';

@Entity({name:"role"})
export class RoleEntity extends BaseEntity {

    @Column({
        type:"varchar",
        nullable:false,
        unique:true
    })
    name!:string

    @Column({
        type:"boolean",
        default:true
    })
    state!:boolean

    @OneToMany(()=> PersonEntity, (person)=> person.role)
    person!:PersonEntity[]

    @BeforeInsert()
    toLowerCase(){
        this.name = this.name.toLowerCase()
    }
}