/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerPayments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: string;

    @Column()
    customerName: string;

    @Column()
    contactNumber: string

    @Column()
    email: string;

    @Column()
    address: string;

    @Column('text', { array: true })
    purchasedItems: string[];

    @Column()
    totalAmount: number;

    @Column({type:'date'})
    date: Date;

    @Column({type:'time'})
    time: Date;
}
