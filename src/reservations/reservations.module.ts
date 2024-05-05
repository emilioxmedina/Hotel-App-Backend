import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import Reservation from './entities/reservations.entities';
import { Room } from 'src/rooms/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation, Room])],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
