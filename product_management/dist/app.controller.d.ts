import { AppService } from './app.service';
import { Product } from './product.entity';
export declare class AppController {
    private readonly productManagement;
    constructor(productManagement: AppService);
    getAllProducts(): Promise<Product[]>;
}
