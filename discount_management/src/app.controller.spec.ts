import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscountsDTO } from './dto/discountsDTO';
import { Discounts } from './discount.entity';

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
            createDiscount: jest.fn(),
            searchAllDiscounts: jest.fn(),
            getAllDiscounts: jest.fn(),
            getDiscountById: jest.fn(),
            deleteDiscount: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('createDiscount', () => {
    it('should create a discount', async () => {
      const discountsDTO: DiscountsDTO = {
        productId: '1',
        productName: 'testProduct',
        sellingPrice: 1000.25,
        discountRate: 0.05,
        startDate: '2024-03-05',
        endDate: '2025-09-25',
      };
      const result = new Discounts();
      jest.spyOn(appService, 'createDiscount').mockResolvedValue(result);

      expect(await appController.createDiscount(discountsDTO)).toBe(result);
    });
  });

  describe('searchAllDiscounts', () => {
    it('should search all discounts', async () => {
      const query = {};
      const result = [new Discounts()];
      jest.spyOn(appService, 'searchAllDiscounts').mockResolvedValue(result);

      expect(await appController.searchAllDiscounts(query)).toBe(result);
    });
  });

  describe('getAllDiscounts', () => {
    it('should return all discounts', async () => {
      const result = [new Discounts()];
      jest.spyOn(appService, 'getAllDiscounts').mockResolvedValue(result);

      expect(await appController.getAllDiscounts()).toBe(result);
    });
  });

  describe('getDiscountById', () => {
    it('should return a discount by id', async () => {
      const id = 1;
      const result = new Discounts();
      jest.spyOn(appService, 'getDiscountById').mockResolvedValue(result);

      expect(await appController.getDiscountById(id)).toBe(result);
    });
  });

  describe('deleteDiscount', () => {
    it('should delete a discount', async () => {
      const id = 1;
      const result = 'Successfully Deleted';
      jest.spyOn(appService, 'deleteDiscount').mockResolvedValue(result);

      expect(await appController.deleteDiscount(id)).toBe(result);
    });
  });
});
