export class RegisterProductDTO {
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

export class UpdateProductDTO {
    readonly id: number;
    readonly productName?: string;
    readonly productBrand?: string;
    readonly productManufacture?: string;
    readonly productCategory?: string;
    readonly productDescription?: string;
    readonly productImage?: string[];
    readonly productColor?: string;
    readonly productQuantity?: number;
    readonly productSellingPrice?: number;
}

export class CreateProductReviewDTO {
    readonly productId: string;
    readonly productReviewerName?: string;
    readonly productReviewDescription?: string;
    readonly productReviewStarCount?: string;
    readonly productReviewedDate?: string;
}