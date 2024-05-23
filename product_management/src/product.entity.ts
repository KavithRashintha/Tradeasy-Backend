import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  productBrand: string;

  @Column()
  productManufacture: string;

  @Column()
  productCategory: string;

  @Column()
  productDescription: string;

  @Column("text", { array: true })
  productImage: string[];

  @Column()
  productColor: string;

  @Column()
  productQuantity: number;

  @Column()
  productSellingPrice: number;
}
