import { AppService } from './app.service';
import { CustomerPaymentDTO } from './dto/cutomerPaymentDTO';
import { CustomerPayments } from './payment.entity';
export declare class AppController {
    private readonly customerPaymentManagement;
    constructor(customerPaymentManagement: AppService);
    createCustomerPayment(customerPaymentDTO: CustomerPaymentDTO): Promise<CustomerPayments>;
    getAllCustomerPayments(): Promise<CustomerPayments[]>;
    getCustomerPaymentById(id: any): Promise<CustomerPayments | null>;
}
