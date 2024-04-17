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

    @Column()
    orderItems: string;

    @Column()
    orderPrice: number;

    @Column()
    orderStatus: string;

    @Column()
    orderCancelReason: string;

}