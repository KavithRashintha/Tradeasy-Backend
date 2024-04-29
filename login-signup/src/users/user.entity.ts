import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true, nullable:false})
    username:string;

    @Column({ unique: true, nullable:false})
    password:string;

    @Column({nullable:true})
    role:string;

    @Column()
    @UpdateDateColumn()
    updateAt:Date;
    
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password,10);
    }

    async validatePassword(password:string): Promise<boolean>{
     return bcrypt.compare(password,this.password);
    }

}