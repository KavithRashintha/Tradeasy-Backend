import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderDTO } from './DTO/OrderDTO';
import { UpdateOrderDTO } from './DTO/UpdateOrderDTO';
import { PurchaseOrderDTO, UpdatePurchaseOrderDTO } from './DTO/purchaseOrderDTO';


describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;
  
    beforeEach(async () => {
      const mockService = {
        createOrders: jest.fn(),
        findOrder: jest.fn(),
        // Add other mocked methods as needed
      };
  
      const moduleRef = await Test.createTestingModule({
        controllers: [AppController],
        providers: [
          { provide: AppService, useValue: mockService },
          // Add other providers/mock dependencies here
        ],
      }).compile();
  
      appService = moduleRef.get<AppService>(AppService);
      appController = moduleRef.get<AppController>(AppController);
    });
  
    describe('createOrders', () => {
      it('should create an order', async () => {
        const orderDto: OrderDTO = {
          orderId: 1,
          orderReceiverName: 'John Doe',
          orderReceiverAddress: '123 Main St',
          orderReceiverContact: '123-456-7890',
          orderItems: ['Item 1', 'Item 2'],
          orderPrice: 100,
          orderStatus: 'Pending',
        };
  
        (appService.createOrders as jest.Mock).mockResolvedValueOnce(orderDto);
  
        const result = await appController.createOrders(orderDto);
        expect(result).toEqual(orderDto);
      });
    });
  
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  });