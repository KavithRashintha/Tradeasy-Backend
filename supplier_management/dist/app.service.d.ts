import { Supplier } from './supplier.entity';
import { Repository } from 'typeorm';
import { SupplierDTO } from './dto/SupplierDTO';
import { UpdateSupplierDTO } from './dto/UpdateSupplierDTO';
export declare class AppService {
    private readonly supplierRepository;
    constructor(supplierRepository: Repository<Supplier>);
    createSupplier(createSupplierDTO: SupplierDTO): Promise<Supplier>;
    getSupplier(id: any): Promise<Supplier | null>;
    getAllSuppliers(): Promise<Supplier[]>;
    updateSupplier(id: number, updateSupplierDto: UpdateSupplierDTO): Promise<Supplier>;
    deleteSupplier(id: number): Promise<"Not Deleted" | "Successfully Deleted">;
}
