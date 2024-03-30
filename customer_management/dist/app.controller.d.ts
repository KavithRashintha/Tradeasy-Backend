import { AppService } from './app.service';
import { CustomerDTO } from './dto/CustomerDTO';
import { Customer } from './customer.entity';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';
export declare class AppController {
    private readonly customerManagement;
    constructor(customerManagement: AppService);
    createCustomer(createCustomerDto: CustomerDTO): Promise<Customer>;
    getCustomerById(id: any): Promise<Customer | null>;
    getAllCustomers(): Promise<Customer[]>;
    updateCustomer(data: {
        id: number;
        updateCustomerDto: UpdateCustomerDTO;
    }): Promise<Customer>;
    deleteCustomer(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
