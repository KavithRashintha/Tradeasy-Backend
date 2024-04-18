import { ClientProxy } from '@nestjs/microservices';
import { RegisterOrderDTO } from "./models/orderModel";
import { UpdateOrderDTO } from "./models/orderModel";
export declare class OrderController {
    private orderClient;
    constructor(orderClient: ClientProxy);
    createProduct(payload: RegisterOrderDTO): Promise<import("rxjs").Observable<any>>;
    findOrder(id: any): Promise<import("rxjs").Observable<any>>;
    getAllOrders(): Promise<import("rxjs").Observable<any>>;
    updateOrder(id: number, updateOrderDto: UpdateOrderDTO): Promise<import("rxjs").Observable<any>>;
    deleteOrder(id: number): Promise<import("rxjs").Observable<any>>;
}
