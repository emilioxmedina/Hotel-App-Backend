import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Room } from './entities/room.entity';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Este endpoint sirve para crear nuevas habitaciones.',
    type: Room,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateRoomDto) {
    return this.roomsService.create(body);
  }

  @ApiCreatedResponse({
    description: 'Este endpoint sirve para obtener todas las habitaciones.',
    type: Room,
  })
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiCreatedResponse({
    description:
      'Este endpoint sirve para obtener una habitación por su número.',
    type: Room,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomsService.findOne(id);
  }

  @ApiCreatedResponse({
    description: 'Este endpoint sirve para actualizar las habitaciones.',
    type: Room,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateRoomDto) {
    return this.roomsService.update(id, body);
  }

  @ApiCreatedResponse({
    description: 'Este endpoint sirve para eliminar habitaciones.',
    type: Room,
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roomsService.remove(id);
  }
}
