import { Product } from './product.entity';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    getAllProducts(): Promise<Product[]>;
}
