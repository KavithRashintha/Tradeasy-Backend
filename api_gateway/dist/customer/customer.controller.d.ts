import { ClientProxy } from "@nestjs/microservices";
import { RegisterCustomerDTO, UpdateCustomerDTO } from "../models/customerModel";
export declare class CustomerController {
    private customerClient;
    constructor(customerClient: ClientProxy);
    createCustomer(payload: RegisterCustomerDTO): Promise<import("rxjs").Observable<any>>;
    findCustomer(id: any): Promise<import("rxjs").Observable<any>>;
    getAllCustomers(): Promise<import("rxjs").Observable<any>>;
    updateCustomer(id: number, updateCustomerDto: UpdateCustomerDTO): Promise<import("rxjs").Observable<any>>;
    deleteCustomer(id: number): Promise<import("rxjs").Observable<any>>;
}
