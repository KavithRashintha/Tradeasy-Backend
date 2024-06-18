import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {GeneralEmailDTO, 
        OrderStatusChangeEmailDTO, 
        CustomerWarningEmailDTO, 
        CustomerTerminationEmailDTO, 
        SupplierTerminationEmailDTO,
        CustomerInvoiceEmailDTO,
        SupplierCredentialsEmailDTO,
        PurchaseOrderStatusEmailDTO
      } from './DTO/EmailDTO';

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

  async sendCustomerInvoiceEmail(user: CustomerInvoiceEmailDTO): Promise<{ success: boolean; message: string }> {
    // Define the mail options
    console.log(user.receiverEmail);
    console.log(user.emailSubject);
    console.log(user.receiverName);
    console.log(user.receiverEmail);
    console.log(user.pdfFilePath);
    const mailOptions: any = {
      to: user.receiverEmail,
      subject: user.emailSubject,
      template: './generalTemplate',
      context: {
          subject: user.emailSubject,
          name: user.receiverName,
          body: user.emailBody,
      },
  };

  // Check if there is a PDF file path provided and attach it
  if (user.pdfFilePath) {
      mailOptions.attachments = [
          {
              filename: 'invoice.pdf',
              path: user.pdfFilePath,
              contentType: 'application/pdf',
          },
      ];
  }

  // Send the email
  await this.mailerService.sendMail(mailOptions);

    // Return a success message
    return {
      success: true,
      message: 'Email sent successfully',
    };
  }

  async sendSupplierCredentials(user: SupplierCredentialsEmailDTO): Promise<{ success: boolean; message: string }> {
    console.log(user);
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


  async sendPurchaseOrderStatus(user: PurchaseOrderStatusEmailDTO): Promise<{ success: boolean; message: string }> {
    console.log(user);
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
