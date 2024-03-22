import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './dto/CustomerDTO';
export declare class AppService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    createCustomer(createCustomerDTO: CustomerDTO): Promise<Customer>;
}
