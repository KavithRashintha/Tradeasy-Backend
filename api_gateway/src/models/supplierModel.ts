export class RegisterSupplierDTO {
    readonly supplierName: string;
    readonly supplierEmail: string;
    readonly supplierAddress: string;
    readonly nic: string;
    readonly supplierContact: string;
    readonly supplierPassword: string;
    readonly paymentMethod: string;
    readonly paymentDetails: string;
    readonly profilePicture: string;
}

export class GetSupplierDTO{
    readonly id:number
}

export class UpdateSupplierDTO{
    readonly id: number;
    readonly supplierName: string;
    readonly supplierEmail: string;
    readonly supplierAddress: string;
    readonly nic: number;
    readonly supplierContact: string;
    readonly supplierPassword: string;
}
