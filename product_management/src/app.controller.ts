import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {Product, ProductReview} from './product.entity';
import {ProductDTO} from './DTO/ProductDTO';
import {UpdateProductDTO} from "./DTO/UpdateProductDTO";
import {CreateProductReviewDTO} from "./DTO/ProductReviewDTO";
import {ProductQuantityDTO} from "./DTO/ProductQuantityDTO";

@Controller()
export class AppController {
  constructor(private readonly productManagement: AppService) {}
  @MessagePattern({cmd: 'CREATE_PRODUCT'})
  async createProducts(@Payload() createProductDto: ProductDTO,)
      : Promise<Product>{
    return await this.productManagement.createProducts(createProductDto);
  }

  @MessagePattern({ cmd: 'GET_PRODUCT' })
  async getProductById(
      @Payload() id:any
  ): Promise<Product | null> {
    return await this.productManagement.findProduct(id);
  }

  @MessagePattern({cmd: 'GET_PRODUCT_BY_NAME'})
  async getProductByName(@Payload() productName:string): Promise<Product | null> {
    return await this.productManagement.getProductByName(productName);
  }

  @MessagePattern({cmd: 'GET_ALL_PRODUCTS'})
  async getAllProducts(): Promise<Product[]>{
    return await this.productManagement.getAllProducts();
  }

  @MessagePattern({cmd: 'UPDATE_PRODUCT'})
  async updateProduct(@Payload() data: { id: number, updateProductDto: UpdateProductDTO }): Promise<Product> {
    const { id, updateProductDto } = data;
    return await this.productManagement.updateProduct(id, updateProductDto);
  }

  @MessagePattern({cmd: 'UPDATE_PRODUCT_QUANTITY'})
  async updateProductQuantity(@Payload() data: {id: number, productQuantityDto:ProductQuantityDTO}): Promise<Product> {
    const {id, productQuantityDto} = data;
    return await this.productManagement.updateProductQuantity(id, productQuantityDto);
  }

  @MessagePattern({cmd: 'DELETE_PRODUCT'})
  async deleteProduct(@Payload() id:number){
    return await this.productManagement.deleteProduct(id);
  }

  @MessagePattern({cmd: 'GET_PRODUCTS_COUNT'})
  async getProductsCount(){
    return await this.productManagement.getProductsCount();
  }

  @MessagePattern({cmd: 'GET_PRODUCTS_CATEGORY_COUNT'})
  async getProductsCategoryCount(){
    return await this.productManagement.getProductsCategoryCount();
  }

  @MessagePattern({cmd: 'CREATE_PRODUCT_REVIEW'})
  async createProductsReview(@Payload() createProductReviewDto: CreateProductReviewDTO,)
      : Promise<ProductReview>{
    return await this.productManagement.createProductsReview(createProductReviewDto);
  }

  @MessagePattern({cmd: 'GET_ALL_PRODUCTS_REVIEW'})
  async getAllProductsReview(): Promise<ProductReview[]>{
    return await this.productManagement.getAllProductsReview();
  }
}
