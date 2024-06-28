import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerDTO } from './dto/CustomerDTO';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';
import { Customer } from './customer.entity';

describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
      }).compile();
  
      appService = module.get<AppService>(AppService);
      appController = module.get<AppController>(AppController);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('createCustomer', () => {
      it('should create a new customer', async () => {
        const createCustomerDto: CustomerDTO = {
          id: 1,
          username: 'testuser',
          password: 'testpassword',
          email: 'test@example.com',
          contactNo: '1234567890',
          role: 'user',
          address: '123 Test St',
          profilePicture: 'profile.jpg',
          lastLogin: new Date()
        };
  
        const expectedResult: Customer = {
          id: 1,
          username: 'testuser',
          password: 'testpassword', 
          email: 'test@example.com',
          contactNo: '1234567890',
          role: 'user',
          address: '123 Test St',
          profilePicture: 'profile.jpg',
          lastLogin: new Date()
        };
  
        jest.spyOn(appService, 'createCustomer').mockResolvedValueOnce(expectedResult);
  
        const result = await appController.createCustomer(createCustomerDto);
        expect(result).toEqual(expectedResult);
      });
    });
  
    describe('updateLastLogin', () => {
      it('should update last login for a customer', async () => {
        const mockData = {
          id: 1,
          lastLogin: new Date(),
        };
  
        const expectedResult: Customer = {
          id: 1,
          username: 'testuser',
          password: 'testpassword', 
          email: 'test@example.com',
          contactNo: '1234567890',
          role: 'user',
          address: '123 Test St',
          profilePicture: 'profile.jpg',
          lastLogin: mockData.lastLogin,
        };
  
        jest.spyOn(appService, 'updateLastLogin').mockResolvedValueOnce(expectedResult);
  
        const result = await appController.updateLastLogin(mockData);
        expect(result).toEqual(expectedResult);
      });
    });
  
    describe('getCustomerById', () => {
      it('should retrieve a customer by ID', async () => {
        const customerId = 1;
        const expectedCustomer: Customer = {
          id: 1,
          username: 'testuser',
          password: 'testpassword', // Include password here for type completeness
          email: 'test@example.com',
          contactNo: '1234567890',
          role: 'user',
          address: '123 Test St',
          profilePicture: 'profile.jpg',
          lastLogin: new Date()
        };
  
        jest.spyOn(appService, 'findCustomer').mockResolvedValueOnce(expectedCustomer);
  
        const result = await appController.getCustomerById(customerId);
        expect(result).toEqual(expectedCustomer);
      });
    });
  
    describe('getCustomerByUsername', () => {
      it('should retrieve a customer by username', async () => {
        const username = 'testuser';
        const expectedCustomer: Customer = {
          id: 1,
          username: 'testuser',
          password: 'testpassword', // Include password here for type completeness
          email: 'test@example.com',
          contactNo: '1234567890',
          role: 'user',
          address: '123 Test St',
          profilePicture: 'profile.jpg',
          lastLogin: new Date()
        };
  
        jest.spyOn(appService, 'findCustomerByUsername').mockResolvedValueOnce(expectedCustomer);
  
        const result = await appController.getCustomerByUsername(username);
        expect(result).toEqual(expectedCustomer);
      });
    });
  
    describe('getAllCustomers', () => {
      it('should retrieve all customers', async () => {
        const expectedCustomers: Customer[] = [
          {
            id: 1,
            username: 'testuser1',
            password: 'testpassword1', // Include password here for type completeness
            email: 'test1@example.com',
            contactNo: '1234567890',
            role: 'user',
            address: '123 Test St',
            profilePicture: 'profile1.jpg',
            lastLogin: new Date()
          },
          {
            id: 2,
            username: 'testuser2',
            password: 'testpassword2', // Include password here for type completeness
            email: 'test2@example.com',
            contactNo: '0987654321',
            role: 'admin',
            address: '456 Test St',
            profilePicture: 'profile2.jpg',
            lastLogin: new Date()
          },
        ];
  
        jest.spyOn(appService, 'getAllCustomers').mockResolvedValueOnce(expectedCustomers);
  
        const result = await appController.getAllCustomers();
        expect(result).toEqual(expectedCustomers);
      });
    });
  
    describe('updateCustomer', () => {
      it('should update a customer', async () => {
        const mockData = {
          id: 1,
          updateCustomerDto: {
            email: 'updated@example.com',
            lastLogin: new Date(),
            // Add other fields to simulate updating customer data
          } as UpdateCustomerDTO,
        };
  
        const expectedResult: Customer = {
          id: 1,
          username: 'testuser',
          password: 'testpassword', // Include password here for type completeness
          email: 'updated@example.com',
          contactNo: '1234567890',
          role: 'user',
          address: '123 Test St',
          profilePicture: 'profile.jpg',
          lastLogin: mockData.updateCustomerDto.lastLogin,
        };
  
        jest.spyOn(appService, 'updateCustomer').mockResolvedValueOnce(expectedResult);
  
        const result = await appController.updateCustomer(mockData);
        expect(result).toEqual(expectedResult);
      });
    });
  
    describe('deleteCustomer', () => {
      it('should delete a customer by ID', async () => {
        const customerId = 1;
  
        jest.spyOn(appService, 'deleteCustomer').mockResolvedValueOnce(undefined);
  
        const result = await appController.deleteCustomer(customerId);
        expect(result).toBeUndefined();
      });
    });
  
    describe('searchAllCustomers', () => {
      it('should search customers based on query', async () => {
        const query: any = {
          // Define your query parameters here
        };
  
        const expectedCustomers: Customer[] = [
          {
            id: 1,
            username: 'testuser1',
            password: 'testpassword1', // Include password here for type completeness
            email: 'test1@example.com',
            contactNo: '1234567890',
            role: 'user',
            address: '123 Test St',
            profilePicture: 'profile1.jpg',
            lastLogin: new Date()
          },
          {
            id: 2,
            username: 'testuser2',
            password: 'testpassword2', // Include password here for type completeness
            email: 'test2@example.com',
            contactNo: '0987654321',
            role: 'admin',
            address: '456 Test St',
            profilePicture: 'profile2.jpg',
            lastLogin: new Date()
          },
        ];
  
        jest.spyOn(appService, 'searchAllCustomers').mockResolvedValueOnce(expectedCustomers);
  
        const result = await appController.searchAllCustomers(query);
        expect(result).toEqual(expectedCustomers);
      });
    });
  
    describe('getActiveCustomers', () => {
        it('should retrieve active customers', async () => {
          const expectedCustomers: Customer[] = [
            {
              id: 1,
              username: 'testuser1',
              password: 'testpassword1', // Include password here for type completeness
              email: 'test1@example.com',
              contactNo: '1234567890',
              role: 'user',
              address: '123 Test St',
              profilePicture: 'profile1.jpg',
              lastLogin: new Date(),
            },
            {
              id: 2,
              username: 'testuser2',
              password: 'testpassword2', // Include password here for type completeness
              email: 'test2@example.com',
              contactNo: '0987654321',
              role: 'admin',
              address: '456 Test St',
              profilePicture: 'profile2.jpg',
              lastLogin: new Date(),
            },
          ];
      
          jest.spyOn(appService, 'getActiveCustomers').mockResolvedValueOnce(expectedCustomers.length);
      
          const result = await appController.getActiveCustomers();
          expect(result).toEqual(expectedCustomers.length);
        });
      });
  
  });