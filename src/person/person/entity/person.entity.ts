import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";
import { DocumentTypeEntity } from "../../document_type/entity/document_type.entity";
import { RoleEntity } from '../../role/entity/role.entity';
import { GroupPersonEntity } from '../../../subject/group_person/entity/group_person.entity';
import { ProjectPersonEntity } from '../../../subject/project_person/entity/project_person.entity';

@Entity({ name: "person" })
export class PersonEntity extends BaseEntity {

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false
    })
    institutional_mail!: string

    //* campo nuevo
    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
        select:false
    })
    password!: string

    @Column({
        type: "varchar",
        length: 30,
        unique: false,
        nullable: false
    })
    names!: string

    @Column({
        type: "varchar",
        length: 30,
        unique: false,
        nullable: false
    })
    lastnames!: string

    @Column({
        type: "varchar",
        length: 8,
        unique: true,
        nullable: false
    })
    code!: string

    @Column({
        type:"varchar",
        unique:true,
        nullable:false
    })
    num_document!:string

    @Column({
        type: "varchar",
        length: 255,
        unique: false,
        nullable: true
    })
    img!: string

    @Column({
        type: "boolean",
        default: true,
        nullable: false
    })
    active!: boolean

    @ManyToOne(() => RoleEntity, (role) => role.person)
    @JoinColumn({ name: "role_id" })
    role!: RoleEntity

    @ManyToOne(() => DocumentTypeEntity, (document) => document.person)
    @JoinColumn({ name: "document_id" })
    document_type!: DocumentTypeEntity

    @OneToMany(() => GroupPersonEntity, (group_person) => group_person.person)
    groups!: GroupPersonEntity[]

    @OneToMany(() => ProjectPersonEntity, (project_person) => project_person.person)
    projects!: ProjectPersonEntity[]

    @BeforeInsert()
    toLowerCase() {
        this.names = this.names.toLowerCase()
        this.lastnames = this.lastnames.toLowerCase()
        this.institutional_mail = this.institutional_mail.toLowerCase()
    }
}