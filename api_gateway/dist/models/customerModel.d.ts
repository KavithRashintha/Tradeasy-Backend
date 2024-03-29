export declare class RegisterCustomerDTO {
    readonly customerName: string;
    readonly customerEmail: string;
    readonly customerAddress: string;
    readonly customerContact: number;
    readonly customerPassword: string;
}
export declare class GetCustomerDTO {
    readonly id: number;
}
export declare class UpdateCustomerDTO {
    readonly id: number;
    readonly customerName: string;
    readonly customerEmail: string;
    readonly customerAddress: string;
    readonly customerContact: number;
    readonly customerPassword: string;
}
