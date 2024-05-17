import { Discounts } from './discount.entity';
import { Repository } from 'typeorm';
import { DiscountsDTO } from './dto/discountsDTO';
import { Query } from 'express-serve-static-core';
export declare class AppService {
    private readonly discountManagement;
    constructor(discountManagement: Repository<Discounts>);
    createDiscount(discountsDTO: DiscountsDTO): Promise<Discounts>;
    getAllDiscounts(): Promise<Discounts[]>;
    searchAllDiscounts(query: Query): Promise<Discounts[]>;
    getDiscountById(id: any): Promise<Discounts | null>;
    deleteExpiredDiscounts(): Promise<void>;
    deleteDiscount(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
