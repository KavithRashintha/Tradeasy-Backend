export class RegisterCustomerDTO {
  readonly username: string;
  readonly email: string;
  readonly customerAddress: string;
  readonly contactNo: number;
  readonly password: string;
  readonly role: string;
}

export class GetCustomerDTO{
  readonly id:number
}

export class UpdateCustomerDTO{
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly customerAddress: string;
  readonly contactNo: number;
  readonly password: string;
  readonly role: string;
}
