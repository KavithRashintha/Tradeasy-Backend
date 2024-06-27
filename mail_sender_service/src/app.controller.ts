import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GeneralEmailDTO,
  OrderStatusChangeEmailDTO,
  CustomerWarningEmailDTO,
  CustomerTerminationEmailDTO,
  SupplierTerminationEmailDTO,
  CustomerInvoiceEmailDTO,
  SupplierCredentialsEmailDTO,
  PurchaseOrderStatusEmailDTO,
  InventoryRefundStatusEmailDTO
} from './DTO/emailDTO';

@Controller()
export class AppController {
  constructor(private readonly emailSenderService: AppService) {}

  @MessagePattern({ cmd: 'SEND_EMAIL_GENERAL' })
  async sendGeneralEmail(@Payload() generalEmailDto: GeneralEmailDTO) {
    console.log(generalEmailDto);
    return await this.emailSenderService.sendGeneralEmail(generalEmailDto);
  }

  @MessagePattern({ cmd: 'SEND_EMAIL_ORDER_STATUS' })
  async sendOrderStatusChangeEmail(@Payload() orderStatusChangeEmailDto: OrderStatusChangeEmailDTO) {
    console.log(orderStatusChangeEmailDto);
    return await this.emailSenderService.sendOrderStatusChangeEmail(orderStatusChangeEmailDto);
  }
  
  @MessagePattern({ cmd: 'SEND_EMAIL_CUSTOMER_WARNING'})
  async sendCustomerWarningEmail(@Payload() customerWarningEmailDTO: CustomerWarningEmailDTO) {
    console.log(customerWarningEmailDTO);
    return await this.emailSenderService.sendCustomerWarningEmail(customerWarningEmailDTO);
  }

  @MessagePattern({ cmd: 'SEND_EMAIL_CUSTOMER_TERMINATION'})
  async sendCustomerTerminationEmail(@Payload() customerTerminationEmailDTO: CustomerTerminationEmailDTO) {
    console.log(customerTerminationEmailDTO);
    return await this.emailSenderService.sendCustomerTerminationEmail(customerTerminationEmailDTO);
  }

  @MessagePattern({ cmd: 'SEND_EMAIL_SUPPLIER_TERMINATION'})
  async sendSupplierTerminationEmail(@Payload() supplierTerminationEmailDTO: SupplierTerminationEmailDTO) {
    console.log(supplierTerminationEmailDTO);
    return await this.emailSenderService.sendSupplierTerminationEmail(supplierTerminationEmailDTO);
  }

  @MessagePattern({ cmd: 'SEND_EMAIL_CUSTOMER_INVOICE'})
  async sendCustomerInvoiceEmail(@Payload() customerInvoiceEmailDTO: CustomerInvoiceEmailDTO) {
    console.log("app.con:",customerInvoiceEmailDTO);
    return await this.emailSenderService.sendCustomerInvoiceEmail(customerInvoiceEmailDTO);
  }

  @MessagePattern({ cmd: 'SEND_EMAIL_SUPPLIER_CREDENTIALS'})
  async sendSupplierCredentials(@Payload() supplierCredentialsEmailDTO: SupplierCredentialsEmailDTO) {
    return await this.emailSenderService.sendSupplierCredentials(supplierCredentialsEmailDTO);
  }

  @MessagePattern({ cmd: 'SEND_PURCHASE_ORDER_STATUS'})
  async sendPurchaseOrderStatus(@Payload() purchaseOrderStatusEmailDTO: PurchaseOrderStatusEmailDTO) {
    return await this.emailSenderService.sendPurchaseOrderStatus(purchaseOrderStatusEmailDTO);
  }

  @MessagePattern({ cmd: 'SEND_INVENTORY_REFUND_STATUS'})
  async sendInventoryRefundStatus(@Payload() inventoryRefundStatusEmailDTO: InventoryRefundStatusEmailDTO) {
    return await this.emailSenderService.sendInventoryRefundStatus(inventoryRefundStatusEmailDTO);
  }

}
