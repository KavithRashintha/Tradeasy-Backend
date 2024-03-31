export declare class InventoryItemDTO {
    readonly itemDescription: string;
    readonly itemCategory: string;
    readonly itemQuantity: number;
    readonly itemUnitPrice: number;
    readonly manufacturedDate: string;
    readonly expireDate: string;
}
export declare class UpdateInventoryItemDTO {
    readonly id: number;
    readonly itemDescription: string;
    readonly itemCategory: string;
    readonly itemQuantity: number;
    readonly itemUnitPrice: number;
    readonly manufacturedDate: string;
    readonly expireDate: string;
}
