import {Controller, Get, Param, } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {CustomerDTO} from './dto/CustomerDTO';
import { Customer } from './customer.entity';
import { GetCustomerDTO } from './dto/GetCustomerDTO';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';
import * as bcrypt from 'bcrypt'
import { Query } from 'express-serve-static-core';

@Controller()
export class AppController {
  constructor(private readonly customerManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_CUSTOMER' })
  async createCustomer(createCustomerDto: CustomerDTO): Promise<Customer> {
    console.log("cus.controller",createCustomerDto);
    return await this.customerManagement.createCustomer(createCustomerDto);
  }

  @MessagePattern({ cmd: 'GET_CUSTOMER' })
  async getCustomerById(
      @Payload() id:any
  ): Promise<Customer | null> {
    return await this.customerManagement.findCustomer(id);
  }

  @MessagePattern({cmd: 'GET_ALL_CUSTOMERS'})
  async getAllCustomers(): Promise<Customer[]>{
    return await this.customerManagement.getAllCustomers();
  }
  
  @MessagePattern({cmd: 'UPDATE_CUSTOMER'})
  async updateCustomer(@Payload() data: { id: number, updateCustomerDto: UpdateCustomerDTO }): Promise<Customer> {
    const { id, updateCustomerDto } = data;
    return await this.customerManagement.updateCustomer(id, updateCustomerDto);
  }

  @MessagePattern({cmd: 'DELETE_CUSTOMER'})
  async deleteCustomer(@Payload() id:number){
    return await this.customerManagement.deleteCustomer(id);
  }

  @MessagePattern({cmd: 'SEARCH_ALL_CUSTOMERS'})
  async searchAllCustomers(@Payload() query: Query): Promise<Customer[]>{
    return await this.customerManagement.searchAllCustomers(query);
  }

  @MessagePattern({cmd: 'GET_ACTIVE_CUSTOMERS'})
  async getActiveCustomers(){
    return await this.customerManagement.getActiveCustomers();
  }
}
