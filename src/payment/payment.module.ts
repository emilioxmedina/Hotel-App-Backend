import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { paymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Payment from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Payment])],
  providers: [paymentService],
  controllers: [PaymentController],
  exports: [TypeOrmModule, paymentService],
})
export class PaymentModule {}

