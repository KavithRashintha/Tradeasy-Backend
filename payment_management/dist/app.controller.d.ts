import { AppService } from './app.service';
import { SupplierPaymentDTO } from './dto/supplierPaymentDTO';
import { CustomerPayments, SupplierPayments } from './payment.entity';
import { Query } from 'express-serve-static-core';
export declare class AppController {
    private readonly PaymentManagement;
    constructor(PaymentManagement: AppService);
    createCustomerPaymentSession(data: any): Promise<{
        sessionUrl: string;
    }>;
    saveCustomerPayments(data: any): Promise<SupplierPayments>;
    getAllCustomerPayments(): Promise<CustomerPayments[]>;
    getCustomerPaymentById(id: any): Promise<CustomerPayments | null>;
    searchAllPayments(query: Query): Promise<CustomerPayments[]>;
    createSupplierPayment(supplierPaymentDTO: SupplierPaymentDTO): Promise<SupplierPayments>;
    getAllSupplierPayments(): Promise<SupplierPayments[]>;
    searchAllSupplierPayments(query: Query): Promise<SupplierPayments[]>;
}
