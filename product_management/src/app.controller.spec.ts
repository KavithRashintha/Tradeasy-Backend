import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product.entity';
import { ProductReview } from './product.entity';
import { ProductDTO  } from './DTO/ProductDTO';
import { CreateProductReviewDTO } from './DTO/ProductReviewDTO';
import { UpdateProductDTO } from './DTO/UpdateProductDTO';

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
  
    describe('deleteProduct', () => {
      it('should delete a product', async () => {
        const productId = 1;
        jest.spyOn(appService, 'deleteProduct').mockResolvedValue('Successfully Deleted');
  
        const result = await appController.deleteProduct(productId);
  
        expect(result).toEqual('Successfully Deleted');
        expect(appService.deleteProduct).toHaveBeenCalledWith(productId);
      });
    });
  
    describe('getProductsCategoryCount', () => {
      it('should get category counts', async () => {
        const categoryCounts = { category1: 10, category2: 15 };
        jest.spyOn(appService, 'getProductsCategoryCount').mockResolvedValue(categoryCounts);
  
        const result = await appController.getProductsCategoryCount();
  
        expect(result).toEqual(categoryCounts);
        expect(appService.getProductsCategoryCount).toHaveBeenCalled();
      });
    });
  
    describe('updateProductReview', () => {
      it('should update a product review', async () => {
        const updateReviewDto: UpdateProductReviewDTO = {
          id: 1,
          productId: 'product_id_1',
          productReviewerName: 'Test Reviewer',
          productReviewDescription: 'Test Review',
          productReviewStarCount: '5',
          productReviewedDate: '2024-06-30',
        };
        const updatedReview = new ProductReview(); // Mock a ProductReview instance
        jest.spyOn(appService, 'updateProductReview').mockResolvedValue(updatedReview);
  
        const result = await appController.updateProductReview(updateReviewDto);
  
        expect(result).toBe(updatedReview);
        expect(appService.updateProductReview).toHaveBeenCalledWith(updateReviewDto);
      });
    });
  
    describe('deleteProductReview', () => {
      it('should delete a product review', async () => {
        const reviewId = 1;
        jest.spyOn(appService, 'deleteProductReview').mockResolvedValue('Successfully Deleted');
  
        const result = await appController.deleteProductReview(reviewId);
  
        expect(result).toEqual('Successfully Deleted');
        expect(appService.deleteProductReview).toHaveBeenCalledWith(reviewId);
      });
    });
  
  });