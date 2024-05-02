export class CustomerPaymentDTO{
    readonly customerId: string;
    readonly customerName: string;
    readonly contactNumber: string;
    readonly email: string;
    readonly address: string;
    readonly purchasedItems: string[];
    readonly totalAmount: number;
    readonly date: Date;
    readonly time:Date;
}

export class GetCustomerPaymentDTO{
    readonly id:number
}