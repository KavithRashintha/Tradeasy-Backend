export class InventoryItemDTO {
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