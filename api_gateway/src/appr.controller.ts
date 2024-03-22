import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterCustomerDTO } from './models/customerModel';

@Controller('customer')
export class ApprController {
  constructor(
    @Inject('CUSTOMER_MANAGEMENT') private customerClient: ClientProxy,
  ) {}

  @Post('create')
  async createCustomer(@Body() payload: RegisterCustomerDTO) {
    return this.customerClient.send({ cmd: 'CREATE_CUSTOMER' }, payload);
  }
}
