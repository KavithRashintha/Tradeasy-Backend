export class InventoryItemDTO {
  readonly id: number;
  readonly itemDescription: string;
  readonly itemCategory: string;
  readonly itemQuantity: number;
  readonly itemUnitPrice: number;
  readonly manufacturedDate: Date;
  readonly expireDate: Date;
  readonly inStock: boolean;
}
