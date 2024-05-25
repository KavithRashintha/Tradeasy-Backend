export class CreateProductReviewDTO {
    readonly id: number;
    readonly productId: string;
    readonly productReviewerName?: string;
    readonly productReviewDescription?: string;
    readonly productReviewStarCount?: string;
    readonly productReviewedDate?: string;
}