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

  @MessagePattern({ cmd: 'GET_ORDER' })
  async getOrderById(
      @Payload() id:any
  ): Promise<Order | null> {
    return await this.orderManagement.findOrder(id);
  }

  @MessagePattern({cmd: 'GET_ALL_ORDERS'})
  async getAllOrders(): Promise<Order[]>{
    return await this.orderManagement.getAllOrders();
  }

  @MessagePattern({cmd: 'UPDATE_ORDER'})
  async updateOrder(@Payload() data: { id: number, updateOrderDto: UpdateOrderDTO }): Promise<Order> {
    const { id, updateOrderDto } = data;
    return await this.orderManagement.updateOrder(id, updateOrderDto);

  }


  @MessagePattern({cmd: 'DELETE_ORDER'})
  async deleteOrder(@Payload() id:number){
    return await this.orderManagement.deleteOrder(id);
  }

}
