import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discounts } from './discount.entity';
import { Repository } from 'typeorm';
import { DiscountsDTO } from './dto/discountsDTO';
import { ILike } from "typeorm";
@Injectable()
export class AppService {
  constructor(
      @InjectRepository(Discounts)
      private readonly discountManagement: Repository<Discounts>,
  ){}

  async createDiscount(discountsDTO: DiscountsDTO): Promise<Discounts>{
    const newDiscount = this.discountManagement.create(discountsDTO);
    return await this.discountManagement.save(newDiscount);
  }

  async getAllDiscounts(): Promise<Discounts[]>{
    return await this.discountManagement.find();
  }
  async getSearchDiscounts(productName?: string): Promise<Discounts[] > {
    // Fetch all discounts
    const allDiscounts = await this.discountManagement.find();

    let filteredDiscounts: Discounts[] = [];

    // Filter discounts if productName is provided
    

    if (productName) {
        filteredDiscounts = await this.discountManagement.find({ where: { productName: ILike(`%${productName}%`) } });
    }
    
    // Print both sets of results
    console.log('All Discounts:', allDiscounts);
    console.log('Filtered Discounts:', filteredDiscounts);

    return   filteredDiscounts 
}

  
  
  
  async getDiscountById(id: any): Promise<Discounts | null>{
    return await this.discountManagement.findOneById(id);
  }

  async deleteDiscount(id: number){
    const result = await this.discountManagement.delete(id);
    if(!result){
      return "Not Deleted";
    }else{
      return "Successfully Deleted";
    }
  }
}
