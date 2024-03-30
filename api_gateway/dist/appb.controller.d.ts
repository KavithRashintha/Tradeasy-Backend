import { ClientProxy } from '@nestjs/microservices';
export declare class AppbController {
    private productClient;
    constructor(productClient: ClientProxy);
    getAllProducts(): Promise<import("rxjs").Observable<any>>;
}
