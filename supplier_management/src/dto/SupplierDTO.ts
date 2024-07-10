/* eslint-disable prettier/prettier */
export class SupplierDTO {
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

  export class ResetSupplierDTO {
    readonly id : number;
    readonly password:string;
  }