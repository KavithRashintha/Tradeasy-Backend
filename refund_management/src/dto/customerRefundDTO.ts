export class CustomerRefundDTO {
  readonly orderId: number;
  readonly customerName: string;
  readonly customerId: string;
  readonly contact: string;
  readonly item: string;
  readonly quantity: string;
  readonly reason: string;
  readonly totalPrice: string;
  readonly createdDate: Date;
  readonly status: string;

}
