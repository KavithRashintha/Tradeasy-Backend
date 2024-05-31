import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {GeneralEmailDTO, OrderStatusChangeEmailDTO, CustomerWarningEmailDTO, CustomerTerminationEmailDTO, SupplierTerminationEmailDTO} from './DTO/EmailDTO';

@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}

  async sendGeneralEmail(user: GeneralEmailDTO): Promise<{ success: boolean; message: string }> {
    await this.mailerService.sendMail({
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './generalTemplate', 
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

  async sendOrderStatusChangeEmail(user: OrderStatusChangeEmailDTO): Promise<{ success: boolean; message: string }> {
    await this.mailerService.sendMail({
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './orderStatusChangedTemplate', 
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

  async sendCustomerWarningEmail(user: CustomerWarningEmailDTO): Promise<{ success: boolean; message: string }> {
    await this.mailerService.sendMail({
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './generalTemplate', 
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

  async sendCustomerTerminationEmail(user: CustomerTerminationEmailDTO): Promise<{ success: boolean; message: string }> {
    await this.mailerService.sendMail({
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './generalTemplate', 
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

  async sendSupplierTerminationEmail(user: SupplierTerminationEmailDTO): Promise<{ success: boolean; message: string }> {
    await this.mailerService.sendMail({
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './generalTemplate', 
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
