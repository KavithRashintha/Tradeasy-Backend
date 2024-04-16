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
  supplierAddress: string;

  @Column()
  supplierContact: string;

  @Column()
  supplierPassword: string;
}