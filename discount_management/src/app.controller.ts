import { Controller} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DiscountsDTO } from './dto/discountsDTO';
import { Discounts } from './discount.entity';

@Controller()
export class AppController {
  constructor(private readonly discountManagement: AppService) {}

  @MessagePattern({cmd: 'CREATE_DISCOUNT'})
  async createDiscount(@Payload() discountsDTO: DiscountsDTO): Promise<Discounts>{
    return await this.discountManagement.createDiscount(discountsDTO);
  }

  @MessagePattern({cmd: 'GET_ALL_DISCOUNTS'})
  async getAllDiscounts(): Promise<Discounts[]>{
    return await this.discountManagement.getAllDiscounts();
  }

  @MessagePattern({cmd: 'GET_DISCOUNT'})
  async getDiscountById(@Payload() id: any): Promise<Discounts | null>{
    return await this.discountManagement.getDiscountById(id);
  }

  @MessagePattern({cmd: 'DELETE_DISCOUNT'})
  async deleteDiscount(@Payload() id:number){
    return await this.discountManagement.deleteDiscount(id);
  }
}
