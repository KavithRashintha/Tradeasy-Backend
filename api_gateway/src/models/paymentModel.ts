export class CustomerPaymentDTO{
    readonly customerName: string;
    readonly contactNumber: string;
    readonly email: string;
    readonly purchasedItems: string;
    readonly totalAmount: number;
}

export class GetCustomerPaymentDTO{
    readonly id:number
}