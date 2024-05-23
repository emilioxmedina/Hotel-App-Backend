import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';

export default class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
