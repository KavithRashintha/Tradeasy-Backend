import {Column} from "typeorm";

export class ProductDTO {
    readonly id : number;
    readonly productName: string;
    readonly productBrand?: string;
    readonly productManufacture?: string;
    readonly productCategory?: string;
    readonly productDescription?: string;
    readonly productImage?: string[];
    readonly productColor?: string;
    readonly productQuantity: number;
    readonly productSellingPrice: number;
}
