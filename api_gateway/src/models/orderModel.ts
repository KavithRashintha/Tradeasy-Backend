export class RegisterOrderDTO {
    readonly orderId : number;
    readonly orderReceiverName: string;
    readonly orderReceiverAddress: string;
    readonly orderReceiverContact: string;
    readonly orderItems: string;
    readonly orderPrice: number;
    readonly orderStatus: string;
    readonly orderCancelReason: string;

}

export class UpdateOrderDTO {
    readonly orderId : number;
    readonly orderReceiverName: string;
    readonly orderReceiverAddress: string;
    readonly orderReceiverContact: string;
    readonly orderItems: string;
    readonly orderPrice: number;
    readonly orderStatus: string;
    readonly orderCancelReason: string;

}

// update-order-status.dto.ts
export class UpdateOrderStatusDTO {
    readonly orderId: number;
    readonly orderStatus: string;
}


