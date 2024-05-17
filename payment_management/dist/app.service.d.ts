/// <reference types="multer" />
import { CustomerPayments, SupplierPayments } from './payment.entity';
import { Repository } from 'typeorm';
import { Data } from './dto/cutomerPaymentDTO';
import { SupplierPaymentDTO } from './dto/supplierPaymentDTO';
import { Query } from 'express-serve-static-core';
export declare class AppService {
    private readonly customerPaymentManagement;
    private readonly supplierPaymentManagement;
    [x: string]: any;
    private stripe;
    constructor(customerPaymentManagement: Repository<CustomerPayments>, supplierPaymentManagement: Repository<SupplierPayments>);
    createCustomerPaymentSession(data: {
        lineItems: Data[];
    }): Promise<any>;
    saveCustomerPayments(paymentData: CustomerPayments): Promise<any>;
    getAllCustomerPayments(): Promise<CustomerPayments[]>;
    getCustomerPaymentById(id: any): Promise<CustomerPayments | null>;
    searchAllPayments(query: Query): Promise<CustomerPayments[]>;
    createSupplierPayment(supplierPaymentDTO: SupplierPaymentDTO): Promise<SupplierPayments>;
    saveFile(file: Express.Multer.File): Promise<string>;
    getAllSupplierPayments(): Promise<SupplierPayments[]>;
    searchAllSupplierPayments(query: Query): Promise<SupplierPayments[]>;
}
