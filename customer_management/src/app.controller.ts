import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerDTO } from './dto/CustomerDTO';
import { Customer } from './customer.entity';

@Controller()
export class AppController {
  constructor(private readonly customerManagement: AppService) {}

  @MessagePattern({ cmd: 'CREATE_CUSTOMER' })
  async createCustomer(
    @Payload() createCustomerDto: CustomerDTO,
  ): Promise<Customer> {
    return await this.customerManagement.createCustomer(createCustomerDto);
  }
}
