export class PurchaseOrderDTO{
    readonly supplierId:string;
    readonly supplierName:string;
    readonly Address:string;
    readonly mail:string;
    readonly contact_number:string;
    readonly items:string;
    readonly status:string;
    readonly createdDate: Date;
    readonly departedDate: Date;
    readonly quantity:string;
    readonly total_amount:string;
}

export class UpdatePurchaseOrderDTO{
    readonly status?:string;
}





