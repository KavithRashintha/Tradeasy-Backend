import { ClientProxy } from '@nestjs/microservices';
import { RegisterCustomerDTO } from './models/customerModel';
export declare class ApprController {
    private customerClient;
    constructor(customerClient: ClientProxy);
    createCustomer(payload: RegisterCustomerDTO): Promise<import("rxjs").Observable<any>>;
}
