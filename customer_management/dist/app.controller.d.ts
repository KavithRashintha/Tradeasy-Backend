import { AppService } from './app.service';
import { CustomerDTO, GetCustomerDTO } from './dto/CustomerDTO';
import { Customer } from './customer.entity';
export declare class AppController {
    private readonly customerManagement;
    constructor(customerManagement: AppService);
    createCustomer(createCustomerDto: CustomerDTO): Promise<Customer>;
    getCustomerById(getCustomerDto: GetCustomerDTO): Promise<Customer | null>;
}
