import { AppService } from './app.service';
import { DiscountsDTO } from './dto/discountsDTO';
import { Discounts } from './discount.entity';
export declare class AppController {
    private readonly discountManagement;
    constructor(discountManagement: AppService);
    createDiscount(discountsDTO: DiscountsDTO): Promise<Discounts>;
    getSearchDiscounts(productName: string): Promise<Discounts[]>;
    getAllDiscounts(): Promise<Discounts[]>;
    getDiscountById(id: any): Promise<Discounts | null>;
    deleteDiscount(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
