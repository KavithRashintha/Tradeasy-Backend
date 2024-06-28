import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { CustomerRefundDTO } from './dto/customerRefundDTO';
import { updateRefundStatusDTO } from './dto/updateRefundStatusDTO';
import { InventoryRefundDTO, UpdateInventoryRefundStatusDTO } from './dto/inventoryRefundDTO';
import { CustomerRefund, InventoryRefund } from './refunds.entity';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let inventoryClient: ClientProxy;

  beforeEach(async () => {
    const inventoryClientMock = {
      send: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            createCustomerRefund: jest.fn(),
            getCustomerRefund: jest.fn(),
            getAllCustomerRefunds: jest.fn(),
            deleteCustomerRefund: jest.fn(),
            getCustomerRefundByStatus: jest.fn(),
            getCustomerRefundCount: jest.fn(),
            updateRefundStatus: jest.fn(),
            getCustomerRefundsByCustomerId: jest.fn(),
            createInventoryRefund: jest.fn(),
            getAllInventoryRefund: jest.fn(),
            getInventoryRefundById: jest.fn(),
            updateInventoryRefunds: jest.fn(),
            deleteInventoryRefund: jest.fn(),
            getAllApprovedRefunds: jest.fn(),
          },
        },
        {
          provide: 'INVENTORY_MANAGEMENT',
          useValue: inventoryClientMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    inventoryClient = app.get<ClientProxy>('INVENTORY_MANAGEMENT');
  });

  describe('createCustomerRefund', () => {
    it('should create a customer refund', async () => {
      const customerRefundDto: CustomerRefundDTO = {
        orderId: 1,
        customerName: 'testCustomer',
        customerId: '123456', 
        contact: '123-456-7890',
        item: 'testItem',
        quantity: '2',
        reason: 'defective',
        totalPrice: '100.00',
        createdDate: new Date(),  
        status: 'pending',
      };
      const result = new CustomerRefund();
      jest.spyOn(appService, 'createCustomerRefund').mockResolvedValue(result);

      expect(await appController.createCustomerRefund(customerRefundDto)).toBe(result);
    });
  });

  describe('getCustomerRefund', () => {
    it('should return a customer refund by id', async () => {
      const id = 1;
      const result = new CustomerRefund();
      jest.spyOn(appService, 'getCustomerRefund').mockResolvedValue(result);

      expect(await appController.getCustomerRefund(id)).toBe(result);
    });
  });

  describe('getAllCustomerRefunds', () => {
    it('should return all customer refunds', async () => {
      const result = [new CustomerRefund()];
      jest.spyOn(appService, 'getAllCustomerRefunds').mockResolvedValue(result);

      expect(await appController.getAllCustomerRefunds()).toBe(result);
    });
  });

  describe('deleteCustomerRefund', () => {
    it('should delete a customer refund', async () => {
      const id = 1;
      const result = 'Successfully Deleted';
      jest.spyOn(appService, 'deleteCustomerRefund').mockResolvedValue(result);

      expect(await appController.deleteCustomerRefund(id)).toBe(result);
    });
  });

  describe('getCustomerRefundByStatus', () => {
    it('should return customer refunds by status', async () => {
      const refundStatus = 'approved';
      const result = [new CustomerRefund()];
      jest.spyOn(appService, 'getCustomerRefundByStatus').mockResolvedValue(result);

      expect(await appController.getCustomerRefundByStatus(refundStatus)).toBe(result);
    });
  });

  describe('getCustomerRefundCount', () => {
    it('should return the customer refund count', async () => {
      const result = 5;
      jest.spyOn(appService, 'getCustomerRefundCount').mockResolvedValue(result);

      expect(await appController.getCustomerRefundCount()).toBe(result);
    });
  });

  describe('updateRefundStatus', () => {
    it('should update the refund status', async () => {
      const updateRefundStatusDto: updateRefundStatusDTO = {
        id: 1,
        status: 'testStatus',
        denialReason: 'testReason'
      };
      const result = new CustomerRefund();
      jest.spyOn(appService, 'updateRefundStatus').mockResolvedValue(result);

      expect(await appController.updateRefundStatus(updateRefundStatusDto)).toBe(result);
    });
  });

  describe('createInventoryRefund', () => {
    it('should create an inventory refund', async () => {
      const inventoryRefundDTO: InventoryRefundDTO = {
        orderId: '1',  // Should be a string or number, adjust based on your data type
        supplierName: 'Supplier ABC',
        supplierId: '123456',
        item: 'Test Item',
        quantity: '2',
        price: '50.00',
        reason: 'Damaged during shipping',
        createdDate: new Date(),  // Should be an instance of Date
      };
  
      const result = new InventoryRefund();
      jest.spyOn(appService, 'createInventoryRefund').mockResolvedValue(result);
  
      expect(await appController.createInventoryRefund(inventoryRefundDTO)).toBe(result);
    });
  });
  

  describe('getAllInventoryRefund', () => {
    it('should return all inventory refunds', async () => {
      const result = [new InventoryRefund()];
      jest.spyOn(appService, 'getAllInventoryRefund').mockResolvedValue(result);

      expect(await appController.getAllInventoryRefund()).toBe(result);
    });
  });

  describe('getInventoryRefundById', () => {
    it('should return an inventory refund by id', async () => {
      const inventory_id = 1;
      const result = new InventoryRefund();
      jest.spyOn(appService, 'getInventoryRefundById').mockResolvedValue(result);

      expect(await appController.getInventoryRefundById(inventory_id)).toBe(result);
    });
  });

  describe('updateInventoryRefunds', () => {
    it('should update an inventory refund', async () => {
      const data = { id: 1, updateInventoryRefundStatusDTO: new UpdateInventoryRefundStatusDTO() };
      const result = new InventoryRefund();
      jest.spyOn(appService, 'updateInventoryRefunds').mockResolvedValue(result);

      expect(await appController.updateInventoryRefunds(data)).toBe(result);
    });
  });

  describe('deleteInventoryRefund', () => {
    it('should delete an inventory refund', async () => {
      const inventory_id = 1;
      const result = 'Successfully Deleted';
      jest.spyOn(appService, 'deleteInventoryRefund').mockResolvedValue(result);

      expect(await appController.deleteInventoryRefund(inventory_id)).toBe(result);
    });
  });

  describe('getAllApprovedRefunds', () => {
    it('should return all approved inventory refunds', async () => {
      const result = [new InventoryRefund()];
      jest.spyOn(appService, 'getAllApprovedRefunds').mockResolvedValue(result);

      expect(await appController.getAllApprovedRefunds()).toBe(result);
    });
  });
});
