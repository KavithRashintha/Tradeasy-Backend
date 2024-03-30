import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {CustomerDTO} from './dto/CustomerDTO';
import { Customer } from './customer.entity';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';
import * as bcrypt from 'bcrypt'

@Controller()
export class AppController {
  constructor(private readonly customerManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_CUSTOMER' })
  async createCustomer(
      @Payload() createCustomerDto: CustomerDTO,
  ): Promise<Customer> {
    const saltOrRounds = 10;
    const password = createCustomerDto.customerPassword;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const dtoWithHashedPassword: CustomerDTO = { ...createCustomerDto, customerPassword: hash };

    return await this.customerManagement.createCustomer(dtoWithHashedPassword);
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
    // @ts-ignore
    return await this.customerManagement.updateCustomer(id, updateCustomerDto);
  }

  @MessagePattern({cmd: 'DELETE_CUSTOMER'})
  async deleteCustomer(@Payload() id:number){
    return await this.customerManagement.deleteCustomer(id);
  }
}
