import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";

@Entity()
export class PurchaseOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplier:string;

    @Column()
    Address:string;

    @Column()
    mail:string;

    @Column()
    contact_number:string;

    @Column()
    items:string;

    @Column({default: 'pending'})
    status:string;  
    
    @CreateDateColumn({ type: 'date' })
    createdDate: Date;    

}
