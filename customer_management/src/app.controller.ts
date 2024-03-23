import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {CustomerDTO} from './dto/CustomerDTO';
import { Customer } from './customer.entity';
import { GetCustomerDTO } from './dto/GetCustomerDTO';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';

@Controller()
export class AppController {
  constructor(private readonly customerManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_CUSTOMER' })
  async createCustomer(
      @Payload() createCustomerDto: CustomerDTO,
  ): Promise<Customer> {
    return await this.customerManagement.createCustomer(createCustomerDto);
  }

  @MessagePattern({ cmd: 'GET_CUSTOMER' })
  async getCustomerById(
      @Payload() getCustomerDto: GetCustomerDTO
  ): Promise<Customer | null> {
    return await this.customerManagement.findCustomer(getCustomerDto);
  }

  @MessagePattern({cmd: 'GET_ALL_CUSTOMERS'})
  async getAllCustomers(): Promise<Customer[]>{
    return await this.customerManagement.getAllCustomers();
  }
  
  @MessagePattern({cmd: 'UPDATE_CUSTOMER'})
  async updateCustomer(@Payload() data: { id: number, updateCustomerDto: UpdateCustomerDTO }): Promise<Customer> {
    const { id, updateCustomerDto } = data;
    // @ts-ignore
    return await this.customerManagement.updateCustomer(id, updateCustomerDto);
  }
}
