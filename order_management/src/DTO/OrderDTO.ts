import {Column, PrimaryGeneratedColumn} from "typeorm";

export class OrderDTO {
    readonly orderId : number;
    readonly orderReceiverName: string;
    readonly orderReceiverAddress: string;
    readonly orderReceiverContact: string;
    readonly orderItems: string;
    readonly orderPrice: number;
    readonly orderStatus: string;
    readonly orderCancelReason?: string;

}
