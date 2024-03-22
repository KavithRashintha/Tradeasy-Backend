export class CustomerDTO {
  readonly customerName: string;
  readonly customerEmail: string;
  readonly customerAddress: string;
  readonly customerContact: string;
  readonly customerPassword: string;
}

export class GetCustomerDTO{
  readonly id: number
}

export class UpdateCustomerDTO{
  readonly id: number;
  readonly customerName: string;
  readonly customerEmail: string;
  readonly customerAddress: string;
  readonly customerContact: number;
  readonly customerPassword: string;
}