import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {GeneralEmailDTO, OrderStatusChangeEmailDTO, CustomerWarningEmailDTO, CustomerTerminationEmailDTO} from './DTO/EmailDTO';

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
}
