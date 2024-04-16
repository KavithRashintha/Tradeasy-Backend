import {Column} from "typeorm";

export class ProductDTO {
    readonly id : number;
    readonly productName: string;
    readonly productImage: string;
    readonly productQuantity: number;
    readonly productPrice: number;

}
