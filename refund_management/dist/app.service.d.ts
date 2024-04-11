import { CustomerRefund } from './refunds.entity';
import { Repository } from 'typeorm';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
export declare class AppService {
    private readonly refundManagement;
    constructor(refundManagement: Repository<CustomerRefund>);
    createCustomerRefund(customerRefundDto: CustomerRefundDTO): Promise<CustomerRefund>;
    getCustomerRefund(id: number): Promise<CustomerRefund>;
    getAllCustomerRefunds(): Promise<CustomerRefund[]>;
}
