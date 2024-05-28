import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OrderStatusChangeEmailDTO } from './DTO/EmailDTO';

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}

  async sendOrderStatusChangeEmail(user: OrderStatusChangeEmailDTO): Promise<{ success: boolean; message: string }> {
    await this.mailerService.sendMail({
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './orderStatusChangedTemplate', // Ensure the path to your email template is correct
      context: {
        subject: user.emailSubject,
        name: user.receiverName,
        body: user.emailBody,
      },
    });

    // Return a success message
    return {
      success: true,
      message: 'Email sent successfully',
    };
  }
}
