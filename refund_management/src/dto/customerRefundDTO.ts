export class CustomerRefundDTO {
  readonly orderId: number;
  readonly customerName: string;
  readonly contact: string;
  readonly item: string;
  readonly quantity: string;
  readonly reason: string;
  readonly totalPrice: string;
  readonly date: Date;
  readonly status: string
}
