export class CustomerRefundDTO{
    
    readonly customerName: string;
    readonly customerId:string;
    readonly contact: string;
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
    readonly supplier:string;
    readonly item:string;
    readonly quantity:string;
    readonly price:string;
    readonly reason:string;
}