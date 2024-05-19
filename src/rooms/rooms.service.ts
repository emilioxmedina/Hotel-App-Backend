import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Room from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}

  create(new_room: CreateRoomDto) {
    if (new_room.room_number === undefined) {
      throw new BadRequestException('Room number is required');
    }
    if (new_room.price === undefined) {
      throw new BadRequestException('Room price is required');
    }
    if (new_room.num_beds === undefined) {
      throw new BadRequestException('Number of beds is required');
    }
    if (new_room.num_people === undefined) {
      throw new BadRequestException('Number of people is required');
    }

    const room = this.roomsRepository.create(new_room);
    return this.roomsRepository.save(room);
  }

  findAll() {
    return this.roomsRepository.find();
  }

  async findOne(room_number: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({
      where: { room_number },
    });

    if (!room) {
      throw new NotFoundException(`Room with id: ${room_number} is not found`);
    }

    return room;
  }

  async getByPrice(price: number): Promise<Room[]> {
    const room = await this.roomsRepository.find({
      where: { price },
    });

    if (!room) {
      throw new NotFoundException(`Room with price: ${price} is not found`);
    }

    return room;
  }

  //modificar esta parte para que retorne por numero de personas
  //(en una cama puede haber 2 personas si el hotel lo permite)
  async getByNumberPeople(num_people: number) /*: Promise<Room>*/ {
    // const room = await this.roomsRepository.findOne({
    //   where: { room_number },
    // });
    // if (!room) {
    //   throw new NotFoundException(`Room with number: ${room_number} is not found`);
    // }
    // return room;
  }

  // ! Esta funcion debe retornar todos cuartos que esten desocupados
  getDisoccupieds() {
    return this.roomsRepository.find();
  }

  async isOccupied(room_number: number): Promise<boolean> {
    const room = await this.findOne(room_number);

    if (!room) {
      throw new NotFoundException(
        `Room with number: ${room_number} is not found`,
      );
    }

    return room.occupied;
  }

  async bookARoom(room_number: number) {
    const room = await this.findOne(room_number);

    if (!room) {
      throw new NotFoundException(
        `Room with number: ${room_number} is not found`,
      );
    }

    room.occupied = true;
  }

  async unBookARoom(room_number: number) {
    const room = await this.roomsRepository.findOne({
      where: { room_number },
    });

    if (!room) {
      throw new NotFoundException(
        `Room with number: ${room_number} is not found`,
      );
    }

    room.occupied = false;
  }

  async update(room_number: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(room_number);
    this.roomsRepository.merge(room, updateRoomDto);
    return this.roomsRepository.save(room);
  }

  async remove(room_number: number) {
    const room = await this.findOne(room_number);
    return this.roomsRepository.remove(room);
  }
}
