export class RegisterProductDTO {
    readonly productName: string;
    readonly productImage: string;
    readonly productQuantity: number;
    readonly productPrice: number;
}

export class UpdateProductDTO {
    readonly id: number;
    readonly productName: string;
    readonly productImage: string;
    readonly productQuantity: number;
    readonly productPrice: number;
}