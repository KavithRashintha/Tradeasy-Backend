import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './dto/CustomerDTO';

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
}
