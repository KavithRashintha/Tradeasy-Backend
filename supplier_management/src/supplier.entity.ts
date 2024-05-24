/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplierName: string;

  @Column()
  supplierEmail: string;

  @Column()
  nic: string;

  @Column()
  supplierAddress: string;

  @Column()
  supplierContact: string;

  @Column()
  supplierPassword: string;

  @Column({ default: '' })
  paymentMethod: string;

  @Column({ default: '' })
  paymentDetails: string;

  @Column({ default: '' })
  profilePicture: string;
}