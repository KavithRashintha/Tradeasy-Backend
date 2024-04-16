import { AppService } from './app.service';
import { SupplierDTO } from './dto/SupplierDTO';
import { Supplier } from './supplier.entity';
import { UpdateSupplierDTO } from './dto/UpdateSupplierDTO';
export declare class AppController {
    private readonly supplierManagement;
    constructor(supplierManagement: AppService);
    createSupplier(createSupplierDto: SupplierDTO): Promise<Supplier>;
    getSupplierById(id: any): Promise<Supplier | null>;
    getAllSuppliers(): Promise<Supplier[]>;
    updateSupplier(data: {
        id: number;
        updateSupplierDto: UpdateSupplierDTO;
    }): Promise<Supplier>;
    deleteSupplier(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
