/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerPayments } from './payment.entity';
import { Repository } from 'typeorm';
import { CustomerPaymentDTO } from './dto/cutomerPaymentDTO';

@Injectable()
export class AppService {
  [x: string]: any;
  
  constructor(
    @InjectRepository(CustomerPayments)
    private readonly customerPaymentManagement: Repository<CustomerPayments>,
  ){}

  async createCustomerPayment(customerPaymentDTO: CustomerPaymentDTO): Promise<CustomerPayments>{
    const newCustomerPayment = this.customerPaymentManagement.create(customerPaymentDTO);
    return await this.customerPaymentManagement.save(newCustomerPayment);
  }

  async getAllCustomerPayments(): Promise<CustomerPayments[]>{
    return await this.customerPaymentManagement.find();
  }

  async getCustomerPaymentById(id: any): Promise<CustomerPayments | null>{
    return await this.customerPaymentManagement.findOneById(id);
  }

}


