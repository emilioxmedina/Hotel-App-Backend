import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { And, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>
  ) { }

  create(new_room: CreateRoomDto) {
    if (new_room.room_number === undefined) {
      throw new BadRequestException('Room number is required');
    }
    if (new_room.type === undefined) {
      throw new BadRequestException('Room type is required');
    }
    if (new_room.price === undefined) {
      throw new BadRequestException('Room price is required');
    }

    const room = this.roomsRepository.create(new_room);
    return this.roomsRepository.save(room);
  }

  async getByPrice(price: number): Promise<Room[]> {
    const room = await this.roomsRepository.find({
      where: { price }
    });

    if (!room) {
      throw new NotFoundException(`Room with price: ${price} is not found`);
    }

    return room;
  }

  async getByType(type: string): Promise<Room[]> {
    const room = await this.roomsRepository.find({
      where: { type },
    });

    if (!room) {
      throw new NotFoundException(`Room with type: ${type} is not found`);
    }

    return room;
  }

  async getByNumber(room_number: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({
      where: { room_number },
    });

    if (!room) {
      throw new NotFoundException(`Room with number: ${room_number} is not found`);
    }

    return room;
  }

  async getByPriceType(price: number, type: string) {
    const room = await this.roomsRepository.findOne({
      where: { price, type },
    });

    if (!room) {
      throw new NotFoundException(`Room with this price and type is not found`);
    }

    return room;
  }

  async isOccupied(room_number: number): Promise<boolean> {
    const room = await this.findOneRoom(room_number);

    if (!room) {
      throw new NotFoundException(`Room with number: ${room_number} is not found`);
    }

    return room.occupied;
  }

  async bookARoom(room_number: number) {
    const room = await this.findOneRoom(room_number);

    if (!room) {
      throw new NotFoundException(`Room with number: ${room_number} is not found`);
    }

    room.occupied = true;
  }

  async unBookARoom(room_number: number) {
    const room = await this.roomsRepository.findOne({
      where: { room_number },
    });

    if (!room) {
      throw new NotFoundException(`Room with number: ${room_number} is not found`);
    }

    room.occupied = false;
  }

  findAll() {
    return this.roomsRepository.find();
  }

  async findOneRoom(room_number: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({
      where: { room_number },
    });

    if (!room) {
      throw new NotFoundException(`Room with id: ${room_number} is not found`);
    }

    return room;
  }

  async update(room_number: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOneRoom(room_number);
    this.roomsRepository.merge(room, updateRoomDto);
    return this.roomsRepository.save(room);
  }

  async remove(room_number: number) {
    const room = await this.findOneRoom(room_number);
    return this.roomsRepository.remove(room);
  }
}
