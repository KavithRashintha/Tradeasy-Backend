import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateRefundStatusDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  denialReason?: string;
}
