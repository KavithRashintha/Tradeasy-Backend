// /* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerPayments {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: false })
    customerId: string;

    @Column({ nullable: false })
    customerName: string;

    @Column({ nullable: false })
    customerEmail: string;

    @Column({ nullable: false })
    contactNo: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    totalAmount: number;
}


@Entity()
export class SupplierPayments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    supplierId: string;

    @Column({ nullable: false })
    supplierName: string;

    @Column({ nullable: false })
    date: string;

    @Column({ nullable: false })
    itemsPurchased: string;

    @Column({ nullable: false })
    billAmount: number;
}
