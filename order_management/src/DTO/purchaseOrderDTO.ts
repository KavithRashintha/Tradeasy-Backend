export class PurchaseOrderDTO{
    readonly supplierId:string;
    readonly supplierName:string;
    readonly Address:string;
    readonly mail:string;
    readonly contact_number:string;
    readonly items:string;
    readonly status:string;
    readonly createdDate: Date;
    readonly departedDate: Date;
    readonly quantity:string;
    readonly total_amount:string;
    readonly order_cancel_reason : string;
}


import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePurchaseOrderDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  order_cancel_reason?: string;
}



