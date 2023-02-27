import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../config/base.entity';
import { GroupEntity } from '../../group/entity/group.entity';

@Entity({ name: "subject" })
export class SubjectEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    name!: string

    @Column({
        type: "varchar",
        length: 8,
        nullable: false,
        unique: true
    })
    code!: string

    @OneToMany(() => GroupEntity, (group) => group.subject)
    group!:GroupEntity[]

    @BeforeInsert()
    toLowerCase(){
        this.name = this.name.toLowerCase()
    }
}