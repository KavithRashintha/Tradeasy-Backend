import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  quantity: number;

  @Column()
  reason: string;

  @Column()
  totalPrice: number;

  @Column()
  date: string;

  @Column()
  status: string;
}
