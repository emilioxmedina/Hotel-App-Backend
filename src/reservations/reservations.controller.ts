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

    @Patch(':id')
    update(@Param('id') id: number, @Body() reservation: UpdateReservationDto) {
        return this.ReservationService.update(id, reservation);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.ReservationService.remove(id);
    }

}
