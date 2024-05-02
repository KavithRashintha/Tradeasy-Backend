import { ClientProxy } from '@nestjs/microservices';
import { InventoryItemDTO, UpdateInventoryItemDTO } from "./models/inventoryModel";
import { CustomerRefundDTO } from "./models/refundModel";
export declare class ApprController {
    private inventoryClient;
    private refundClient;
    constructor(inventoryClient: ClientProxy, refundClient: ClientProxy);
    addInventoryItem(payload: InventoryItemDTO): Promise<import("rxjs").Observable<any>>;
    getInventoryItem(id: number): Promise<import("rxjs").Observable<any>>;
    getAllInventoryItems(): Promise<import("rxjs").Observable<any>>;
    updateInventoryItem(id: number, updateInventoryItemDto: UpdateInventoryItemDTO): Promise<import("rxjs").Observable<any>>;
    deleteInventoryItem(id: number): Promise<import("rxjs").Observable<any>>;
    getInventoryItemByCategory(productCategory: string): Promise<import("rxjs").Observable<any>>;
    createCustomerRefund(customerRefundDto: CustomerRefundDTO): Promise<import("rxjs").Observable<any>>;
    getCustomerRefund(id: number): Promise<import("rxjs").Observable<any>>;
    getAllCustomerRefunds(): Promise<import("rxjs").Observable<any>>;
    deleteCustomerRefund(id: number): Promise<import("rxjs").Observable<any>>;
}
