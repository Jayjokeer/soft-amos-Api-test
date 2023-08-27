import { randomUUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    age!: string;

    @Column()
    country!: string;

    @Column()
    password!: string;

}