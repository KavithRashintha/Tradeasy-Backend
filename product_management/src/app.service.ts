import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import {ProductDTO} from './DTO/ProductDTO';

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


  async getAllProducts():Promise<Product[]>{
    return await this.productRepository.find();
  }
}
