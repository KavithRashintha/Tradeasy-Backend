export class InventoryItemDTO{
    readonly sellerId: number;
    readonly productName: string;
    readonly productBrand: string;
    readonly productManufacturer: string;
    readonly productCategory: string;
    readonly productDescription: string;
    readonly productImage: string[];
    readonly productColour: string;
    readonly productQuantity: number;
    readonly productUnitPrice: number;
}

export class UpdateInventoryItemDTO{
    readonly id: string;
    readonly itemDescription: string;
    readonly itemCategory: string;
    readonly itemQuantity: number;
    readonly itemUnitPrice: number;
    readonly manufacturedDate: string;
    readonly expireDate: string;
}