import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true, nullable: false})
  username: string;

  @Column({unique:true, nullable: false})
  email: string;

  @Column({default: ''})
  customerAddress: string;

  @Column()
  contactNo: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
