export class CustomerRefundDTO {
  readonly orderId: number;
  readonly customerName: string;
  readonly contact: string;
  readonly item: string;
  readonly quantity: number;
  readonly reason: string;
  readonly totalPrice: number;
  readonly date: string;
  readonly status: string
}
