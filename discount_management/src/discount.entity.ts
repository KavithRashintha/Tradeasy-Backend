import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discounts{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    productId: string;

    @Column()
    productName: string;

    @Column()
    sellingPrice: number;

    @Column()
    discountRate: number

    @Column()
    startDate: string;

    @Column()
    endDate: string;
}
