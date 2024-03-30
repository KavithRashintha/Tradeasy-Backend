import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Product } from './product.entity';

@Controller()
export class AppController {
  constructor(private readonly productManagement: AppService) {}

  @MessagePattern({cmd: 'GET_ALL_PRODUCTS'})
  async getAllProducts(): Promise<Product[]>{
    return await this.productManagement.getAllProducts();
  }

}
