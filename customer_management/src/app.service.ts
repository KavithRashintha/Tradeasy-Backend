import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import {CustomerDTO} from './dto/CustomerDTO';
import { GetCustomerDTO } from './dto/GetCustomerDTO';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';

@Injectable()
export class AppService {
  
  constructor(
      @InjectRepository(Customer)
      private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(createCustomerDTO: CustomerDTO): Promise<Customer> {
    const newCustomer = this.customerRepository.create(createCustomerDTO);
    return await this.customerRepository.save(newCustomer);
  }

  async findCustomer(getCustomerDto: GetCustomerDTO): Promise<Customer | null>{
    return await this.customerRepository.findOneById(getCustomerDto.id);
  }
  async getAllCustomers():Promise<Customer[]>{
    return await this.customerRepository.find();
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDTO): Promise<Customer> {
    // @ts-ignore
    await this.customerRepository.update(id, updateCustomerDto);
    return await this.customerRepository.findOneById(id);
  }
  
  async deleteCustomer(id: number){
    const result = await this.customerRepository.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }
}
