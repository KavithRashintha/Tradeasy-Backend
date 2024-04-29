import { Catch, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discounts } from './discount.entity';
import { Repository } from 'typeorm';
import { DiscountsDTO } from './dto/discountsDTO';
import { ILike } from "typeorm";
import { Query } from 'express-serve-static-core';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Discounts)
    private readonly discountManagement: Repository<Discounts>,
  ) { }

  async createDiscount(discountsDTO: DiscountsDTO): Promise<Discounts> {
    const newDiscount = this.discountManagement.create(discountsDTO);
    return await this.discountManagement.save(newDiscount);
  }

  // async searchDiscounts(query: string): Promise<Discounts[]> {
  //   return this.discountManagement.createQueryBuilder('discount')
  //     .where('discount.name LIKE :query', { query: `%${query}%` })
  //     .getMany();
  // }

  async getAllDiscounts(): Promise<Discounts[]> {
    return await this.discountManagement.find();
  }

  // async searchAllDiscounts(query: Query): Promise<Discounts[]> {
  //   console.log(query);
  //   let filteredDiscounts: Discounts[] = [];
  //   try{
  //     if (query.keyword) {
  //       filteredDiscounts = await this.discountManagement.find({ where: { productName:ILike(`%${query.keyword}%`) } });
  //       //where.productName = ILike(`%${query.keyword}%`);
  //     }
  //   }catch(e){
  //     console.error('Error occurred while searching discounts:', e);
  //   }

  //   return filteredDiscounts;
  // }

  async searchAllDiscounts(query: Query): Promise<Discounts[]> {
    console.log('Received query:', query);
    const keyword = (query.query as { keyword?: string }).keyword;
    try {
      const filteredDiscounts = await this.discountManagement.find({ where: { productName: ILike(`%${keyword}%`) } });
      console.log('Filtered discounts:', filteredDiscounts);
      return filteredDiscounts;
    } catch (error) {
      console.error('Error occurred while searching discounts:', error);
      return [];
    }
  }

  // async searchAllDiscounts(productName?: string): Promise<Discounts[] > {
  //   // Fetch all discounts
  //   const allDiscounts = await this.discountManagement.find();

  //   let filteredDiscounts: Discounts[] = [];

  //   // Filter discounts if productName is provided
  //   if (productName) {
  //       filteredDiscounts = await this.discountManagement.find({ where: { productName: ILike(`%${productName}%`) } });
  //   }

  //   // Print both sets of results
  //   //console.log('All Discounts:', allDiscounts);
  //   console.log('Filtered Discounts:', filteredDiscounts);

  //   return   filteredDiscounts;
  // }

  async getDiscountById(id: any): Promise<Discounts | null> {
    return await this.discountManagement.findOneById(id);
  }

  async deleteDiscount(id: number) {
    const result = await this.discountManagement.delete(id);
    if (!result) {
      return "Not Deleted";
    } else {
      return "Successfully Deleted";
    }
  }
}
