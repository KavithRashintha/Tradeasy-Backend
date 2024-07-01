export class RegisterSupplierDTO {
    readonly username: string;
    readonly password:string;
    readonly email: string;
    readonly contactNo: string;
    readonly role: string;
    readonly address: string;
    readonly nic: string;
    readonly paymentMethod: string;
    readonly paymentDetails: string;
    readonly profilePicture: string;
}

export class GetSupplierDTO{
    readonly id:number
}

export class UpdateSupplierDTO{
    readonly username: string;
    readonly password:string;
    readonly email: string;
    readonly contactNo: string;
    readonly role: string;
    readonly address: string;
    readonly nic: string;
    readonly paymentMethod: string;
    readonly paymentDetails: string;
    readonly profilePicture: string;
}
