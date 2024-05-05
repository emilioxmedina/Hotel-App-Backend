import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import CreateReservationDto from './dtos/create-reservations.dto';
import Reservation from './entities/reservations.entities';
import UpdateReservationDto from './dtos/update-reservations.dto';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly ReservationService: ReservationsService) {}

    @Post()
    create(@Body() reservation: CreateReservationDto) {
        return this.ReservationService.create(reservation);
    }

    @Get()
    findAll() {
        return this.ReservationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.ReservationService.findOne(id);
    }
    
    @Get(':user')
    findByUser(@Param('user') user_id: number) {
        return this.ReservationService.findByUser(user_id);
    }

    @Get(':room')
    findByRoom_number(@Param('room') room_number: number) {
        return this.ReservationService.findByRoom_number(room_number);
    }

    @Get(':date')
    findByDate(@Param('date') date: Date) {
        return this.ReservationService.findByDate(date);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() reservation: UpdateReservationDto) {
        return this.ReservationService.update(id, reservation);
    }

    @Delete(':room')
    remove(@Param('room') room_number: number) {
        return this.ReservationService.remove(room_number);
    }

}
