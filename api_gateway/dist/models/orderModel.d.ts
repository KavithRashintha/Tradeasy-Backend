export declare class RegisterOrderDTO {
    readonly orderId: number;
    readonly orderReceiverName: string;
    readonly orderReceiverAddress: string;
    readonly orderReceiverContact: string;
    readonly orderItems: string;
    readonly orderPrice: number;
    readonly orderStatus: string;
    readonly orderCancelReason: string;
}
export declare class UpdateOrderDTO {
    readonly orderId: number;
    readonly orderReceiverName: string;
    readonly orderReceiverAddress: string;
    readonly orderReceiverContact: string;
    readonly orderItems: string;
    readonly orderPrice: number;
    readonly orderStatus: string;
    readonly orderCancelReason: string;
}
