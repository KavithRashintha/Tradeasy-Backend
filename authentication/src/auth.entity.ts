/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true, nullable: false})
    username: string;

    @Column()
    password: string;

    @Column({unique:true, nullable: false})
    email: string;

    @Column()
    contact: string;

    @Column()
    role: string;

}
