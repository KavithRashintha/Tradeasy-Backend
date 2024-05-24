import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import {ProductDTO} from './DTO/ProductDTO';
import {UpdateProductDTO} from "./DTO/UpdateProductDTO";

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
}
