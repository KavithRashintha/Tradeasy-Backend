export class PurchaseOrderDTO{
    readonly supplierId:string;
    readonly supplierName:string;
    readonly Address:string;
    readonly mail:string;
    readonly contact_number:string;
    readonly items:string;
    readonly itemQuantity: number;
    readonly status:string;
    readonly createdDate: Date;
}

export class UpdatePurchaseOrderDTO{
    readonly status?:string;
}