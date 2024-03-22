export class RegisterCustomerDTO {
  readonly customerName: string;
  readonly customerEmail: string;
  readonly customerAddress: string;
  readonly customerContact: number;
  readonly customerPassword: string;
}

export class GetCustomerDTO{
  readonly id:number
}
