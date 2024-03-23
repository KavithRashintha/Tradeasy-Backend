import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO, GetCustomerDTO } from './dto/CustomerDTO';
export declare class AppService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    createCustomer(createCustomerDTO: CustomerDTO): Promise<Customer>;
    findCustomer(getCustomerDto: GetCustomerDTO): Promise<Customer | null>;
    getAllCustomers(): Promise<Customer[]>;
    updateCustomer(id: number, updateCustomerDto: CustomerDTO): Promise<Customer>;
}
