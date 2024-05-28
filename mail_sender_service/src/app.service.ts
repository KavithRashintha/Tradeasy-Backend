import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDTO } from './DTO/EmailDTO';

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(user: EmailDTO): Promise<{ success: boolean; message: string }> {
    await this.mailerService.sendMail({
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './template', // Ensure the path to your email template is correct
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
