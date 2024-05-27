import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import {CustomerDTO} from './dto/CustomerDTO';
import { GetCustomerDTO } from './dto/GetCustomerDTO';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';
import { ILike } from "typeorm";
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AppService {
  
  constructor(
      @InjectRepository(Customer)
      private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(createCustomerDTO: CustomerDTO): Promise<Customer> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createCustomerDTO.password, saltOrRounds);
    const newCustomer = this.customerRepository.create({ ...createCustomerDTO, password: hash });

    console.log("cus.service",newCustomer);
    return await this.customerRepository.save(newCustomer);
  }

  async findCustomer(id:any): Promise<Customer | null>{
    return await this.customerRepository.findOneById(id);
  }

  async findCustomerByUsername(username:string): Promise<Customer | null>{
    return await this.customerRepository.findOne({ where: { username } });
  }


  async getAllCustomers():Promise<Customer[]>{
    return await this.customerRepository.find();
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDTO): Promise<Customer> {
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

  async searchAllCustomers(query: Query): Promise<Customer[]> {
    console.log('Received query:', query);
    const keyword = (query.query as { keyword?: string }).keyword;
    try {
      const filteredCustomers = await this.customerRepository.find({ where: { username: ILike(`%${keyword}%`) } });
      console.log('Filtered customers:', filteredCustomers);
      return filteredCustomers;
    } catch (error) {
      console.error('Error occurred while searching customers:', error);
      return [];
    }
  }

  async getActiveCustomers(){
    //return await this.customerRepository.find({where:{isActive:true}});
    return await this.customerRepository.count();
  }
}
