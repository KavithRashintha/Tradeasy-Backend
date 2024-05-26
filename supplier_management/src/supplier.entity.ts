/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true, nullable: false})
  username: string;

  @Column()
  password: string;

  @Column({unique:true, nullable: false})
  email: string;

  @Column()
  contactNo: string;

  @Column()
  role: string;

  @Column({ default: '' })
  nic: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  paymentMethod: string;

  @Column({ default: '' })
  paymentDetails: string;

  @Column({ default: '' })
  profilePicture: string;
}