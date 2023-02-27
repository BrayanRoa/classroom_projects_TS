import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


export abstract class BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @CreateDateColumn({
        type: "timestamp"
    })
    created_at!: Date

    @UpdateDateColumn({
        type: "timestamp"
    })
    updated_at!: Date
} 