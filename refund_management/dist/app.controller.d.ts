import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { CustomerRefund } from './refunds.entity';
export declare class AppController {
    private inventoryClient;
    private readonly refundManagement;
    constructor(inventoryClient: ClientProxy, refundManagement: AppService);
    createCustomerRefund(customerRefundDto: CustomerRefundDTO): Promise<CustomerRefund>;
    getCustomerRefund(id: number): Promise<CustomerRefund>;
    getAllCustomerRefunds(): Promise<CustomerRefund[]>;
    deleteCustomerRefund(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
    getCustomerRefundByStatus(refundStatus: string): Promise<CustomerRefund[]>;
    runTestFunction(): Promise<any>;
    getCustomerRefundCount(): Promise<number>;
}
