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

  @Column({default: 'Pending'})
  productStatus: string;
}



@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  productId: string;

  @Column({ nullable: false })
  productReviewerName: string;

  @Column({ nullable: false })
  productReviewDescription: string;

  @Column({ nullable: false })
  productReviewStarCount: string;

  @Column({ nullable: false })
  productReviewedDate: string;
}
