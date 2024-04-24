import { Discounts } from './discount.entity';
import { Repository } from 'typeorm';
import { DiscountsDTO } from './dto/discountsDTO';
export declare class AppService {
    private readonly discountManagement;
    [x: string]: any;
    constructor(discountManagement: Repository<Discounts>);
    createDiscount(discountsDTO: DiscountsDTO): Promise<Discounts>;
    getAllDiscounts(): Promise<Discounts[]>;
    getDiscountById(id: any): Promise<Discounts | null>;
    deleteDiscount(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
