import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import Reservation from 'src/reservations/entities/reservations.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
