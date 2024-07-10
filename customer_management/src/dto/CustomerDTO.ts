export class CustomerDTO {
  readonly id : number;
  readonly username: string;
  readonly password:string;
  readonly email: string;
  readonly contactNo: string;
  readonly role: string;
  readonly address: string;
  readonly profilePicture: string;
  readonly lastLogin: Date;
}

export class ResetCustomerDTO {
  readonly id : number;
  readonly password:string;
}