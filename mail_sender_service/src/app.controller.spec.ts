import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const mockService = {
      sendGeneralEmail: jest.fn(),
      sendOrderStatusChangeEmail: jest.fn(),
      sendCustomerWarningEmail: jest.fn(),
      sendCustomerTerminationEmail: jest.fn(),
      sendSupplierTerminationEmail: jest.fn(),
      sendCustomerInvoiceEmail: jest.fn(),
      sendSupplierCredentials: jest.fn(),
      sendPurchaseOrderStatus: jest.fn(),
      sendInventoryRefundStatus: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue: mockService },
      ],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('sendGeneralEmail', () => {
    it('should send a general email', async () => {
      const generalEmailDto: GeneralEmailDTO = {
        receiverName: 'testReceiver',
        emailSubject: 'Test Email',
        emailBody: 'This is a test email.',
        receiverEmail: 'recipient@example.com'
      };

      (appService.sendGeneralEmail as jest.Mock).mockResolvedValueOnce(true);

      const result = await appController.sendGeneralEmail(generalEmailDto);
      expect(result).toEqual(true);
    });
  });

  describe('sendOrderStatusChangeEmail', () => {
    it('should send an order status change email', async () => {
      const orderStatusChangeEmailDto: OrderStatusChangeEmailDTO = {
        receiverName: 'testReceiver',
        emailSubject: 'Test Email',
        emailBody: 'This is a test email.',
        receiverEmail: 'recipient@example.com'
      };

      (appService.sendOrderStatusChangeEmail as jest.Mock).mockResolvedValueOnce(true);

      const result = await appController.sendOrderStatusChangeEmail(orderStatusChangeEmailDto);
      expect(result).toEqual(true);
    });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });
});
