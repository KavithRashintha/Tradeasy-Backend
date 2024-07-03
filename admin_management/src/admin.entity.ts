import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
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

    @Column({default: ''})
    address: string;

    @Column({default: ''})
    profilePicture: string;

    @Column({ type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;
}

@Entity()
export class ShopReviews {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  customerName: string;

  @Column({nullable:false})
  starReviewCount: string;

  @Column({nullable:false})
  customerComment: string
}
