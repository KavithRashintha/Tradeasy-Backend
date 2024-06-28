import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryItemDTO } from './dto/InventoryItemDTO';
import { Item } from './inventory.entity';
import { UpdateInventoryItemDTO } from './dto/UpdateInventoryItemDTO';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService, // Provide the real AppService
        {
          provide: 'ItemRepository', // Provide a mock for ItemRepository
          useValue: {
            // Mock methods as needed
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addInventoryItem', () => {
    it('should add an inventory item', async () => {
      // Define a sample DTO object for testing
      const createInventoryItemDto: InventoryItemDTO = {
        sellerId: 1,
        productName: 'Test Product',
        productBrand: 'Test Brand',
        productManufacturer: 'Test Manufacturer',
        productCategory: 'Test Category',
        productDescription: 'Test Description',
        productImage: ['image1.jpg', 'image2.jpg'],
        productColour: 'Test Colour',
        productQuantity: 10,
        productUnitPrice: 99.99,
      };

      // Define the expected result structure based on your appService logic
      const expectedResult: Item = {
        id: 1,
        sellerId: 1,
        productName: 'Test Product',
        productBrand: 'Test Brand',
        productManufacturer: 'Test Manufacturer',
        productCategory: 'Test Category',
        productDescription: 'Test Description',
        productImage: ['image1.jpg', 'image2.jpg'],
        productColour: 'Test Colour',
        productQuantity: 10,
        productUnitPrice: 99.99,
      };

      // Mock the service method to return the expected result
      jest.spyOn(appService, 'addInventoryItem').mockResolvedValueOnce(expectedResult);

      // Call the controller method with the DTO object
      const result = await appController.addInventoryItem(createInventoryItemDto);

      // Assert that the result matches the expected result
      expect(result).toEqual(expectedResult);
    });
  });


  describe('testFunction', () => {
    it('should return a test message', async () => {
      const expectedResult = 'Communication between services are working';

      const result = await appController.testFunction();
      expect(result).toEqual(expectedResult);
    });
  });
});
