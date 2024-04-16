export class RegisterSupplierDTO {
    readonly supplierName: string;
    readonly supplierEmail: string;
    readonly supplierAddress: string;
    readonly supplierContact: string;
    readonly supplierPassword: string;
    }
    
    export class GetSupplierDTO{
      readonly id:number
    }
    
    export class UpdateSupplierDTO{
      readonly id: number;
      readonly supplierName: string;
      readonly supplierEmail: string;
      readonly supplierAddress: string;
      readonly supplierContact: string;
      readonly supplierPassword: string;
    }
    