import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import CreateReservationDto from './dtos/create-reservations.dto';
import UpdateReservationDto from './dtos/update-reservations.dto';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger'; // Importamos las anotaciones de Swagger

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly ReservationService: ReservationsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Este endpoint sirve para crear una nueva reserva.' })
  create(@Body() body: CreateReservationDto) {
    return this.ReservationService.create(body);
  }

  @Get()
  @ApiCreatedResponse({ description: 'Este endpoint sirve para obtener todas las reservas.' })
  findAll() {
    return this.ReservationService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ description: 'Este endpoint sirve para obtener una reserva por su ID.' })
  findOne(@Param('id') id: number) {
    return this.ReservationService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'Este endpoint actualiza una reserva por su ID.' })
  update(@Param('id') id: number, @Body() reservation: UpdateReservationDto) {
    return this.ReservationService.update(id, reservation);
  }

  @Delete(':id')
  @ApiCreatedResponse({ description: 'Este endpoint elimina una reserva por su ID.' })
  remove(@Param('id') id: number) {
    return this.ReservationService.remove(id);
  }
}
function ParseDate(): (target: ReservationsController, propertyKey: "create", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

