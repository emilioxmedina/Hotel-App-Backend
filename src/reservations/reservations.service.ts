import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/users/entities/user.entity';
import UpdateReservationDto from './dtos/update-reservations.dto';
import CreateReservationDto from './dtos/create-reservations.dto';
import Room from 'src/rooms/entities/room.entity';
import Reservation from './entities/reservations.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  create(reservation: CreateReservationDto) {}

  findAll() {}

  findOne(id: number) {}

  update(id: number, reservation: UpdateReservationDto) {}

  remove(id: number) {}
}
