/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerPayments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    contactNumber: string

    @Column()
    email: string;

    @Column()
    purchasedItems: string;

    @Column()
    totalAmount: number;
}
