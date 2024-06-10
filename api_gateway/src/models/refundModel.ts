export class CustomerRefundDTO{
    readonly orderId: number;
    readonly customerName: string;
    readonly contact: string;
    readonly item: string;
    readonly quantity: number;
    readonly reason: string;
    readonly totalPrice: number;
    readonly status: string
}


export class InventoryRefundDTO{
    readonly supplier:string;
    readonly item:string;
    readonly quantity:string;
    readonly price:string;
    readonly reason:string;
}