import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubmitRefundDenialDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  denialReason: string;
}
