import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Product } from './product.entity';
import {ProductDTO} from './DTO/ProductDTO';

@Controller()
export class AppController {
  constructor(private readonly productManagement: AppService) {}
  @MessagePattern({cmd: 'CREATE_PRODUCT'})
  async createProducts(@Payload() createProductDto: ProductDTO,)
      : Promise<Product>{
    return await this.productManagement.createProducts(createProductDto);
  }
  @MessagePattern({cmd: 'GET_ALL_PRODUCTS'})
  async getAllProducts(): Promise<Product[]>{
    return await this.productManagement.getAllProducts();
  }

  @MessagePattern({cmd: 'DELETE_PRODUCT'})
  async deleteProduct(@Payload() id:number){
    return await this.productManagement.deleteProduct(id);
  }

}
