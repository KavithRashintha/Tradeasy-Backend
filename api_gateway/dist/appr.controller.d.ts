import { ClientProxy } from '@nestjs/microservices';
import { RegisterCustomerDTO, UpdateCustomerDTO } from './models/customerModel';
import { InventoryItemDTO, UpdateInventoryItemDTO } from "./models/inventoryModel";
export declare class ApprController {
    private customerClient;
    private inventoryClient;
    constructor(customerClient: ClientProxy, inventoryClient: ClientProxy);
    createCustomer(payload: RegisterCustomerDTO): Promise<import("rxjs").Observable<any>>;
    findCustomer(id: any): Promise<import("rxjs").Observable<any>>;
    getAllCustomers(): Promise<import("rxjs").Observable<any>>;
    updateCustomer(id: number, updateCustomerDto: UpdateCustomerDTO): Promise<import("rxjs").Observable<any>>;
    deleteCustomer(id: number): Promise<import("rxjs").Observable<any>>;
    addInventoryItem(payload: InventoryItemDTO): Promise<import("rxjs").Observable<any>>;
    getInventoryItem(id: number): Promise<import("rxjs").Observable<any>>;
    getAllInventoryItems(): Promise<import("rxjs").Observable<any>>;
    updateInventoryItem(id: number, updateInventoryItemDto: UpdateInventoryItemDTO): Promise<import("rxjs").Observable<any>>;
    deleteInventoryItem(id: number): Promise<import("rxjs").Observable<any>>;
}
