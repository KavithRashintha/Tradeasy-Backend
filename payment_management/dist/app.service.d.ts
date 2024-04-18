import { CustomerPayments } from './payment.entity';
import { Repository } from 'typeorm';
import { CustomerPaymentDTO } from './dto/cutomerPaymentDTO';
export declare class AppService {
    private readonly customerPaymentManagement;
    [x: string]: any;
    constructor(customerPaymentManagement: Repository<CustomerPayments>);
    createCustomerPayment(customerPaymentDTO: CustomerPaymentDTO): Promise<CustomerPayments>;
    getAllCustomerPayments(): Promise<CustomerPayments[]>;
    getCustomerPaymentById(id: any): Promise<CustomerPayments | null>;
}
