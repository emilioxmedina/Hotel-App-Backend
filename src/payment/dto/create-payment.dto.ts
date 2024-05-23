import {IsNumber, IsString } from 'class-validator';
export class CreatePaymentDto {
  @IsString()
  payment_type: string;

  @IsNumber()
  amount: number;
}