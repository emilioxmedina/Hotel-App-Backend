import {IsNumber, IsString } from 'class-validator';
import User from 'src/users/entities/user.entity';
import { OneToOne } from 'typeorm';
export class CreatePaymentDto {
  @IsString()
  payment_type: string;

  @IsNumber()
  amount: number;

  //@OneToOne(() => User, (user) => user.id)
  //user: User;
  @IsNumber()
  userId: User;
}