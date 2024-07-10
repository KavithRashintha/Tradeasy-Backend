export class CustomerRefundDTO{
    readonly orderId: number;
    readonly customerName: string;
    readonly customerId:string;
    readonly email: string;
    readonly item: string;
    readonly quantity: string;
    readonly reason: string;
    readonly totalPrice: string;
    readonly createdDate: Date;
    readonly status: string
}

export class updateRefundStatusDTO {
    readonly id: number;
    readonly status: string;
  }

 





export class InventoryRefundDTO{
    readonly orderId: string;
    readonly supplierName:string;
    readonly supplierId:string;
    readonly supplierMail:string;
    readonly item:string;
    readonly quantity:string;
    readonly price:string;
    readonly reason:string;
}

export class UpdateInventoryRefundStatusDTO {
    readonly status: string;
}
