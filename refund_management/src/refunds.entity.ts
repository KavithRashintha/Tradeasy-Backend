import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerRefund {
  @PrimaryGeneratedColumn()
  id: number;

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
  status: string;
}
