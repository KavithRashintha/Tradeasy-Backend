import { CustomerRefund } from './refunds.entity';
import { Repository } from 'typeorm';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
export declare class AppService {
    private readonly refundRepository;
    constructor(refundRepository: Repository<CustomerRefund>);
    createCustomerRefund(customerRefundDto: CustomerRefundDTO): Promise<CustomerRefund>;
    getCustomerRefund(id: number): Promise<CustomerRefund>;
    getAllCustomerRefunds(): Promise<CustomerRefund[]>;
    deleteCustomerRefund(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
