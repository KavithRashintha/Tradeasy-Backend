export class InventoryRefundDTO {
  
    readonly supplierName:string;
    readonly supplierId:string;
    readonly item:string;
    readonly quantity:string;
    readonly price:string;
    readonly reason:string;
    readonly createdDate: Date;

}

export class UpdateInventoryRefundStatusDTO {
    readonly status: string;
}