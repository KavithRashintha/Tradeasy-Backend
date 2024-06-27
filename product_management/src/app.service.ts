import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Product, ProductReview} from './product.entity';
import { Repository } from 'typeorm';
import {ProductDTO} from './DTO/ProductDTO';
import {UpdateProductDTO} from "./DTO/UpdateProductDTO";
import {CreateProductReviewDTO} from "./DTO/ProductReviewDTO";
import {ProductQuantityDTO} from "./DTO/ProductQuantityDTO";

@Injectable()
export class AppService {

  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,

      @InjectRepository(ProductReview)
      private readonly productReviewRepository: Repository<ProductReview>,
  ) {}

  async createProducts(createProductDTO: ProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDTO);
    return await this.productRepository.save(newProduct);
  }

  async findProduct(id:any): Promise<Product | null>{
    return await this.productRepository.findOneById(id);
  }

  async getAllProducts():Promise<Product[]>{
    return await this.productRepository.find();
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDTO): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOneById(id);
  }

  async updateProductQuantity(id:number, productQuantitytDto:ProductQuantityDTO): Promise<Product>{
    await this.productRepository
        .createQueryBuilder()
        .update(Product)
        .set({ productQuantity: productQuantitytDto.productQuantity })
        .where("id = :id", { id })
        .execute();

    return await this.productRepository.findOneById(id);
  }

  async deleteProduct(id: number){
    const result = await this.productRepository.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }

  async getProductsCount(){
    return await this.productRepository.count();
  }

  async getProductsCategoryCount(): Promise<number> {
    const result = await this.productRepository
        .createQueryBuilder('product')
        .select('COUNT(DISTINCT product.productCategory)', 'categoryCount')
        .getRawOne();

    return parseInt(result.categoryCount, 10);
  }

  async getProductByName(productName: string): Promise<Product | null> {
    const result = await this.productRepository
        .createQueryBuilder('product')
        .where('product.productName = :productName', { productName })
        .getOne();

    if (!result) {
      return null;
    }

    return result;
  }

  async createProductsReview(createProductReviewDTO: CreateProductReviewDTO): Promise<ProductReview> {
    const newProductReview = this.productReviewRepository.create(createProductReviewDTO);
    console.log(createProductReviewDTO);
    return await this.productReviewRepository.save(newProductReview);
  }

  async getAllProductsReview():Promise<ProductReview[]>{
    return await this.productReviewRepository.find();
  }
}
