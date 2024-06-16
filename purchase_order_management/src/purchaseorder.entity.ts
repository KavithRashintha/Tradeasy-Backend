import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn } from "typeorm";

@Entity()
export class PurchaseOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    supplierId:string;

    @Column()
    supplierName:string;

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
    
    @Column({ type: 'date' })
    createdDate: Date;    

}
