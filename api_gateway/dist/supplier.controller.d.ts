import { ClientProxy } from '@nestjs/microservices';
import { RegisterSupplierDTO } from './models/supplierModel';
import { UpdateSupplierDTO } from './models/supplierModel';
export declare class SupplierController {
    private supplierClient;
    constructor(supplierClient: ClientProxy);
    createSupplier(payload: RegisterSupplierDTO): Promise<import("rxjs").Observable<any>>;
    getSupplier(id: any): Promise<import("rxjs").Observable<any>>;
    getAllSuppliers(): Promise<import("rxjs").Observable<any>>;
    updateSupplier(id: number, updateSupplierDto: UpdateSupplierDTO): Promise<import("rxjs").Observable<any>>;
    deleteSupplier(id: number): Promise<import("rxjs").Observable<any>>;
}
