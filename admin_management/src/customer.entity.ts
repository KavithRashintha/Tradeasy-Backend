import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // customerName: string;

  // @Column()
  // customerEmail: string;

  // @Column()
  // customerAddress: string;

  // @Column()
  // customerContact: string;

  // @Column()
  // customerPassword: string;

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

    @Column({default: ''})
    address: string;

    @Column({default: ''})
    profilePicture: string;
}