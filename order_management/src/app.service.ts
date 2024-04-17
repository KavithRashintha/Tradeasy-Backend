import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import {OrderDTO} from './DTO/OrderDTO';
import {UpdateOrderDTO} from "./DTO/UpdateOrderDTO";

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

  // async findProduct(id:any): Promise<Product | null>{
  //   return await this.productRepository.findOneById(id);
  // }
  //
  // async getAllProducts():Promise<Product[]>{
  //   return await this.productRepository.find();
  // }
  //
  // async updateProduct(id: number, updateProductDto: UpdateProductDTO): Promise<Product> {
  //
  //   await this.productRepository.update(id, updateProductDto);
  //   return await this.productRepository.findOneById(id);
  // }
  //
  //
  //
  // async deleteProduct(id: number){
  //   const result = await this.productRepository.delete(id);
  //   if(!result){
  //     return "Not Deleted";
  //   }else{
  //     return "Successfully Deleted";
  //   }
  // }
}
