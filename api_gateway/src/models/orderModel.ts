export class RegisterOrderDTO {
    readonly orderId : number;
    readonly orderReceiverName: string;
    readonly orderReceiverAddress: string;
    readonly orderReceiverContact: string;
    readonly orderItems: string[];
    readonly orderPrice: number;
    readonly orderStatus: string;
    readonly orderCancelReason?: string;
    readonly orderCustomerId?: string;
    readonly orderDate?: Date;
    readonly lastOrderStatusUpdatedDate?: Date;


}

export class UpdateOrderDTO {
    readonly orderId: number;
    readonly orderReceiverName?: string;
    readonly orderReceiverAddress?: string;
    readonly orderReceiverContact?: string;
    readonly orderItems?: string[];
    readonly orderPrice?: number;
    readonly orderStatus?: string;
    readonly orderCancelReason?: string;
    readonly orderCustomerId?: string;
    readonly orderDate?: Date;
    readonly lastOrderStatusUpdatedDate?: Date;
}


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
    readonly departedDate: Date;
    readonly quantity:string;
    readonly total_amount:string;
    
}

export class UpdatePurchaseOrderDTO{
    readonly status?:string;
}

