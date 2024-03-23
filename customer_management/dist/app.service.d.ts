import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './dto/CustomerDTO';
import { GetCustomerDTO } from './dto/GetCustomerDTO';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';
export declare class AppService {
    private readonly customerRepository;
    constructor(customerRepository: Repository<Customer>);
    createCustomer(createCustomerDTO: CustomerDTO): Promise<Customer>;
    findCustomer(getCustomerDto: GetCustomerDTO): Promise<Customer | null>;
    getAllCustomers(): Promise<Customer[]>;
    updateCustomer(id: number, updateCustomerDto: UpdateCustomerDTO): Promise<Customer>;
    deleteCustomer(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
