import {Body, Controller, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {GetCustomerDTO, RegisterCustomerDTO, UpdateCustomerDTO} from './models/customerModel';

@Controller('customer')
export class ApprController {
  constructor(
      @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
  ) {}

  @Post('create')
  async createCustomer(@Body() payload: RegisterCustomerDTO) {
    return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
  }

  @Post('findCustomer')
  async findCustomerById(@Body() payload:GetCustomerDTO) {
    return this.customerClient.send({cmd:'GET_CUSTOMER'}, payload)
  }

  @Post('getAllCustomers')
  async getAllCustomers(){
    return this.customerClient.send({cmd: 'GET_ALL_CUSTOMERS'}, {});
  }

  @Put('update/:id')
  async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDTO){
    return this.customerClient.send({ cmd: 'UPDATE_CUSTOMER' }, { id, updateCustomerDto });
  }

}
