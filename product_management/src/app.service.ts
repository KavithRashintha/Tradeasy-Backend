import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
  ) {}


  async getAllProducts():Promise<Product[]>{
    return await this.productRepository.find();
  }
}