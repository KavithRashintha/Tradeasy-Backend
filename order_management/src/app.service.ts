import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import {OrderDTO} from './DTO/OrderDTO';
import {UpdateOrderDTO} from "./DTO/UpdateOrderDTO";
import {UpdateOrderStatusDTO} from "./DTO/UpdateOrderStatusDTO";

@Injectable()
export class AppService {

  constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrders(createOrderDTO: OrderDTO): Promise<Order> {
    const newOrder = this.orderRepository.create(createOrderDTO);
    return await this.orderRepository.save(newOrder);
  }

  async findOrder(id:any): Promise<Order | null>{
    return await this.orderRepository.findOneById(id);
  }

  async getAllOrders():Promise<Order[]>{
    return await this.orderRepository.find();
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDTO): Promise<Order> {

    await this.orderRepository.update(id, updateOrderDto);
    return await this.orderRepository.findOneById(id);
  }

  async updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDTO): Promise<Order> {
    await this.orderRepository.update(id, updateOrderStatusDto);
    return await this.orderRepository.findOneById(id);
  }



  async deleteOrder(id: number){
    const result = await this.orderRepository.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }
}
