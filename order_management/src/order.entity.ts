import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    orderId: number;

    @Column()
    orderReceiverName: string;

    @Column()
    orderReceiverAddress: string;

    @Column()
    orderReceiverContact: string;

    @Column("text", { array: true })
    orderItems: string[];

    @Column('decimal', { precision: 20, scale: 2 })
    orderPrice: number;

    @Column({default: 'Pending'})
    orderStatus: string;

    @Column({default: ''})
    orderCancelReason: string;

    @Column()
    orderCustomerId: string;

    @Column()
    orderDate: Date;

    @Column()
    lastOrderStatusUpdatedDate: Date;

}


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

    @Column({default: 'Pending'})
    status:string;  
    
    @CreateDateColumn({ type: 'date' })
    createdDate: Date;    

    @Column()
    quantity:string;

    @Column()
    total_amount:string;

    @Column({ type: 'date', nullable: true })
    departedDate: Date;

    @Column({ nullable: true })
     order_cancel_reason: string;
}

