export class RegisterCustomerDTO {
  readonly username: string;
  readonly password:string;
  readonly email: string;
  readonly contactNo: string;
  readonly role: string;
  readonly address: string;
  readonly profilePicture: string;
}

export class GetCustomerDTO{
  readonly id:number
}

export class UpdateCustomerDTO{
  readonly id: number;
  readonly username: string;
  readonly password:string;
  readonly email: string;
  readonly contactNo: string;
  readonly role: string;
  readonly address: string;
  readonly profilePicture: string;
}

export class ResetCustomerDTO{
  readonly id: number;
  readonly password:string;
}
