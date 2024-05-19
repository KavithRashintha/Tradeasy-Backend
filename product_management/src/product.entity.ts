import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column("text", { array: true })
  productImage: string[];

  @Column()
  productQuantity: number;

  @Column()
  productPrice: number;
}
