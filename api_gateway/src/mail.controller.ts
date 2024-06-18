import {Body, Controller, Inject, Post, UseGuards,  UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { ClientProxy } from '@nestjs/microservices';
import {GeneralEmailDTO,
        OrderStatusChangeEmailDTO, 
        CustomerWarningEmailDTO, 
        CustomerTerminationEmailDTO, 
        SupplierTerminationEmailDTO, 
        CustomerInvoiceEmailDTO,
        SupplierCredentialsEmailDTO,
        PurchaseOrderStatusEmailDTO,
        InventoryRefundStatusEmailDTO
    } from "./models/emailModel";
import {JwtGuard} from './guards/jwt.guard';

@Controller('email')
export class EmailController {
    constructor(
        @Inject('MAIL_SENDER_SERVICE') private emailClient: ClientProxy,
    ) {}

    //For Normal Emails
    @UseGuards(JwtGuard)
    @Post('send')
    async sendGeneralEmail(@Body() payload: GeneralEmailDTO) {
        // console.log(payload);
        return this.emailClient.send({ cmd: 'SEND_EMAIL_GENERAL' }, payload);
    }

    //For Order Status Changed Emails
    @UseGuards(JwtGuard)
    @Post('send/orderStatus')
    async sendOrderStatusEmail(@Body() payload: OrderStatusChangeEmailDTO) {
        return this.emailClient.send({ cmd: 'SEND_EMAIL_ORDER_STATUS' }, payload);
    }

    //For OCustomer Warning Emails
    @UseGuards(JwtGuard)
    @Post('send/customerWarning')
    async sendCustomerWarningEmail(@Body() payload: CustomerWarningEmailDTO) {
        return this.emailClient.send({ cmd: 'SEND_EMAIL_CUSTOMER_WARNING' }, payload);
    }

    @UseGuards(JwtGuard)
    @Post('send/customerTermination')
    async sendCustomerTerminationEmail(@Body() payload: CustomerTerminationEmailDTO) {
        return this.emailClient.send({ cmd: 'SEND_EMAIL_CUSTOMER_TERMINATION' }, payload);
    }

    @UseGuards(JwtGuard)
    @Post('send/supplierTermination')
    async sendSupplierTerminationEmail(@Body() payload: SupplierTerminationEmailDTO) {
        return this.emailClient.send({ cmd: 'SEND_EMAIL_SUPPLIER_TERMINATION' }, payload);
    }

    //For Customer Invoices
    @UseGuards(JwtGuard)
    @Post('send/customerInvoice')
    @UseInterceptors(FileInterceptor('pdfFilePath'))
    async sendCustomerInvoiceEmail(
        @UploadedFile() file: Express.Multer.File,
        @Body() payload: CustomerInvoiceEmailDTO
    ) {
        console.log("api:", payload);
        console.log("api:", file);
        const updatedPayload = {
            ...payload,
            pdfFilePath: file.path // or file.buffer depending on how you handle files
        };
        console.log("api:", updatedPayload);
        return this.emailClient.send({ cmd: 'SEND_EMAIL_CUSTOMER_INVOICE' }, updatedPayload);
    }

    //For Supplier Credentials
    @UseGuards(JwtGuard)
    @Post('send/supplierCredentials')
    async sendSupplierCredentials(@Body() payload: SupplierCredentialsEmailDTO) {
        return this.emailClient.send({ cmd: 'SEND_EMAIL_SUPPLIER_CREDENTIALS' }, payload);
    }

    //For Purchase Order Status Update
    @UseGuards(JwtGuard)
    @Post('send/purchaseOrderStatus')
    async sendPurchaseOrderStatus(@Body() payload: PurchaseOrderStatusEmailDTO) {
        return this.emailClient.send({ cmd: 'SEND_PURCHASE_ORDER_STATUS' }, payload);
    }

    //For Inventory Refund Status Update
    @UseGuards(JwtGuard)
    @Post('send/pinventoryRefundStatus')
    async sendInventoryRefundStatus(@Body() payload: InventoryRefundStatusEmailDTO) {
        return this.emailClient.send({ cmd: 'SEND_INVENTORY_REFUND_STATUS' }, payload);
    }
}



