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

export interface Data {
    price_data: {
        currency: string;
        product_data: {
            name: string;
            images: string[];
        };
        unit_amount: number;
    };
    quantity: number;
}

export class SupplierPaymentDTO{
    readonly supplierId: string;
    readonly supplierName: string;
    readonly date: string;
    readonly itemsPurchased: string[];
    readonly billAmount: number;
    readonly receipt: string;
}
