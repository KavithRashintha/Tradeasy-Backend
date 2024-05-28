import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderStatusChangeEmailDTO } from './DTO/EmailDTO';

@Controller()
export class AppController {
  constructor(private readonly emailSenderService: AppService) {}

  @MessagePattern({ cmd: 'SEND_EMAIL_ORDER_STATUS' })
  async sendOrderStatusChangeEmail(@Payload() orderStatusChangeEmailDto: OrderStatusChangeEmailDTO) {
    console.log(orderStatusChangeEmailDto);
    return await this.emailSenderService.sendOrderStatusChangeEmail(orderStatusChangeEmailDto);
  }
}
