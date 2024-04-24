import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discounts{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    sellingPrice: number;

    @Column()
    discountRate: number
}
