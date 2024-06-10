import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';

@Entity()
export class CustomerRefund {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  customerName: string;

  @Column()
  contact: string;

  @Column()
  item: string;

  @Column()
  quantity: string;

  @Column()
  reason: string;

  @Column()
  totalPrice: string;

  @CreateDateColumn({ type: 'date' })
  createdDate: Date;  
     

  @Column({default: 'pending'})
  status: string;
}
