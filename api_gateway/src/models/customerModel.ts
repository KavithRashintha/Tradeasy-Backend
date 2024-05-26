export class RegisterCustomerDTO {
  // readonly customerName: string;
  // readonly customerEmail: string;
  // readonly customerAddress: string;
  // readonly customerContact: number;
  // readonly customerPassword: string;
  readonly username: string;
  readonly password:string;
  readonly email: string;
  readonly contactNo: string;
  readonly role: string;
}

export class GetCustomerDTO{
  readonly id:number
}

export class UpdateCustomerDTO{
  readonly id: number;
  // readonly customerName: string;
  // readonly customerEmail: string;
  // readonly customerAddress: string;
  // readonly customerContact: number;
  // readonly customerPassword: string;
  readonly username: string;
  readonly password:string;
  readonly email: string;
  readonly contactNo: string;
  readonly role: string;
}
