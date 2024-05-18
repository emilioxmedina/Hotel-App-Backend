import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import Reservation from './entities/reservations.entity';
import Room from '../rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation, Room])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
