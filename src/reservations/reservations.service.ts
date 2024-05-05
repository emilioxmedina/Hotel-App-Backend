import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Reservation from './entities/reservations.entities';
import User from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import UpdateReservationDto from './dtos/update-reservations.dto';
import CreateReservationDto from './dtos/create-reservations.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>)
        {}

    create(reservation: CreateReservationDto) {}

    findAll() {}

    findOne(id: number) {}

    findByUser(user_id: number) {}
    
    findByRoom_number(room_number: number) {}

    findByDate(date: Date) {}

    update(id: number, reservation: UpdateReservationDto) {}

    remove(room_number: number) {}
}
