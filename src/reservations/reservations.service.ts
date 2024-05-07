import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

    async create(new_reservation: CreateReservationDto){
        if (new_reservation.init_date === undefined) {
            throw new BadRequestException('Init date is required');
        }
        if (new_reservation.end_date === undefined) {
            throw new BadRequestException('End date is required');
        }
        const reservation = this.reservationRepository.create(new_reservation);
        return this.reservationRepository.save(reservation);
    }

    async findAll(): Promise<Reservation[]> {
        return this.reservationRepository.find();
    }

    async findOne(id: number): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({
            where: { id }
        });
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }
        return reservation;
    }

    async update(id: number, update_reservation: UpdateReservationDto){
        const reservation = await this.findOne(id);
        this.reservationRepository.merge(reservation, update_reservation);
        return this.reservationRepository.save(reservation);
    }

    async remove(id: number){
        const reservation = await this.findOne(id);
        await this.reservationRepository.remove(reservation);
    }
}
