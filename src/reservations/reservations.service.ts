import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/users/entities/user.entity';
import UpdateReservationDto from './dtos/update-reservations.dto';
import CreateReservationDto from './dtos/create-reservations.dto';
import Room from 'src/rooms/entities/room.entity';
import Reservation from './entities/reservations.entity';
import Payment from 'src/payment/entities/payment.entity';
import { UsersService } from 'src/users/users.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { paymentService } from 'src/payment/payment.service';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        private readonly usersService: UsersService,
        private readonly roomsService: RoomsService,
        private readonly paymentService: paymentService,
    ) {}

    async create(new_reservation: CreateReservationDto) {
        if (!new_reservation.init_date) {
            throw new BadRequestException('Init date is required');
        }
        if (!new_reservation.end_date) {
            throw new BadRequestException('End date is required');
        }

        const init_date1 = new Date(Date.parse(new_reservation.init_date));
        const end_date1 = new Date(Date.parse(new_reservation.end_date));

        // Crear el pago
        const payment = new Payment();
        payment.payment_type = new_reservation.payment.payment_type;
        payment.amount = new_reservation.payment.amount;
        await this.paymentRepository.save(payment);

        // Crear la reserva
        const new_reservation3 = new Reservation();
        new_reservation3.nit = new_reservation.nit;
        new_reservation3.customer = new_reservation.customer;
        new_reservation3.init_date = init_date1;
        new_reservation3.end_date = end_date1;
        new_reservation3.users = await this.usersService.findOne(new_reservation.user);
        new_reservation3.rooms = await this.roomsService.findOne(new_reservation.room);
        new_reservation3.payment = payment;

        const reservation = this.reservationRepository.create(new_reservation3);
        return this.reservationRepository.save(reservation);
    }

    async findAll(): Promise<Reservation[]> {
        return this.reservationRepository.find({
            relations: ['users', 'rooms', 'payment'], // Incluir relaciones
        });
    }

    async findOne(id: number): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
            relations: ['users', 'rooms', 'payment'], // Incluir relaciones
        });
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }
        return reservation;
    }

    async update(id: number, update_reservation: UpdateReservationDto) {
        const reservation = await this.findOne(id);
    
        if (update_reservation.init_date) {
            reservation.init_date = new Date(Date.parse(update_reservation.init_date));
        }
        if (update_reservation.end_date) {
            reservation.end_date = new Date(Date.parse(update_reservation.end_date));
        }

        if (update_reservation.nit !== undefined) {
            reservation.nit = update_reservation.nit;
        }
        if (update_reservation.customer !== undefined) {
            reservation.customer = update_reservation.customer;
        }
        if (update_reservation.user !== undefined) {
            reservation.users = await this.usersService.findOne(update_reservation.user);
        }
        if (update_reservation.room !== undefined) {
            reservation.rooms = await this.roomsService.findOne(update_reservation.room);
        }
        if (update_reservation.payment !== undefined) {
            const payment = new Payment();
            payment.payment_type = update_reservation.payment.payment_type;
            payment.amount = update_reservation.payment.amount;
            await this.paymentRepository.save(payment);
            reservation.payment = payment;
        }
    
        return this.reservationRepository.save(reservation);
    }
    
    async remove(id: number) {
        const reservation = await this.findOne(id);
        await this.reservationRepository.remove(reservation);
    }
}

