export class RegisterAdminDTO {
    readonly username: string;
    readonly password:string;
    readonly email: string;
    readonly contactNo: string;
    readonly role: string;
}

export class GetAdminDTO{
    readonly id:number
}

export class UpdateAdminDTO{
    readonly id: number;
    readonly username: string;
    readonly password:string;
    readonly email: string;
    readonly contactNo: string;
    readonly role: string;
}

export class ShopReviewDTO{
    readonly customerName: string;
    readonly starReviewCount: string;
    readonly customerComment: string;
}