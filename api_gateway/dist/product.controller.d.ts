import { ClientProxy } from '@nestjs/microservices';
import { RegisterProductDTO } from "./models/productModel";
import { UpdateProductDTO } from "./models/productModel";
export declare class ProductController {
    private productClient;
    constructor(productClient: ClientProxy);
    createProduct(payload: RegisterProductDTO): Promise<import("rxjs").Observable<any>>;
    findProduct(id: any): Promise<import("rxjs").Observable<any>>;
    getAllProducts(): Promise<import("rxjs").Observable<any>>;
    updateProduct(id: number, updateProductDto: UpdateProductDTO): Promise<import("rxjs").Observable<any>>;
    deleteProduct(id: number): Promise<import("rxjs").Observable<any>>;
}
