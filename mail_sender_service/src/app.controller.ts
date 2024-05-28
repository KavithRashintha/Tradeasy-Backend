import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailDTO } from './DTO/EmailDTO';

@Controller()
export class AppController {
  constructor(private readonly emailSenderService: AppService) {}

  @MessagePattern({ cmd: 'SEND_EMAIL' })
  async sendEmail(@Payload() emailDto: EmailDTO) {
    console.log(emailDto);
    return await this.emailSenderService.sendEmail(emailDto);
  }
}
