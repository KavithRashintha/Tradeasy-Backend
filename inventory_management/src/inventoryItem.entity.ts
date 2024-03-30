import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class InventoryItem{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    itemDescription: string

    @Column()
    itemCategory: string

    @Column()
    itemQuantity: number

    @Column()
    itemUnitPrice: number

    @Column()
    manufacturedDate: Date

    @Column()
    expireDate: Date
}