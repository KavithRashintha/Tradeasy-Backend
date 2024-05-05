import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sellerId: number;

  @Column()
  productName: string;

  @Column()
  productBrand: string;

  @Column()
  productManufacturer: string;

  @Column()
  productCategory: string;

  @Column()
  productDescription: string;

  @Column('text', {array: true})
  productImage: string[];

  @Column()
  productColour: string;

  @Column()
  productUnitPrice: number;

  @Column()
  productQuantity: number

}