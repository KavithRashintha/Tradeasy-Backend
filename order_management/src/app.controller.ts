import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Order } from './order.entity';
import {OrderDTO} from './DTO/OrderDTO';
import {UpdateOrderDTO} from "./DTO/UpdateOrderDTO";

@Controller()
export class AppController {
  constructor(private readonly orderManagement: AppService) {}
  @MessagePattern({cmd: 'CREATE_ORDER'})
  async createOrders(@Payload() createOrderDto: OrderDTO,)
      : Promise<Order>{
    return await this.orderManagement.createOrders(createOrderDto);
  }

  // @MessagePattern({ cmd: 'GET_PRODUCT' })
  // async getProductById(
  //     @Payload() id:any
  // ): Promise<Product | null> {
  //   return await this.productManagement.findProduct(id);
  // }
  //
  // @MessagePattern({cmd: 'GET_ALL_PRODUCTS'})
  // async getAllProducts(): Promise<Product[]>{
  //   return await this.productManagement.getAllProducts();
  // }
  //
  // @MessagePattern({cmd: 'UPDATE_PRODUCT'})
  // async updateProduct(@Payload() data: { id: number, updateProductDto: UpdateProductDTO }): Promise<Product> {
  //   const { id, updateProductDto } = data;
  //   return await this.productManagement.updateProduct(id, updateProductDto);
  // }
  //
  // @MessagePattern({cmd: 'DELETE_PRODUCT'})
  // async deleteProduct(@Payload() id:number){
  //   return await this.productManagement.deleteProduct(id);
  // }

}
