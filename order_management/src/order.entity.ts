import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    orderPrice: number;

    @Column({default: 'Pending'})
    orderStatus: string;

    @Column({default: ''})
    orderCancelReason: string;

    @Column()
    orderCustomerId: string;

    @Column()
    orderDate: Date;

}