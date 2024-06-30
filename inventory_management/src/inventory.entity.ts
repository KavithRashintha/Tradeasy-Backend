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

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value),
  }})
  productUnitPrice: number;

  @Column()
  productQuantity: number

}
