import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Reservation from './entities/reservations.entity';
import Room from 'src/rooms/entities/room.entity';
import { PaymentModule } from 'src/payment/payment.module';
import Payment from 'src/payment/entities/payment.entity';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { paymentService } from 'src/payment/payment.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Reservation, Room, Payment]),
    PaymentModule
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, UsersService, RoomsService, paymentService],
  exports: [ReservationsModule, TypeOrmModule]
})
export class ReservationsModule {}
