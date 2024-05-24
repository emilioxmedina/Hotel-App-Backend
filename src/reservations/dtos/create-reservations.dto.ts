import {IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { IsNotEmpty } from "class-validator";
import {CreatePaymentDto} from "src/payment/dto/create-payment.dto";
export default class CreateReservationDto {
    @IsString()
    init_date: string;
    @IsString()
    end_date: string;
    @IsNumber()
    user: number;
    @IsNumber()
    room: number;
    
    @ValidateNested()
    @Type(() => CreatePaymentDto)
    @IsNotEmpty()
    payment: CreatePaymentDto;

    @IsNumber()
    nit: number;
    @IsString()
    customer: string;
}

