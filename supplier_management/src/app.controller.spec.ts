import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Supplier } from './supplier.entity';
import { SupplierDTO } from './dto/SupplierDTO';
import { UpdateSupplierDTO } from './dto/UpdateSupplierDTO';

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
            createSupplier: jest.fn(),
            updateLastLogin: jest.fn(),
            getSupplier: jest.fn(),
            findSupplierByUsername: jest.fn(),
            getAllSuppliers: jest.fn(),
            searchAllSuppliers: jest.fn(),
            updateSupplier: jest.fn(),
            deleteSupplier: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('createSupplier', () => {
    it('should create a supplier', async () => {
      const createSupplierDto: SupplierDTO = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        contactNo: '123456789',
        role: 'supplier',
        address: '123 Test Street',
        nic: '123456789V',
        paymentMethod: 'credit card',
        paymentDetails: '1234-5678-9012-3456',
        profilePicture: 'profile.jpg',
      };
      const result = new Supplier();
      jest.spyOn(appService, 'createSupplier').mockResolvedValue(result);

      expect(await appController.createSupplier(createSupplierDto)).toBe(result);
    });
  });

  describe('updateLastLogin', () => {
    it('should update the last login', async () => {
      const data = { id: 1, lastLogin: new Date() };
      const result = new Supplier();
      jest.spyOn(appService, 'updateLastLogin').mockResolvedValue(result);

      expect(await appController.updateLastLogin(data)).toBe(result);
    });
  });

  describe('getSupplierById', () => {
    it('should return a supplier by id', async () => {
      const id = 1;
      const result = new Supplier();
      jest.spyOn(appService, 'getSupplier').mockResolvedValue(result);

      expect(await appController.getSupplierById(id)).toBe(result);
    });
  });

  describe('getSupplierByUsername', () => {
    it('should return a supplier by username', async () => {
      const username = 'testuser';
      const result = new Supplier();
      jest.spyOn(appService, 'findSupplierByUsername').mockResolvedValue(result);

      expect(await appController.getSupplierByUsername(username)).toBe(result);
    });
  });

  describe('getAllSuppliers', () => {
    it('should return all suppliers', async () => {
      const result = [new Supplier()];
      jest.spyOn(appService, 'getAllSuppliers').mockResolvedValue(result);

      expect(await appController.getAllSuppliers()).toBe(result);
    });
  });

  describe('searchAllSuppliers', () => {
    it('should search all suppliers', async () => {
      const query = {};
      const result = [new Supplier()];
      jest.spyOn(appService, 'searchAllSuppliers').mockResolvedValue(result);

      expect(await appController.searchAllSuppliers(query)).toBe(result);
    });
  });

  describe('updateSupplier', () => {
    it('should update a supplier', async () => {
      const data = { id: 1, updateSupplierDto: new UpdateSupplierDTO() };
      const result = new Supplier();
      jest.spyOn(appService, 'updateSupplier').mockResolvedValue(result);

      expect(await appController.updateSupplier(data)).toBe(result);
    });
  });

  describe('deleteSupplier', () => {
    it('should delete a supplier', async () => {
      const id = 1;
      const result = 'Successfully Deleted';
      jest.spyOn(appService, 'deleteSupplier').mockResolvedValue(result);

      expect(await appController.deleteSupplier(id)).toBe(result);
    });
  });
});
