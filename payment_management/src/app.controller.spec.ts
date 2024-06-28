import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerPayments, SupplierPayments } from './payment.entity';
import { SupplierPaymentDTO } from './dto/supplierPaymentDTO';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createCustomerPaymentSession: jest.fn(),
            getCheckoutSession: jest.fn(),
            saveCustomerPayments: jest.fn(),
            getAllCustomerPayments: jest.fn(),
            getCustomerPaymentById: jest.fn(),
            searchAllPayments: jest.fn(),
            createSupplierPayment: jest.fn(),
            getAllSupplierPayments: jest.fn(),
            searchAllSupplierPayments: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('createCustomerPaymentSession', () => {
    it('should return a session URL', async () => {
      const result = { sessionUrl: 'http://example.com' };
      jest.spyOn(appService, 'createCustomerPaymentSession').mockResolvedValue(result);

      expect(await appController.createCustomerPaymentSession({})).toBe(result);
    });
  });

  describe('getCheckoutSession', () => {
    it('should return a checkout session', async () => {
      const sessionId = 'sessionId';
      const result = { id: sessionId };
      jest.spyOn(appService, 'getCheckoutSession').mockResolvedValue(result);

      expect(await appController.getCheckoutSession(sessionId)).toBe(result);
    });
  });

  describe('saveCustomerPayments', () => {
    it('should save customer payments', async () => {
      const data = {};
      const result = new CustomerPayments();
      jest.spyOn(appService, 'saveCustomerPayments').mockResolvedValue(result);

      expect(await appController.saveCustomerPayments(data)).toBe(result);
    });
  });

  describe('getAllCustomerPayments', () => {
    it('should return all customer payments', async () => {
      const result = [new CustomerPayments()];
      jest.spyOn(appService, 'getAllCustomerPayments').mockResolvedValue(result);

      expect(await appController.getAllCustomerPayments()).toBe(result);
    });
  });

  describe('getCustomerPaymentById', () => {
    it('should return a customer payment by id', async () => {
      const id = 'id';
      const result = new CustomerPayments();
      jest.spyOn(appService, 'getCustomerPaymentById').mockResolvedValue(result);

      expect(await appController.getCustomerPaymentById(id)).toBe(result);
    });
  });

  describe('searchAllPayments', () => {
    it('should search all customer payments', async () => {
      const query = {};
      const result = [new CustomerPayments()];
      jest.spyOn(appService, 'searchAllPayments').mockResolvedValue(result);

      expect(await appController.searchAllPayments(query)).toBe(result);
    });
  });

  describe('createSupplierPayment', () => {
    it('should create supplier payment', async () => {
      const supplierPaymentDTO = new SupplierPaymentDTO();
      const result = new SupplierPayments();
      jest.spyOn(appService, 'createSupplierPayment').mockResolvedValue(result);

      expect(await appController.createSupplierPayment(supplierPaymentDTO)).toBe(result);
    });
  });

  describe('getAllSupplierPayments', () => {
    it('should return all supplier payments', async () => {
      const result = [new SupplierPayments()];
      jest.spyOn(appService, 'getAllSupplierPayments').mockResolvedValue(result);

      expect(await appController.getAllSupplierPayments()).toBe(result);
    });
  });

  describe('searchAllSupplierPayments', () => {
    it('should search all supplier payments', async () => {
      const query = {};
      const result = [new SupplierPayments()];
      jest.spyOn(appService, 'searchAllSupplierPayments').mockResolvedValue(result);

      expect(await appController.searchAllSupplierPayments(query)).toBe(result);
    });
  });
});
