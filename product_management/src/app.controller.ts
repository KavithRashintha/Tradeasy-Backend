import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Product } from './product.entity';
import {ProductDTO} from './DTO/ProductDTO';
import {UpdateProductDTO} from "./DTO/UpdateProductDTO";

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

  @MessagePattern({cmd: 'GET_ALL_PRODUCTS'})
  async getAllProducts(): Promise<Product[]>{
    return await this.productManagement.getAllProducts();
  }

  @MessagePattern({cmd: 'UPDATE_PRODUCT'})
  async updateProduct(@Payload() data: { id: number, updateProductDto: UpdateProductDTO }): Promise<Product> {
    const { id, updateProductDto } = data;
    return await this.productManagement.updateProduct(id, updateProductDto);
  }

  @MessagePattern({cmd: 'DELETE_PRODUCT'})
  async deleteProduct(@Payload() id:number){
    return await this.productManagement.deleteProduct(id);
  }

}