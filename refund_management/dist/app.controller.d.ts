import { AppService } from './app.service';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { CustomerRefund } from './refunds.entity';
export declare class AppController {
    private readonly refundManagement;
    constructor(refundManagement: AppService);
    createCustomerRefund(customerRefundDto: CustomerRefundDTO): Promise<CustomerRefund>;
    getCustomerRefund(id: number): Promise<CustomerRefund>;
    getAllCustomerRefunds(): Promise<CustomerRefund[]>;
    deleteCustomerRefund(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getCustomerRefundByStatus(refundStatus: string): Promise<CustomerRefund[]>;
}
