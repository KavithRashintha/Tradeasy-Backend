import { Catch, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Discounts } from './discount.entity';
import { Repository, LessThan, ILike } from 'typeorm';
import { DiscountsDTO } from './dto/discountsDTO';
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

  async getAllDiscounts(): Promise<Discounts[]> {
    return await this.discountManagement.find();
  }

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

  async getDiscountById(id: any): Promise<Discounts | null> {
    return await this.discountManagement.findOneById(id);
  }

  @Cron('0 0 * * *')
  async deleteExpiredDiscounts() {
    try {
      const currentDate = new Date();
      await this.discountManagement.delete({ endDate: LessThan(currentDate.toISOString()) });
      console.log('Expired discounts deleted successfully.');
    } catch (error) {
      console.error('Error deleting expired discounts:', error);
    }
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
