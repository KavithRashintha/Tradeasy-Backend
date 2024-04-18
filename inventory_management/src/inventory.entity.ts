import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemDescription: string;

  @Column()
  itemCategory: string;

  @Column()
  itemQuantity: number;

  @Column()
  itemUnitPrice: number;

  @Column()
  manufacturedDate: string;

  @Column()
  expireDate: string;
}
