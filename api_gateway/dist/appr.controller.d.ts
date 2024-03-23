import { ClientProxy } from '@nestjs/microservices';
import { GetCustomerDTO, RegisterCustomerDTO, UpdateCustomerDTO } from './models/customerModel';
export declare class ApprController {
    private customerClient;
    constructor(customerClient: ClientProxy);
    createCustomer(payload: RegisterCustomerDTO): Promise<import("rxjs").Observable<any>>;
    findCustomerById(payload: GetCustomerDTO): Promise<import("rxjs").Observable<any>>;
    getAllCustomers(): Promise<import("rxjs").Observable<any>>;
    updateCustomer(id: number, updateCustomerDto: UpdateCustomerDTO): Promise<import("rxjs").Observable<any>>;
}
