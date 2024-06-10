export class CustomerRefundDTO{
    readonly orderId: number;
    readonly customerName: string;
    readonly contact: string;
    readonly item: string;
    readonly quantity: string;
    readonly reason: string;
    readonly totalPrice: string;
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